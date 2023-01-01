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
      <div className="w-[540px]">
        <JoinGroupList />
        <Friends />
      </div>
      <div className="w-[1080px]">
        <Chat />
      </div>
    </div>
  );
};

export default Message;
