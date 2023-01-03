import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import Search from "./Search";
import { useSelector } from "react-redux";

const UserList = () => {
  let data2 = useSelector((state) => state.darkmood.value2);
  const auth = getAuth();
  const db = getDatabase();
  const [userlist, setUserlist] = useState([]);
  const [searchuserlist, setSearchuserlist] = useState([]);
  const [friend, setFriend] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [blockList, setBlockList] = useState([]);

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
      let friendreqarr = [];
      snapshot.forEach((item) => {
        friendreqarr.push(item.val().receiverid + item.val().senderId);
      });
      setFriend(friendreqarr);
    });
  }, []);

  useEffect(() => {
    const usersRef = ref(db, "friends/");
    onValue(usersRef, (snapshot) => {
      let friendarr = [];
      snapshot.forEach((item) => {
        friendarr.push(item.val().receiverid + item.val().senderId);
      });
      setFriendList(friendarr);
    });
  }, []);

  useEffect(() => {
    const usersRef = ref(db, "blockfriends/");
    onValue(usersRef, (snapshot) => {
      let blockarr = [];
      snapshot.forEach((item) => {
        blockarr.push(item.val().blockId + item.val().blockById);
      });
      setBlockList(blockarr);
    });
  }, []);

  let handleSendFrequest = (item) => {
    set(push(ref(db, "friendrequest")), {
      senderId: auth.currentUser.uid,
      sendername: auth.currentUser.displayName,
      receiverid: item.id,
      receivername: item.username,
    });
    set(push(ref(db, "notification/")), {
      senderId: auth.currentUser.uid,
      sendername: auth.currentUser.displayName,
      receiverid: item.id,
      receivername: item.username,
    });
    set(push(ref(db, "notificationLength/" + `${item.id}`)), {
      receiverid: item.id,
    });
  };

  let arr = [];
  let handleSearch = (e) => {
    userlist.filter((item) => {
      if (e.target.value != "") {
        if (
          item.username.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          arr.push(item);
        }
      }
    });
    setSearchuserlist(arr);
  };

  return (
    <div
      className={
        data2
          ? "rounded-2xl p-2 xl:p-10 h-[451px] overflow-y-scroll shadow-md shadow-indigo-500/50"
          : "rounded-2xl p-2 xl:p-10 h-[451px] overflow-y-scroll shadow-md "
      }
    >
      <div className="flex justify-between mb-10">
        <h1 className="font-nunito font-bold text-xl sml:text-2xl mt-10">
          User List
        </h1>
        <Search type={handleSearch} />
      </div>

      {userlist.length == 0 ? (
        <p className="bg-green-600 p-2.5 rounded-md text-center text-white text-2xl font-nunito mt-4">
          No Users Are Available
        </p>
      ) : searchuserlist == "" ? (
        userlist.map((item) => (
          <div className="flex justify-between mt-4 border-b pb-2.5 items-center">
            <div>
              <img
                src={item.profile_picture}
                className="w-12 h-12 sml:w-16 sml:h-16 rounded-[50%]"
              />
            </div>
            <div>
              <h1 className="font-nunito font-bold text-base">
                {item.username}
              </h1>
              <p className="font-nunito font-semibold text-[12px] sml:text-sm opacity-60">
                {item.email}
              </p>
            </div>
            <div>
              {friendList.includes(item.id + auth.currentUser.uid) ||
              friendList.includes(auth.currentUser.uid + item.id) ? (
                <button className="bg-primary text-white font-nunito font-bold text-lg rounded p-1">
                  Friend
                </button>
              ) : friend.includes(item.id + auth.currentUser.uid) ||
                friend.includes(auth.currentUser.uid + item.id) ? (
                <button className="bg-primary text-white font-nunito font-bold text-lg rounded p-1">
                  Pending
                </button>
              ) : blockList.includes(item.id + auth.currentUser.uid) ||
                blockList.includes(auth.currentUser.uid + item.id) ? (
                <button className="bg-primary text-white font-nunito font-bold text-lg rounded p-1">
                  Blocked
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
        ))
      ) : (
        searchuserlist.map((item) => (
          <div className="flex justify-between mt-4 border-b pb-2.5 items-center">
            <div>
              <img
                src={item.profile_picture}
                className="w-16 h-16 rounded-[50%]"
              />
            </div>
            <div>
              <h1 className="font-nunito font-bold text-base">
                {item.username}
              </h1>
              <p className="font-nunito font-semibold text-sm opacity-60">
                {item.email}
              </p>
            </div>
            <div>
              {friendList.includes(item.id + auth.currentUser.uid) ||
              friendList.includes(auth.currentUser.uid + item.id) ? (
                <button className="bg-primary text-white font-nunito font-bold text-lg rounded p-1">
                  Friend
                </button>
              ) : friend.includes(item.id + auth.currentUser.uid) ||
                friend.includes(auth.currentUser.uid + item.id) ? (
                <button className="bg-primary text-white font-nunito font-bold text-lg rounded p-1">
                  Pending
                </button>
              ) : blockList.includes(item.id + auth.currentUser.uid) ||
                blockList.includes(auth.currentUser.uid + item.id) ? (
                <button className="bg-primary text-white font-nunito font-bold text-lg rounded p-1">
                  Blocked
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
        ))
      )}
    </div>
  );
};

export default UserList;
