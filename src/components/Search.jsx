import React from "react";
import { FiSearch } from "react-icons/fi";

const search = () => {
  return (
    <div className="relative">
      <div className="flex">
        <FiSearch className="absolute top-5 ml-6 text-2xl mt-[-7px]" />
        <input
          type="search"
          placeholder="search"
          className=" border border-solid shadow-md rounded-2xl w-[427px] px-20 py-3 font-nunito font-semibold text-base"
        />
      </div>
    </div>
  );
};

export default search;
