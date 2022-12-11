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

const FriendRequist = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [friendreqshow, setFriendreqshow] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "friendrequest/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid == item.val().receiverid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setFriendreqshow(arr);
    });
  }, []);

  let handleAcceptFriendRequest = (item) => {
    set(push(ref(db, "friends")), {
      id: item.id,
      senderId: item.senderId,
      sendername: item.sendername,
      receiverid: item.receiverid,
      receivername: item.receivername,
      date: `${new Date().getDate()} / ${
        new Date().getMonth() + 1
      }  / ${new Date().getFullYear()}`,
    }).then(() => {
      remove(ref(db, "friendrequest/" + item.id));
    });

    set(push(ref(db, "notification")), {
      id: item.id,
      senderIdnotifi: item.senderId,
      sendername: item.sendername,
      receiveridnotifi: item.receiverid,
      receivername: item.receivername,
    });

    set(push(ref(db, "notificationLength/" + `${item.senderId}`)), {
      senderIdnotifi: item.senderId,
    });
  };

  return (
    <div className="mt-10 rounded-2xl p-10 h-[462px] overflow-y-scroll shadow-md">
      <h1 className="font-nunito font-bold text-lg">Friend Request</h1>
      {friendreqshow.length == 0 ? (
        <p className="bg-green-600 p-2.5 rounded-md text-center text-white text-2xl font-nunito mt-4">
          No Friend Request Available
        </p>
      ) : (
        friendreqshow.map((item) => (
          <div className="flex justify-between mt-4 border-b pb-2.5 items-center">
            <div>
              <img
                src="images/groupimg.png"
                className="w-16 h-16 rounded-[50%]"
              />
            </div>
            <div>
              <h1 className="font-nunito font-bold text-base">
                {item.sendername}
              </h1>
              <p className="font-nunito font-semibold text-sm opacity-60">
                Hi Guys, Wassup!
              </p>
            </div>
            <div>
              <button
                className="bg-primary text-white font-nunito font-bold text-lg rounded p-1"
                onClick={() => handleAcceptFriendRequest(item)}
              >
                Accept
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FriendRequist;
