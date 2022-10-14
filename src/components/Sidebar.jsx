import React from "react";
import { MdOutlineHome } from "react-icons/md";
import { TbMessageCircle } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineSetting } from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";

const Sidebar = ({ active }) => {
  return (
    <div className="flex justify-center xl:block bg-primary px-5 py-5 xl:px-11 xl:py-10 xl:h-screen overflow-x-hidden overflow-y-hidden	fixed bottom-0 xl:static w-full ml-[-12px] xl:ml-0">
      <img
        src="images/profileimg.png"
        className="w-[60px] xl:w-[100px] xl:h-[100px] rounded-[50%]"
      />
      <div className="flex xl:flex-col items-center gap-x-5 xl:gap-x-0 gap-y-16  xl:mt-20 xl:mb-20 ml-5 xl:ml-0">
        <div
          className={`${
            active == "home" &&
            "relative z-10 after:absolute after:top-0 after:left-0 after:content-[''] after:bg-white xl:after:w-[243%] after:h-full  after:z-[-1] xl:px-11 xl:py-5 after:rounded-3xl before:absolute before:top-0 before:right-[-34px] before:content-[''] xl:before:bg-primary xl:before:w-[15%] before:h-full before:rounded-3xl before:drop-shadow-2xl"
          }`}
        >
          <MdOutlineHome
            className={`${
              active == "home"
                ? "text-3xl xl:text-5xl text-white xl:text-primary"
                : "text-3xl xl:text-5xl text-white"
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
                ? "text-3xl xl:text-5xl text-black"
                : "text-3xl  xl:text-5xl text-white"
            }`}
          />
        </div>

        <IoMdNotificationsOutline className="text-3xl xl:text-5xl text-white" />
        <AiOutlineSetting className="text-3xl xl:text-5xl text-white " />
        <HiOutlineLogout className="text-3xl xl:text-5xl text-white xl:mt-32" />
      </div>
    </div>
  );
};

export default Sidebar;
