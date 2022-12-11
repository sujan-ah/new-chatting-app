import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

const NotificationMsg = () => {
  let db = getDatabase();
  const auth = getAuth();

  let [notificationMsg, setNotificationMsg] = useState([]);

  useEffect(() => {
    const notificationRef = ref(db, "notification");
    onValue(notificationRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log(item.val().id);
        if (
          item.val().groupadminid == auth.currentUser.uid ||
          item.val().blockId == auth.currentUser.uid ||
          item.val().receiverid == auth.currentUser.uid ||
          item.val().senderIdnotifi == auth.currentUser.uid
        ) {
          console.log(item.val());
          arr.push(item.val());
        }
      });
      setNotificationMsg(arr);
    });
  }, []);

  return (
    <>
      {notificationMsg.length == 0 ? (
        <p className="bg-green-600 p-2.5 rounded-md text-center text-white text-2xl font-nunito mt-4">
          No Notifications Are Available
        </p>
      ) : (
        notificationMsg.map((item) => (
          <div className="flex justify-between mt-4 border-b pb-2.5 items-center">
            {item.username && (
              <p className="font-nunito font-semibold text-base">
                <b>{item.username}</b> send a request in your{" "}
                <b>{item.groupname}</b> group
              </p>
            )}
            {item.blockId && (
              <p className="font-nunito font-semibold text-base">
                <b>{item.blockBy}</b> blocked you
              </p>
            )}
            {item.receiverid && (
              <p className="font-nunito font-semibold text-base">
                <b>{item.sendername}</b> send a friendrequest you
              </p>
            )}
            {item.senderIdnotifi && (
              <p className="font-nunito font-semibold text-base">
                <b>{item.receivername}</b> Accepted Your friend Request
              </p>
            )}
          </div>
        ))
      )}
    </>
  );
};

export default NotificationMsg;
