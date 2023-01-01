import React from "react";
import { FiSearch } from "react-icons/fi";

const Search = ({ type }) => {
  return (
    <div className="relative ">
      <div className="flex mt-8 ">
        <FiSearch className="absolute top-[53px] ml-5 text-md mt-[-7px]" />
        <input
          onChange={type}
          type="search"
          placeholder="search"
          className="text-black border border-solid shadow-md rounded-2xl w-full xl:w-[227px] px-10 py-2 font-nunito font-semibold text-base "
        />
      </div>
    </div>
  );
};

export default Search;
