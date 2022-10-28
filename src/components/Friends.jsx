import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

const Friends = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "friends/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          auth.currentUser.uid == item.val().receiverid ||
          auth.currentUser.uid == item.val().senderId
        ) {
          arr.push(item.val());
        }
      });
      setFriends(arr);
    });
  }, []);

  return (
    <div className="rounded-2xl p-10 h-[451px] overflow-y-scroll shadow-md">
      <h1 className="font-nunito font-bold text-lg">Friends</h1>
      {friends.map((item) => (
        <div className="flex justify-between mt-4 border-b pb-2.5 items-center">
          <div>
            <img
              src="images/groupimg.png"
              className="w-16 h-16 rounded-[50%]"
            />
          </div>
          <div>
            <h1 className="font-nunito font-bold text-base">
              {auth.currentUser.uid == item.senderId
                ? item.receivername
                : item.sendername}
            </h1>
            <p className="font-nunito font-semibold text-sm opacity-60">
              Dinner?
            </p>
          </div>
          <div>
            <p className="font-nunito font-semibold text-sm opacity-60">
              Today, 8:56pm
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Friends;
