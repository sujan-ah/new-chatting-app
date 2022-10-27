import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";

const FriendRequist = () => {
  const auth = getAuth();
  console.log(auth.currentUser);
  const db = getDatabase();
  const [friendreqshow, setFriendreqshow] = useState([]);
  console.log(friendreqshow);

  useEffect(() => {
    const usersRef = ref(db, "friendrequest/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid == item.val().receiverid) {
          arr.push(item.val());
        }
      });
      console.log(arr);
      setFriendreqshow(arr);
    });
  }, []);

  return (
    <div className="mt-10 rounded-2xl p-10 h-[462px] overflow-y-scroll shadow-md">
      <h1 className="font-nunito font-bold text-lg">Friend Request</h1>
      {friendreqshow.map((item) => (
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
            <p className="bg-primary text-white font-nunito font-bold text-lg rounded p-1	">
              Accept
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequist;
