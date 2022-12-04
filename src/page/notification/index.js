import React from "react";
import NotificationMsg from "../../components/NotificationMsg";
import Sidebar from "../../components/Sidebar";

const Notification = () => {
  return (
    <div className="flex justify-between">
      <div className="max-w-[186px]">
        <Sidebar active="notification" />
      </div>
      <div className="w-[427px] mt-10">
        <NotificationMsg />
      </div>
      <div className="w-[900px] mt-10">{/* <Chat /> */}</div>
    </div>
  );
};

export default Notification;
