import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { activeChat } from "../slices/activeChat";

const NotificationMsg = () => {
  let db = getDatabase();
  const auth = getAuth();
  const dispatch = useDispatch();

  let [notificationMsg, setNotificationMsg] = useState([]);

  useEffect(() => {
    const groupRef = ref(db, "notification");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().groupadminid == auth.currentUser.uid) {
          arr.push(item.val());
        }
      });
      setNotificationMsg(arr);
    });
  }, []);

  useEffect(() => {
    const groupRef = ref(db, "notificationLength");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().groupadminid == auth.currentUser.uid) {
          arr.push(item.val());
        }
      });
      dispatch(activeChat(arr));
    });
  }, []);

  return (
    <>
      {notificationMsg.map((item) => (
        <div className="flex justify-between mt-4 border-b pb-2.5 items-center">
          <p className="font-nunito font-semibold text-base">
            <b>{item.username}</b> send a request in your{" "}
            <b>{item.groupname}</b> group
          </p>
        </div>
      ))}
    </>
  );
};

export default NotificationMsg;
