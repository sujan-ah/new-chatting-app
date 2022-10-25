import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

const UserList = () => {
  const db = getDatabase();
  const [userlist, setUserlist] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });
      setUserlist(arr);
    });
  }, []);
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
            <p className="bg-primary text-white font-nunito font-bold text-lg rounded p-1	">
              Accept
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
