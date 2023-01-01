import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";

const NotificationMsg = () => {
  let data2 = useSelector((state) => state.darkmood.value2);

  let db = getDatabase();
  const auth = getAuth();

  let [notificationMsg, setNotificationMsg] = useState([]);

  useEffect(() => {
    const notificationRef = ref(db, "notification");
    onValue(notificationRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          item.val().groupadminid == auth.currentUser.uid ||
          item.val().blockId == auth.currentUser.uid ||
          item.val().receiverid == auth.currentUser.uid ||
          item.val().senderIdnotifi == auth.currentUser.uid ||
          item.val().senderunblockId == auth.currentUser.uid ||
          item.val().useracceptid == auth.currentUser.uid
        ) {
          arr.push(item.val());
        }
      });
      setNotificationMsg(arr);
    });
  }, []);

  return (
    <div
      className={
        data2
          ? "rounded-2xl p-10 w-[1100px] h-[885px] overflow-y-scroll shadow-md shadow-indigo-500/50 mb-10"
          : "rounded-2xl p-10 w-[1100px] h-[885px] overflow-y-scroll shadow-md mb-10 "
      }
    >
      {notificationMsg.length == 0 ? (
        <p className="bg-green-600 p-2.5 rounded-md text-center text-white text-2xl font-nunito mt-4">
          No Notifications Are Available
        </p>
      ) : (
        notificationMsg.map((item) => (
          <div className="flex justify-between mt-4 pb-2.5 items-center">
            {item.groupadminid && (
              <div
                className={
                  data2
                    ? "font-nunito font-semibold text-2xl bg-[#A7A9A6] p-5 rounded-md	text-black w-[1000px] text-center"
                    : "font-nunito font-semibold text-2xl bg-[#E9E9E9] text-black p-5 rounded-md w-[1000px] text-center"
                }
              >
                <b>{item.username}</b> send a request in your{" "}
                <b>{item.groupname}</b> group
              </div>
            )}
            {item.blockId && (
              <div
                className={
                  data2
                    ? "font-nunito font-semibold text-2xl bg-[#A7A9A6] p-5 rounded-md	text-black w-[1000px] text-center"
                    : "font-nunito font-semibold text-2xl bg-[#E9E9E9] text-black p-5 rounded-md w-[1000px] text-center"
                }
              >
                <b>{item.blockBy}</b> blocked you
              </div>
            )}
            {item.receiverid && (
              <div
                className={
                  data2
                    ? "font-nunito font-semibold text-2xl bg-[#A7A9A6] p-5 rounded-md	text-black w-[1000px] text-center"
                    : "font-nunito font-semibold text-2xl bg-[#E9E9E9] text-black p-5 rounded-md w-[1000px] text-center"
                }
              >
                <b>{item.sendername}</b> send a friendrequest you
              </div>
            )}
            {item.senderIdnotifi && (
              <div
                className={
                  data2
                    ? "font-nunito font-semibold text-2xl bg-[#A7A9A6] p-5 rounded-md	text-black w-[1000px] text-center"
                    : "font-nunito font-semibold text-2xl bg-[#E9E9E9] text-black p-5 rounded-md w-[1000px] text-center"
                }
              >
                <b>{item.receivername}</b> Accepted Your friend Request
              </div>
            )}
            {item.senderunblockId && (
              <div
                className={
                  data2
                    ? "font-nunito font-semibold text-2xl bg-[#A7A9A6] p-5 rounded-md	text-black w-[1000px] text-center"
                    : "font-nunito font-semibold text-2xl bg-[#E9E9E9] text-black p-5 rounded-md w-[1000px] text-center"
                }
              >
                {" "}
                <b>{item.receivername}</b> Unblocked You
              </div>
            )}
            {item.useracceptid && (
              <div
                className={
                  data2
                    ? "font-nunito font-semibold text-2xl bg-[#A7A9A6] p-5 rounded-md	text-black w-[1000px] text-center"
                    : "font-nunito font-semibold text-2xl bg-[#E9E9E9] text-black p-5 rounded-md w-[1000px] text-center"
                }
              >
                {" "}
                <b>{item.groupname}</b> Joined You in the Group
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationMsg;
