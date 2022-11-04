import { useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";

const MyGroups = () => {
  let db = getDatabase();
  const auth = getAuth();

  let [grouplist, setGrouplist] = useState("");
  let [showinfo, setShowinfo] = useState(false);
  let [memberreq, setMemberreq] = useState([]);

  useEffect(() => {
    const groupRef = ref(db, "Group/");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().groupadminId == auth.currentUser.uid) {
          arr.push({ ...item.val(), gid: item.key });
        }
      });
      setGrouplist(arr);
    });
  }, []);

  let handleReqShow = (item) => {
    setShowinfo(!showinfo);
    const groupRef = ref(db, "groupjoinreq/");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((gitem) => {
        if (
          item.groupadminId == auth.currentUser.uid &&
          item.gid == gitem.val().gid
        ) {
          arr.push(gitem.val());
        }
      });
      setMemberreq(arr);
    });
  };

  return (
    <div className="mt-10 rounded-2xl p-10 h-[462px] overflow-y-scroll shadow-md">
      <h1 className="font-nunito font-bold text-lg">My Groups</h1>
      {showinfo ? (
        <>
          <button
            className="bg-primary text-white font-nunito font-bold text-lg rounded p-1"
            onClick={() => setShowinfo(!showinfo)}
          >
            Back
          </button>
          {memberreq.map((item) => (
            <div className="flex justify-between mt-4 border-b pb-2.5 items-center">
              <div>
                <img
                  src={item.userprofile}
                  className="w-16 h-16 rounded-[50%]"
                />
              </div>
              <div>
                <h1 className="font-nunito font-bold text-base">
                  {item.username}{" "}
                </h1>
                <p className="font-nunito font-semibold text-sm opacity-60">
                  {item.grouptag}
                </p>
              </div>

              <div>
                <button
                  className="bg-primary text-white font-nunito font-bold text-lg rounded p-1"
                  // onClick={() => handleReqShow(item)}
                >
                  Accept
                </button>
              </div>
              <div>
                <button className="bg-red-700 text-white font-nunito font-bold text-lg rounded p-1">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        grouplist &&
        grouplist.map((item) => (
          <div className="flex justify-between mt-4 border-b pb-2.5 items-center">
            <div>
              <img
                src="images/groupimg.png"
                className="w-16 h-16 rounded-[50%]"
              />
            </div>
            <div>
              <h1 className="font-nunito font-bold text-base">
                {item.groupname}{" "}
              </h1>
              <p className="font-nunito font-semibold text-sm opacity-60">
                {item.grouptag}
              </p>
            </div>

            <div>
              <button
                className="bg-primary text-white font-nunito font-bold text-lg rounded p-1"
                onClick={() => handleReqShow(item)}
              >
                Info
              </button>
            </div>
            <div>
              <button className="bg-primary text-white font-nunito font-bold text-lg rounded p-1">
                Members
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyGroups;
