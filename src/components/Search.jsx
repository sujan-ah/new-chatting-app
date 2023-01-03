import React from "react";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";

const Search = ({ type }) => {
  let data2 = useSelector((state) => state.darkmood.value2);

  return (
    <div className="relative ">
      <div className="flex mt-9 xl:mt-8 ">
        <FiSearch
          className={
            data2
              ? "absolute top-[53px] ml-3  text-md mt-[-7px] sml:mt-[-4px]  xl:mt-[-7px] text-black"
              : "absolute top-[53px] ml-3 text-md mt-[-7px] sml:mt-[-4px] xl:mt-[-7px]"
          }
        />
        <input
          onChange={type}
          type="search"
          placeholder="search"
          className="text-black border border-solid shadow-md rounded-2xl  w-[130px]  sml:w-[227px] px-8 sml:px-10 py-1 sml:py-2 font-nunito font-semibold text-base "
        />
      </div>
    </div>
  );
};

export default Search;
