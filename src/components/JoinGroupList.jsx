import React from "react";
import { useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { activeChat } from "../slices/activeChat";
import Search from "./Search";

const JoinGroupList = () => {
  let db = getDatabase();
  const auth = getAuth();
  const dispatch = useDispatch();

  let [jglist, setJglist] = useState([]);
  let [gmember, setGmember] = useState([]);
  const [searchJglistlist, setSearchJglistlist] = useState([]);
  const [searchGmemberlist, setSearchGmemberlist] = useState([]);

  useEffect(() => {
    const groupRef = ref(db, "Group/");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().groupadminId == auth.currentUser.uid) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setJglist(arr);
    });
  }, []);

  useEffect(() => {
    const groupRef = ref(db, "groupmember/");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().userid == auth.currentUser.uid) {
          arr.push(item.val());
        }
      });
      setGmember(arr);
    });
  }, []);

  let handleActiveChat = (item) => {
    let userInfo = {
      status: "group",
      name: item.groupname,
      groupId: auth.currentUser.uid == item.groupadminId ? item.key : item.gid,
    };
    dispatch(activeChat(userInfo));
  };

  let arr = [];
  let handleSearch = (e) => {
    jglist.filter((item) => {
      console.log(item);
      if (e.target.value != "") {
        if (
          item.groupname.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          arr.push(item);
        }
      }
    });
    setSearchJglistlist(arr);

    gmember.filter((item) => {
      console.log(item);
      if (e.target.value != "") {
        if (
          item.groupname.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          arr.push(item);
        }
      }
    });
    setSearchGmemberlist(arr);
  };

  return (
    <div className="mb-10 rounded-2xl p-10 h-[347px] overflow-y-scroll shadow-md">
      <Search type={handleSearch} />
      <h1 className="mt-10 font-nunito font-bold text-lg flex justify-between">
        Joined Group
      </h1>
      {jglist.length == 0 ? (
        <p className="bg-green-600 p-2.5 rounded-md text-center text-white text-2xl font-nunito mt-4">
          No Created Groups Are Available
        </p>
      ) : gmember.length == 0 ? (
        <p className="bg-green-600 p-2.5 rounded-md text-center text-white text-2xl font-nunito mt-4">
          No Joined Groups Are Available
        </p>
      ) : searchJglistlist == "" ? (
        jglist.map((item) => (
          <div
            onClick={() => handleActiveChat(item)}
            className="flex gap-x-16 mt-4 border-b pb-2.5 items-center"
          >
            <div>
              <img
                src="images/groupimg.png"
                className="w-16 h-16 rounded-[50%]"
              />
            </div>
            <div>
              <h1 className="font-nunito font-bold text-base">
                {item.groupname}{" "}
                <span className="font-nunito font-semibold text-sm opacity-60">
                  Admin: {item.groupadmin}
                </span>
              </h1>
              <p className="font-nunito font-semibold text-sm opacity-60">
                {item.grouptag}
              </p>
            </div>
          </div>
        ))
      ) : (
        searchJglistlist.map((item) => (
          <div
            onClick={() => handleActiveChat(item)}
            className="flex gap-x-16 mt-4 border-b pb-2.5 items-center"
          >
            <div>
              <img
                src="images/groupimg.png"
                className="w-16 h-16 rounded-[50%]"
              />
            </div>
            <div>
              <h1 className="font-nunito font-bold text-base">
                {item.groupname}{" "}
                <span className="font-nunito font-semibold text-sm opacity-60">
                  Admin: {item.groupadmin}
                </span>
              </h1>
              <p className="font-nunito font-semibold text-sm opacity-60">
                {item.grouptag}
              </p>
            </div>
          </div>
        ))
      )}
      {searchGmemberlist == ""
        ? gmember.map((item) => (
            <div
              onClick={() => handleActiveChat(item)}
              className="flex gap-x-16 mt-4 border-b pb-2.5 items-center"
            >
              <div>
                <img
                  src="images/groupimg.png"
                  className="w-16 h-16 rounded-[50%]"
                />
              </div>
              <div>
                <h1 className="font-nunito font-bold text-base">
                  {item.groupname}{" "}
                </h1>
                <p className="font-nunito font-semibold text-sm opacity-60">
                  {item.grouptag}
                </p>
              </div>
            </div>
          ))
        : searchGmemberlist.map((item) => (
            <div
              onClick={() => handleActiveChat(item)}
              className="flex gap-x-16 mt-4 border-b pb-2.5 items-center"
            >
              <div>
                <img
                  src="images/groupimg.png"
                  className="w-16 h-16 rounded-[50%]"
                />
              </div>
              <div>
                <h1 className="font-nunito font-bold text-base">
                  {item.groupname}{" "}
                </h1>
                <p className="font-nunito font-semibold text-sm opacity-60">
                  {item.grouptag}
                </p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default JoinGroupList;
