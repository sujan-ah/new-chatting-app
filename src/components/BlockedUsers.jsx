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
import Search from "./Search";
import { useSelector } from "react-redux";

const BlockedUsers = () => {
  let data2 = useSelector((state) => state.darkmood.value2);
  const auth = getAuth();
  const db = getDatabase();
  const [blockfriends, setBlockfriends] = useState([]);
  const [searchBlockFriendslist, setSearchBlockFriendslist] = useState([]);

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

    set(push(ref(db, "notification")), {
      id: item.id,
      senderunblockId: item.blockid,
      sendername: item.block,
      receiverunblockid: auth.currentUser.uid,
      receivername: auth.currentUser.displayName,
    });
    set(push(ref(db, "notificationLength/" + `${item.blockid}`)), {
      senderunblockId: item.blockid,
    });
  };

  let arr = [];
  let handleSearch = (e) => {
    blockfriends.filter((item) => {
      if (e.target.value != "") {
        if (item.block.toLowerCase().includes(e.target.value.toLowerCase())) {
          arr.push(item);
        }
      }
    });
    setSearchBlockFriendslist(arr);
  };

  return (
    <div
      className={
        data2
          ? "mt-10 rounded-2xl p-2 xl:p-10 h-[462px] overflow-y-scroll shadow-md shadow-indigo-500/50"
          : "mt-10 rounded-2xl p-2 xl:p-10 h-[462px] overflow-y-scroll shadow-md "
      }
    >
      <div className="flex justify-between mb-10">
        <h1 className="font-nunito font-bold text-xl xl:text-2xl mt-10">
          Blocked Users
        </h1>
        <Search type={handleSearch} />
      </div>
      {blockfriends.length == 0 ? (
        <p className="bg-green-600 p-2.5 rounded-md text-center text-white text-2xl font-nunito mt-4">
          No Block Users Are Available
        </p>
      ) : searchBlockFriendslist == "" ? (
        blockfriends.map((item) => (
          <div className="flex justify-between mt-4 border-b pb-2.5 items-center">
            <div>
              <img
                src="images/groupimg.png"
                className="w-12 h-12 xl:w-16 xl:h-16 rounded-[50%]"
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
      ) : (
        searchBlockFriendslist.map((item) => (
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
