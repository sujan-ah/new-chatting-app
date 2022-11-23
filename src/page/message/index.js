import React from "react";
import Chat from "../../components/Chat";
import Friends from "../../components/Friends";
import JoinGroupList from "../../components/JoinGroupList";
import Sidebar from "../../components/Sidebar";

const Message = () => {
  return (
    <div className="flex justify-between">
      <div className="max-w-[186px]">
        <Sidebar active="message" />
      </div>
      <div className="w-[427px] mt-10">
        <JoinGroupList />
        <Friends />
      </div>
      <div className="w-[1235px] mt-10">
        <Chat />
      </div>
    </div>
  );
};

export default Message;
