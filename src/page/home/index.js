import React from "react";
import Sidebar from "../../components/Sidebar";
import Search from "../../components/Search";
import Group from "../../components/Group";
import Friends from "../../components/Friends";
import FriendRequist from "../../components/FriendRequist";
import MyGroups from "../../components/MyGroups";
import UserList from "../../components/UserList";
import BlockedUsers from "../../components/BlockedUsers";

const Home = () => {
  return (
    <div className="flex justify-between">
      <div className="w-[186px]">
        <Sidebar active="home" />
      </div>
      <div className="w-[540px]">
        <Search />
        <Group />
        <FriendRequist />
      </div>
      <div className="w-[540px]">
        <Friends />
        <MyGroups />
      </div>
      <div className="w-[540px]">
        <UserList />
        <BlockedUsers />
      </div>
    </div>
  );
};

export default Home;
