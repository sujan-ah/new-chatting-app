import { MdOutlineHome } from "react-icons/md";
import { TbMessageCircle } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineSetting } from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ active }) => {
  const navigate = useNavigate();
  const auth = getAuth();

  let handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };
  let handleImgModalshow = () => {
    navigate("/imgupload");
  };

  return (
    <div className="flex justify-center xl:block bg-primary px-5 py-5 xl:px-11 xl:py-10 xl:h-screen overflow-x-hidden overflow-y-hidden	fixed bottom-0 xl:static w-full ml-[-12px] xl:ml-0">
      <div className="relative overflow-hidden w-[60px] xl:w-[100px] xl:h-[100px] rounded-[50%] group ">
        <img
          src={auth.currentUser && auth.currentUser.photoURL}
          className="w-[60px] xl:w-[100px] xl:h-[100px] rounded-[50%]"
        />
        <div
          className="w-[50px] h-[50px] bg-primary flex justify-center items-center absolute bottom-0 right-0 hidden group-hover:flex"
          onClick={handleImgModalshow}
        >
          <AiOutlineCloudUpload className="text-white text-2xl" />
        </div>
      </div>

      <h1 className="text-center text-2xl text-white font-nunito font-bold mt-2 leading-6	">
        {auth.currentUser && auth.currentUser.displayName}
      </h1>
      <div className="flex xl:flex-col items-center gap-x-5 xl:gap-x-0 gap-y-16  xl:mt-20 xl:mb-20 ml-5 xl:ml-0">
        <div
          className={`${
            active == "home" &&
            "relative z-10 after:absolute after:top-0 after:left-0 after:content-[''] after:bg-white xl:after:w-[243%] after:h-full  after:z-[-1] xl:px-11 xl:py-5 after:rounded-3xl before:absolute before:top-0 before:right-[-34px] before:content-[''] xl:before:bg-primary xl:before:w-[15%] before:h-full before:rounded-3xl before:drop-shadow-2xl"
          }`}
        >
          <Link to="/">
            <MdOutlineHome
              className={`${
                active == "home"
                  ? "text-3xl xl:text-5xl text-white xl:text-primary"
                  : "text-3xl xl:text-5xl text-white"
              }`}
            />
          </Link>
        </div>

        <div
          className={`${
            active == "message" &&
            "relative z-10 after:absolute after:top-0 after:left-0 after:content-[''] after:bg-white after:w-[243%] after:h-full  after:z-[-1] px-11 py-5 after:rounded-3xl before:absolute before:top-0 before:right-[-34px] before:content-[''] before:bg-primary before:w-[15%] before:h-full before:rounded-3xl before:drop-shadow-2xl"
          }`}
        >
          <Link to="/message">
            <TbMessageCircle
              className={`${
                active == "message"
                  ? "text-3xl xl:text-5xl text-black"
                  : "text-3xl  xl:text-5xl text-white"
              }`}
            />
          </Link>
        </div>

        <IoMdNotificationsOutline className="text-3xl xl:text-5xl text-white" />
        <AiOutlineSetting className="text-3xl xl:text-5xl text-white " />
        <HiOutlineLogout
          onClick={handleLogout}
          className="text-3xl xl:text-5xl text-white xl:mt-32"
        />
      </div>
    </div>
  );
};

export default Sidebar;
