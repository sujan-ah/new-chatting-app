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
import { TbMessageCircle } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { activeChat } from "../slices/activeChat";
import Search from "./Search";

const Friends = (props) => {
  const auth = getAuth();
  const db = getDatabase();
  let dispatch = useDispatch();
  const [friends, setFriends] = useState([]);
  const [searchfriendslist, setSearchfriendslist] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "friends/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          auth.currentUser.uid == item.val().receiverid ||
          auth.currentUser.uid == item.val().senderId
        ) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setFriends(arr);
    });
  }, []);

  let handleBlock = (item) => {
    auth.currentUser.uid == item.senderId
      ? set(push(ref(db, "blockfriends/")), {
          id: item.key,
          block: item.receivername,
          blockId: item.receiverid,
          blockBy: item.sendername,
          blockById: item.senderId,
        }).then(() => {
          remove(ref(db, "friends/" + item.key));
        })
      : set(push(ref(db, "blockfriends/")), {
          id: item.key,
          block: item.sendername,
          blockId: item.senderId,
          blockBy: item.receivername,
          blockById: item.receiverid,
        }).then(() => {
          remove(ref(db, "friends/" + item.key));
        });

    auth.currentUser.uid == item.senderId
      ? set(push(ref(db, "notification/")), {
          id: item.key,
          block: item.receivername,
          blockId: item.receiverid,
          blockBy: item.sendername,
          blockById: item.senderId,
        })
      : set(push(ref(db, "notification/")), {
          id: item.key,
          block: item.sendername,
          blockId: item.senderId,
          blockBy: item.receivername,
          blockById: item.receiverid,
        });

    auth.currentUser.uid == item.senderId
      ? set(push(ref(db, "notificationLength/" + `${item.receiverid}`)), {
          blockId: item.receiverid,
        })
      : set(push(ref(db, "notificationLength/" + `${item.senderId}`)), {
          blockId: item.senderId,
        });
  };

  let handleActiveChat = (item) => {
    let userInfo = {};
    if (item.receiverid == auth.currentUser.uid) {
      userInfo.status = "single";
      userInfo.id = item.senderId;
      userInfo.name = item.sendername;
    } else {
      userInfo.status = "single";
      userInfo.id = item.receiverid;
      userInfo.name = item.receivername;
    }
    dispatch(activeChat(userInfo));
  };

  let arr = [];
  let handleSearch = (e) => {
    friends.filter((item) => {
      if (e.target.value != "") {
        if (
          item.sendername.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          arr.push(item);
        }
      }
    });
    setSearchfriendslist(arr);
  };

  return (
    <div className="rounded-2xl p-10 h-[451px] overflow-y-scroll shadow-md">
      <Search type={handleSearch} />
      <h1 className="font-nunito font-bold text-lg mt-5">Friends</h1>
      {friends.length == 0 ? (
        <p className="bg-green-600 p-2.5 rounded-md text-center text-white text-2xl font-nunito mt-4">
          No Friends Are Available
        </p>
      ) : searchfriendslist == "" ? (
        friends.map((item) => (
          <div
            onClick={() => handleActiveChat(item)}
            className="flex justify-between mt-4 border-b pb-2.5 items-center"
          >
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

            {props.block ? (
              <button
                className="bg-primary text-white font-nunito font-bold text-lg rounded p-1"
                onClick={() => handleBlock(item)}
              >
                Block
              </button>
            ) : (
              <button className="bg-primary text-3xl	 text-white font-nunito font-bold text-lg rounded p-1">
                <TbMessageCircle />
              </button>
            )}
          </div>
        ))
      ) : (
        searchfriendslist.map((item) => (
          <div
            onClick={() => handleActiveChat(item)}
            className="flex justify-between mt-4 border-b pb-2.5 items-center"
          >
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

            {props.block ? (
              <button
                className="bg-primary text-white font-nunito font-bold text-lg rounded p-1"
                onClick={() => handleBlock(item)}
              >
                Block
              </button>
            ) : (
              <button className="bg-primary text-3xl	 text-white font-nunito font-bold text-lg rounded p-1">
                <TbMessageCircle />
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Friends;
