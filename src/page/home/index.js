import { useEffect } from "react";
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

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="xl:flex justify-between p-2.5 xl:p-0">
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
  );
};

export default Home;
