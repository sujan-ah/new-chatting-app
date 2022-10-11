import React from "react";
import { MdOutlineHome } from "react-icons/md";
import { TbMessageCircle } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineSetting } from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";

const Sidebar = () => {
  return (
    <div className="bg-primary px-11 py-10 h-screen overflow-y-hidden		">
      <img
        src="images/profileimg.png"
        className="w-[100px] h-[100px] rounded-[50%]"
      />
      <div className="flex flex-col items-center gap-y-20 mt-20 ">
        <MdOutlineHome className="text-5xl text-white " />
        <TbMessageCircle className="text-5xl text-white" />
        <IoMdNotificationsOutline className="text-5xl text-white" />
        <AiOutlineSetting className="text-5xl text-white " />
        <HiOutlineLogout className="text-5xl text-white mt-36" />
      </div>
    </div>
  );
};

export default Sidebar;
