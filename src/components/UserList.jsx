import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";

const UserList = () => {
  const auth = getAuth();
  // console.log(auth.currentUser);
  const db = getDatabase();
  const [userlist, setUserlist] = useState([]);
  const [friend, setFriend] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.key !== auth.currentUser.uid)
          arr.push({ ...item.val(), id: item.key });
      });
      setUserlist(arr);
    });
  }, []);

  useEffect(() => {
    const usersRef = ref(db, "friendrequest/");
    onValue(usersRef, (snapshot) => {
      let friendarr = [];
      snapshot.forEach((item) => {
        friendarr.push(item.val().receiverid + item.val().senderId);
      });
      setFriend(friendarr);
    });
  }, []);

  let handleSendFrequest = (item) => {
    console.log(item);
    set(push(ref(db, "friendrequest")), {
      senderId: auth.currentUser.uid,
      sendername: auth.currentUser.displayName,
      receiverid: item.id,
      receivername: item.username,
    });
  };

  return (
    <div className=" rounded-2xl p-10 h-[451px] overflow-y-scroll shadow-md">
      <h1 className="font-nunito font-bold text-lg">User List</h1>
      {userlist.map((item) => (
        <div className="flex justify-between mt-4 border-b pb-2.5 items-center">
          <div>
            <img
              src={item.profile_picture}
              className="w-16 h-16 rounded-[50%]"
            />
          </div>
          <div>
            <h1 className="font-nunito font-bold text-base">{item.username}</h1>
            <p className="font-nunito font-semibold text-sm opacity-60">
              {item.email}
            </p>
          </div>
          <div>
            {friend.includes(
              item.id + auth.currentUser.uid || auth.currentUser.uid + item.id
            ) ? (
              <button className="bg-primary text-white font-nunito font-bold text-lg rounded p-1">
                Pending
              </button>
            ) : (
              <button
                className="bg-primary text-white font-nunito font-bold text-lg rounded p-1"
                onClick={() => handleSendFrequest(item)}
              >
                Send Request
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
