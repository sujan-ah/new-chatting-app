import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";

const BlockedUsers = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [blockfriends, setBlockfriends] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "blockfriends/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid == item.val().blockById) {
          arr.push({
            id: item.key,
            block: item.val().block,
            blockid: item.val().blockId,
          });
        } else {
          arr.push({
            id: item.key,
            block: item.val().blockBy,
            blockById: item.val().blockById,
          });
        }
      });
      setBlockfriends(arr);
    });
  }, []);

  let handleUnblock = (item) => {
    set(push(ref(db, "friends")), {
      id: item.id,
      senderId: item.blockid,
      sendername: item.block,
      receiverid: auth.currentUser.uid,
      receivername: auth.currentUser.displayName,
      date: `${new Date().getDate()} / ${
        new Date().getMonth() + 1
      }  / ${new Date().getFullYear()}`,
    }).then(() => {
      remove(ref(db, "blockfriends/" + item.id));
    });
  };

  return (
    <div className="mt-11 rounded-2xl p-10 h-[462px] overflow-y-scroll shadow-md">
      <h1 className="font-nunito font-bold text-lg">Blocked Users</h1>
      {blockfriends.length == 0 ? (
        <p className="bg-green-600 p-2.5 rounded-md text-center text-white text-2xl font-nunito mt-4">
          No Block Users Are Available
        </p>
      ) : (
        blockfriends.map((item) => (
          <div className="flex justify-between mt-4 border-b pb-2.5 items-center">
            <div>
              <img
                src="images/groupimg.png"
                className="w-16 h-16 rounded-[50%]"
              />
            </div>
            <div>
              <h1 className="font-nunito font-bold text-base">{item.block}</h1>
              <p className="font-nunito font-semibold text-sm opacity-60">
                Hi Guys, Wassup!
              </p>
            </div>
            <div>
              {!item.blockById && (
                <p
                  className="bg-primary text-white font-nunito font-bold text-lg rounded p-1	"
                  onClick={() => handleUnblock(item)}
                >
                  Unblock
                </p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BlockedUsers;
