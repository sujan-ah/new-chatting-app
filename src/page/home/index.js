import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Group from "../../components/Group";
import Friends from "../../components/Friends";
import FriendRequist from "../../components/FriendRequist";
import MyGroups from "../../components/MyGroups";
import UserList from "../../components/UserList";
import BlockedUsers from "../../components/BlockedUsers";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  let [varify, setVarify] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    } else {
      if (auth.currentUser && auth.currentUser.emailVerified) {
        setVarify(true);
      }
    }
  }, []);

  return (
    <>
      {varify ? (
        <div className="xl:flex justify-between">
          <div className="xl:w-[186px] ">
            <Sidebar active="home" />
          </div>
          <div className="xl:w-[540px] mb-10 xl:mb-0  p-5 xl:p-0">
            <Group />
            <FriendRequist />
          </div>
          <div className="xl:w-[540px] mb-10 xl:mb-0  p-5 xl:p-0">
            <Friends block="true" />
            <MyGroups />
          </div>
          <div className="xl:w-[540px] mb-10 xl:mb-0  p-5 xl:p-0">
            <UserList />
            <BlockedUsers />
          </div>
        </div>
      ) : (
        <div className="text-center mt-10">
          <h1 className="rounded bg-primary p-5 text-5xl text-white font-nunito font-bold inline-block">
            Please Varify Your Email
          </h1>
        </div>
      )}
    </>
  );
};

export default Home;
