import { useState } from "react";
import { useDispatch } from "react-redux";
import { darkmood } from "../slices/activeChat";

const Darkmood = () => {
  const dispatch = useDispatch();
  let [dark, setDark] = useState(false);
  dispatch(darkmood(dark));

  return (
    <div className="mt-0 sm:mt-[-15px] md:mt-0 lg:mt-0">
      <input
        className="dark"
        onChange={() => setDark(!dark)}
        id="abc"
        type="checkbox"
      />
      <label className="abc" for="abc"></label>
    </div>
  );
};

export default Darkmood;
