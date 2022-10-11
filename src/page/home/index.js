import React from "react";
import Sidebar from "../../components/Sidebar";
import Search from "../../components/Search";
import Group from "../../components/Group";

const Home = () => {
  return (
    <div className="flex justify-between">
      <div className="max-w-[186px]">
        <Sidebar active="home" />
      </div>
      <div className="max-w-[427px]">
        <Search />
        <Group />
      </div>
      <div className="max-w-[344px]">dkfjdk</div>
      <div className="max-w-[344px]">dkfd</div>
    </div>
  );
};

export default Home;
