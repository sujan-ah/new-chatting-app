import { useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  push,
  remove,
  set,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";

const MyGroups = () => {
  let db = getDatabase();
  const auth = getAuth();

  let [grouplist, setGrouplist] = useState("");
  let [showinfo, setShowinfo] = useState(false);
  let [memberreq, setMemberreq] = useState([]);
  let [memberlist, setMemberlist] = useState([]);
  let [showmember, setShowmember] = useState(false);

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
          arr.push({ ...gitem.val(), key: gitem.key });
        }
      });
      setMemberreq(arr);
    });
  };

  let handleMemberReject = (item) => {
    remove(ref(db, "groupjoinreq/" + item.key));
  };

  let handleAcceptMember = (item) => {
    set(push(ref(db, "groupmember")), {
      gid: item.gid,
      groupadminid: item.groupadminid,
      groupname: item.groupname,
      grouptag: item.grouptag,
      key: item.key,
      userid: item.userid,
      username: item.username,
      userprofile: item.userprofile,
    }).then(() => {
      remove(ref(db, "groupjoinreq/" + item.key));
    });
  };

  let handleMember = (member) => {
    setShowmember(true);
    const groupRef = ref(db, "groupmember/");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (member.gid == item.val().gid) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setMemberlist(arr);
    });
  };

  let handleMemberRemove = (item) => {
    remove(ref(db, "groupmember/" + item.key));
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
                  onClick={() => handleAcceptMember(item)}
                >
                  Accept
                </button>
              </div>
              <div>
                <button
                  className="bg-red-700 text-white font-nunito font-bold text-lg rounded p-1"
                  onClick={() => handleMemberReject(item)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </>
      ) : showmember ? (
        <>
          <button
            className="bg-primary text-white font-nunito font-bold text-lg rounded p-1"
            onClick={() => setShowmember(!showmember)}
          >
            Back
          </button>
          {memberlist.map((item) => (
            <div className="flex gap-x-4 mt-4 border-b pb-2.5 items-center">
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
              <button
                onClick={() => handleMemberRemove(item)}
                className="bg-primary text-white font-nunito font-bold text-lg rounded p-1"
              >
                Remove
              </button>
            </div>
          ))}
        </>
      ) : grouplist.length == 0 ? (
        <p className="bg-green-600 p-2.5 rounded-md text-center text-white text-2xl font-nunito mt-4">
          No Groups Are Available
        </p>
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
              <button
                onClick={() => handleMember(item)}
                className="bg-primary text-white font-nunito font-bold text-lg rounded p-1"
              >
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
