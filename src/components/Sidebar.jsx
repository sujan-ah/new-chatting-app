import React from "react";
import { MdOutlineHome } from "react-icons/md";
import { TbMessageCircle } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineSetting } from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";

const Sidebar = ({ active }) => {
  return (
    <div className="bg-primary px-11 py-10 h-screen overflow-x-hidden overflow-y-hidden		">
      <img
        src="images/profileimg.png"
        className="w-[100px] h-[100px] rounded-[50%]"
      />
      <div className="flex flex-col items-center gap-y-16 mt-20 mb-20">
        <div
          className={`${
            active == "home" &&
            "relative z-10 after:absolute after:top-0 after:left-0 after:content-[''] after:bg-white after:w-[243%] after:h-full  after:z-[-1] px-11 py-5 after:rounded-3xl before:absolute before:top-0 before:right-[-34px] before:content-[''] before:bg-primary before:w-[15%] before:h-full before:rounded-3xl before:drop-shadow-2xl"
          }`}
        >
          <MdOutlineHome
            className={`${
              active == "home" ? "text-5xl text-black" : "text-5xl text-white"
            }`}
          />
        </div>

        <div
          className={`${
            active == "message" &&
            "relative z-10 after:absolute after:top-0 after:left-0 after:content-[''] after:bg-white after:w-[243%] after:h-full  after:z-[-1] px-11 py-5 after:rounded-3xl before:absolute before:top-0 before:right-[-34px] before:content-[''] before:bg-primary before:w-[15%] before:h-full before:rounded-3xl before:drop-shadow-2xl"
          }`}
        >
          <TbMessageCircle
            className={`${
              active == "message"
                ? "text-5xl text-black"
                : "text-5xl text-white"
            }`}
          />
        </div>

        <IoMdNotificationsOutline className="text-5xl text-white" />
        <AiOutlineSetting className="text-5xl text-white " />
        <HiOutlineLogout className="text-5xl text-white mt-32" />
      </div>
    </div>
  );
};

export default Sidebar;
