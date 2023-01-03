import NotificationMsg from "../../components/NotificationMsg";
import Sidebar from "../../components/Sidebar";

const Notification = () => {
  return (
    <div className="flex justify-between">
      <div className="max-w-[186px]">
        <Sidebar active="notification" />
      </div>
      <div className="hidden xl:w-[220px]"></div>
      <div className="w-full xl:w-[1420px] mt-10">
        <NotificationMsg />
      </div>
    </div>
  );
};

export default Notification;
