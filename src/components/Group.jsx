import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import Search from "./Search";

const Group = () => {
  let db = getDatabase();
  const auth = getAuth();

  let [cgroup, setCreategroup] = useState(false);
  let [groupname, setGroupname] = useState("");
  let [grouptag, setGrouptag] = useState("");
  let [grouplist, setGrouplist] = useState("");
  const [searchGrouplistlist, setSearchGrouplistlist] = useState([]);

  let handleGroup = () => {
    setCreategroup(!cgroup);
  };

  let handleCreateGroup = () => {
    set(push(ref(db, "Group")), {
      groupname: groupname,
      grouptag: grouptag,
      groupadmin: auth.currentUser.displayName,
      groupadminId: auth.currentUser.uid,
    }).then(() => {
      setCreategroup(false);
    });
  };

  useEffect(() => {
    const groupRef = ref(db, "Group/");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().groupadminId !== auth.currentUser.uid) {
          arr.push({ ...item.val(), gid: item.key });
        }
      });
      setGrouplist(arr);
    });
  }, []);

  let handleJoinGroup = (item) => {
    set(push(ref(db, "groupjoinreq")), {
      gid: item.gid,
      groupadminid: item.groupadminId,
      groupname: item.groupname,
      grouptag: item.grouptag,
      userid: auth.currentUser.uid,
      username: auth.currentUser.displayName,
      userprofile: auth.currentUser.photoURL,
    });
    set(push(ref(db, "notification")), {
      gid: item.gid,
      groupadminid: item.groupadminId,
      groupname: item.groupname,
      grouptag: item.grouptag,
      userid: auth.currentUser.uid,
      username: auth.currentUser.displayName,
    });
    set(push(ref(db, "notificationLength/" + `${item.groupadminId}`)), {
      groupadminid: item.groupadminId,
    });
  };

  let arr = [];
  let handleSearch = (e) => {
    grouplist.filter((item) => {
      if (e.target.value != "") {
        if (
          item.groupname.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          arr.push(item);
        }
      }
    });
    setSearchGrouplistlist(arr);
  };

  return (
    <div className="mt-14 rounded-2xl p-10 h-[347px] overflow-y-scroll shadow-md">
      <Search type={handleSearch} />
      <h1 className="font-nunito font-bold text-lg flex justify-between mt-5">
        Groups List
        <button
          className="bg-primary text-white font-nunito font-bold text-lg rounded p-1"
          onClick={handleGroup}
        >
          {cgroup ? "Go back" : "Create Group"}
        </button>
      </h1>

      {cgroup ? (
        <>
          <input
            type="text"
            placeholder="Group Name"
            className="w-full mt-8 border border-solid shadow-md rounded-2xl w-full xl:w-[427px] px-10 py-3 font-nunito font-semibold text-base"
            onChange={(e) => setGroupname(e.target.value)}
          />

          <input
            type="text"
            placeholder="Group Tagline"
            className="w-full mt-4 border border-solid shadow-md rounded-2xl w-full xl:w-[427px] px-10 py-3 font-nunito font-semibold text-base"
            onChange={(e) => setGrouptag(e.target.value)}
          />
          <button
            className="mt-4 py-3 w-full bg-primary text-white font-nunito font-bold text-lg rounded-2xl p-1	"
            onClick={handleCreateGroup}
          >
            Submit
          </button>
        </>
      ) : grouplist.length == 0 ? (
        <p className="bg-green-600 p-2.5 rounded-md text-center text-white text-2xl font-nunito mt-4">
          No Groups Are Available
        </p>
      ) : searchGrouplistlist == "" ? (
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
                <span className="font-nunito font-semibold text-sm opacity-60">
                  Admin: {item.groupadmin}
                </span>
              </h1>
              <p className="font-nunito font-semibold text-sm opacity-60">
                {item.grouptag}
              </p>
            </div>

            <div>
              <button
                className="bg-primary text-white font-nunito font-bold text-lg rounded p-1"
                onClick={() => handleJoinGroup(item)}
              >
                Join
              </button>
            </div>
          </div>
        ))
      ) : (
        searchGrouplistlist &&
        searchGrouplistlist.map((item) => (
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
                <span className="font-nunito font-semibold text-sm opacity-60">
                  Admin: {item.groupadmin}
                </span>
              </h1>
              <p className="font-nunito font-semibold text-sm opacity-60">
                {item.grouptag}
              </p>
            </div>

            <div>
              <button
                className="bg-primary text-white font-nunito font-bold text-lg rounded p-1"
                onClick={() => handleJoinGroup(item)}
              >
                Join
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Group;
