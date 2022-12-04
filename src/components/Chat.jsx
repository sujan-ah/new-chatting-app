import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import moment from "moment/moment";

const Chat = () => {
  const db = getDatabase();
  const auth = getAuth();

  let [msg, setMsg] = useState("");
  let [singlemsglist, setSinglemsglist] = useState([]);
  let [groupmsglist, setGroupmsglist] = useState([]);

  let data = useSelector((state) => state.activeChat.value);

  let handleMsg = (e) => {
    setMsg(e.target.value);
  };

  let handleMsgSend = () => {
    if (data.status == "group") {
      const db = getDatabase();
      set(push(ref(db, "groupmsg")), {
        whosenderid: auth.currentUser.uid,
        whosendername: auth.currentUser.displayName,
        whoreceiverid: data.groupId,
        whoreceivername: data.name,
        msg: msg,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
      });
    } else {
      const db = getDatabase();
      set(push(ref(db, "singlemsg")), {
        whosenderid: auth.currentUser.uid,
        whosendername: auth.currentUser.displayName,
        whoreceiverid: data.id,
        whoreceivername: data.name,
        msg: msg,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
      });
    }
  };

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "singlemsg");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          (item.val().whoreceiverid == auth.currentUser.uid &&
            item.val().whosenderid == data.id) ||
          (item.val().whosenderid == auth.currentUser.uid &&
            item.val().whoreceiverid == data.id)
        ) {
          arr.push(item.val());
        }
      });
      setSinglemsglist(arr);
    });
  }, [data.id]);

  useEffect(() => {
    const groupmsgrefRef = ref(db, "groupmsg");
    onValue(groupmsgrefRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });
      setGroupmsglist(arr);
    });
  }, [data.groupId]);

  return (
    <div className="bg-white h-[87vh] p-4 border-l border-solid border-black shadow-md  rounded-2xl">
      <div className="flex gap-x-4 mt-4 border-b pb-2.5 items-center">
        <div>
          <img src="images/groupimg.png" className="w-16 h-16 rounded-[50%]" />
        </div>
        <div>
          <h1 className="font-nunito font-bold text-base">
            {data.name ? data.name : "Select a group name or friend"}
          </h1>
          <p className="font-nunito font-semibold text-sm opacity-60">Online</p>
        </div>
      </div>

      <div className=" h-[68vh] overflow-y-scroll">
        {data.status == "group"
          ? groupmsglist.map((item) =>
              item.whosenderid == auth.currentUser.uid
                ? item.whoreceiverid == data.groupId && (
                    <div className="mt-5 flex justify-end">
                      <div>
                        <p className="font-nunito font-medium text-xl text-white bg-primary inline-block p-3.5 rounded-xl">
                          {item.msg}
                        </p>
                        <p className="font-nunito font-medium text-sm text-[#bebebe] mt-1">
                          {" "}
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </p>
                      </div>
                    </div>
                  )
                : item.whoreceiverid == data.groupId && (
                    <div className="mt-5">
                      <p className="font-nunito font-medium text-xl bg-[#F1F1F1] inline-block p-3.5 rounded-xl">
                        {item.msg}
                      </p>
                      <p className="font-nunito font-medium text-sm text-[#bebebe] mt-1">
                        {" "}
                        {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                      </p>
                    </div>
                  )
            )
          : singlemsglist.map((item) =>
              item.whosenderid == auth.currentUser.uid ? (
                <div className="mt-5 flex justify-end">
                  <div>
                    <p className="bg-primary text-white p-4 font-nunito font-semibold text-md rounded-xl inline-block">
                      {item.msg}
                    </p>
                    <p className="font-nunito font-semibold text-sm opacity-60 mt-1">
                      {moment(item.date, "YYYYMMDD, h:mm").fromNow()}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-5">
                  <p className="bg-[#F1F1F1] p-4 font-nunito font-semibold text-md rounded-xl  inline-block">
                    {item.msg}
                  </p>
                  <p className="font-nunito font-semibold text-sm opacity-60 mt-1">
                    {moment(item.date, "YYYYMMDD, h:mm").fromNow()}
                  </p>
                </div>
              )
            )}

        {/* <div className="mt-5 flex justify-end">
          <div>
            <p className="bg-primary text-white p-4 font-nunito font-semibold text-md rounded-xl inline-block">
              Hi there
            </p>
            <p className="font-nunito font-semibold text-sm opacity-60 mt-1">
              Today, 8:56pm
            </p>
          </div>
        </div>

        <div className="mt-5 ">
          <p className="bg-[#F1F1F1] p-4 font-nunito font-semibold text-md rounded-xl  inline-block">
            <img src="images/registratiomimg.webp" alt="" />
          </p>
          <p className="font-nunito font-semibold text-sm opacity-60 mt-1">
            Today, 8:56pm
          </p>
        </div>

        <div className="mt-5 flex justify-end">
          <div>
            <p className="bg-primary text-white p-4 font-nunito font-semibold text-md rounded-xl inline-block">
              <picture>
                <img src="images/registratiomimg.webp" alt="" />
              </picture>
            </p>
            <p className="font-nunito font-semibold text-sm opacity-60 mt-1">
              Today, 8:56pm
            </p>
          </div>
        </div> */}
      </div>

      <div>
        <input
          onChange={handleMsg}
          className="bg-[#F1F1F1] w-[90%] px-4 rounded py-2 mt-5"
          type="text"
          placeholder="Your Message"
        />
        <button
          onClick={handleMsgSend}
          className="bg-primary ml-2.5	 text-white font-nunito font-bold text-lg rounded p-1"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
