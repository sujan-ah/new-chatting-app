import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Search from "../../components/Search";
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
  console.log(auth.currentUser);

  let [varify, setVarify] = useState(false);

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
        <div className="xl:flex justify-between p-5 xl:p-0">
          <div className="xl:w-[186px] ">
            <Sidebar active="home" />
          </div>
          <div className="xl:w-[540px]">
            <Search />
            <Group />
            <FriendRequist />
          </div>
          <div className="xl:w-[540px]">
            <Friends />
            <MyGroups />
          </div>
          <div className="xl:w-[540px]">
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
