import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import moment from "moment/moment";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import EmojiPicker from "emoji-picker-react";
import {
  getStorage,
  ref as sref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Search from "./Search";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

const Chat = () => {
  const db = getDatabase();
  const auth = getAuth();
  const storage = getStorage();

  let [msg, setMsg] = useState("");
  let [singlemsglist, setSinglemsglist] = useState([]);
  let [groupmsglist, setGroupmsglist] = useState([]);
  let [show, setShow] = useState(false);
  let [file, setFile] = useState("");
  let [progress, setProgress] = useState("");
  let [searchSinglemsglistlist, setSearchSinglemsglistlist] = useState([]);
  let [searchGroupmsglist, setSearchGroupmsglist] = useState([]);
  let [emmoji, setEmmoji] = useState(false);
  let [audio, setAudio] = useState(false);
  let [audioData, setAudioData] = useState("");

  let data = useSelector((state) => state.activeChat.value);

  let handleMsg = (e) => {
    setMsg(e.target.value);
  };

  let handleMsgSend = () => {
    if (data.status == "group") {
      const db = getDatabase();
      set(push(ref(db, "groupmsg")), {
        whosenderid: auth.currentUser.uid,
        whosendername: auth.currentUser.displayName,
        whoreceiverid: data.groupId,
        whoreceivername: data.name,
        msg: msg,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
      }).then(() => {
        setMsg("");
      });
    } else {
      const db = getDatabase();
      set(push(ref(db, "singlemsg")), {
        whosenderid: auth.currentUser.uid,
        whosendername: auth.currentUser.displayName,
        whoreceiverid: data.id,
        whoreceivername: data.name,
        msg: msg,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
      }).then(() => {
        setMsg("");
      });
    }
  };

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "singlemsg");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          (item.val().whoreceiverid == auth.currentUser.uid &&
            item.val().whosenderid == data.id) ||
          (item.val().whosenderid == auth.currentUser.uid &&
            item.val().whoreceiverid == data.id)
        ) {
          arr.push(item.val());
        }
      });
      setSinglemsglist(arr);
    });
  }, [data.id]);

  useEffect(() => {
    const groupmsgrefRef = ref(db, "groupmsg");
    onValue(groupmsgrefRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });
      setGroupmsglist(arr);
    });
  }, [data.groupId]);

  let handleSingleImageUpload = (e) => {
    setFile(e.target.files[0]);
  };

  let handleImageUpload = () => {
    const singleImageRef = sref(storage, "singleimages/" + file.name);
    const uploadTask = uploadBytesResumable(singleImageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          if (file !== "") {
            if (data.status == "group") {
              console.log("ami group msg");
              const db = getDatabase();
              set(push(ref(db, "groupmsg")), {
                whosenderid: auth.currentUser.uid,
                whosendername: auth.currentUser.displayName,
                whoreceiverid: data.groupId,
                whoreceivername: data.name,
                img: downloadURL,
                date: `${new Date().getFullYear()}-${
                  new Date().getMonth() + 1
                }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
              }).then(() => {
                setShow(false);
                setProgress("");
              });
            } else {
              const db = getDatabase();
              set(push(ref(db, "singlemsg")), {
                whosenderid: auth.currentUser.uid,
                whosendername: auth.currentUser.displayName,
                whoreceiverid: data.id,
                whoreceivername: data.name,
                img: downloadURL,
                date: `${new Date().getFullYear()}-${
                  new Date().getMonth() + 1
                }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
              }).then(() => {
                setShow(false);
                setProgress("");
              });
            }
          }
        });
      }
    );
  };

  let arr = [];
  let handleSearch = (e) => {
    if (data.status == "group") {
      groupmsglist.filter((item) => {
        if (e.target.value != "") {
          if (item.msg.toLowerCase().includes(e.target.value.toLowerCase())) {
            arr.push(item);
          }
        }
      });
      setSearchGroupmsglist(arr);
    } else {
      singlemsglist.filter((item) => {
        if (e.target.value != "") {
          if (item.msg.toLowerCase().includes(e.target.value.toLowerCase())) {
            arr.push(item);
          }
        }
      });
      setSearchSinglemsglistlist(arr);
    }
  };

  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    setAudio(url);
    setAudioData(blob);
  };

  let handleAudioUpload = () => {
    const audioRef = sref(storage, "audios/" + audioData.type);
    const uploadTask = uploadBytesResumable(audioRef, audioData);
    console.log(uploadTask);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          if (audio !== "") {
            if (data.status == "group") {
              console.log("ami group msg");
              const db = getDatabase();
              set(push(ref(db, "groupmsg")), {
                whosenderid: auth.currentUser.uid,
                whosendername: auth.currentUser.displayName,
                whoreceiverid: data.groupId,
                whoreceivername: data.name,
                audio: downloadURL,
                date: `${new Date().getFullYear()}-${
                  new Date().getMonth() + 1
                }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
              }).then(() => {
                setShow(false);
                setProgress("");
                setAudio(false);
              });
            } else {
              const db = getDatabase();
              set(push(ref(db, "singlemsg")), {
                whosenderid: auth.currentUser.uid,
                whosendername: auth.currentUser.displayName,
                whoreceiverid: data.id,
                whoreceivername: data.name,
                audio: downloadURL,
                date: `${new Date().getFullYear()}-${
                  new Date().getMonth() + 1
                }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
              }).then(() => {
                setShow(false);
                setProgress("");
                setAudio(false);
              });
            }
          }
        });
      }
    );
  };

  return (
    <div className="text-black h-[87vh] p-4 border-l border-solid border-black shadow-md  rounded-2xl">
      <div className="flex gap-x-4 mt-4 border-b pb-2.5 items-center">
        <div>
          <img src="images/groupimg.png" className="w-16 h-16 rounded-[50%]" />
        </div>

        <div>
          <h1 className="font-nunito font-bold text-2xl ">
            {data.name ? data.name : "Select a group name or friend"}
          </h1>
          <p className="font-nunito font-semibold text-sm opacity-60 ">
            Online
          </p>
        </div>

        <div className="ml-72">
          <Search type={handleSearch} />
        </div>
      </div>

      <div className=" h-[68vh] overflow-y-scroll">
        {data.status == "group"
          ? searchGroupmsglist == ""
            ? groupmsglist.map((item) =>
                item.whosenderid == auth.currentUser.uid ? (
                  item.whoreceiverid == data.groupId && item.msg ? (
                    <div className="mt-5 flex justify-end">
                      <div>
                        <p className="font-nunito font-medium text-xl text-[#bebebe]  inline-block  rounded-xl">
                          {item.whosendername}
                        </p>
                        <br />
                        <p className="font-nunito font-medium text-xl text-white bg-primary inline-block p-3.5 rounded-xl">
                          {item.msg}
                        </p>
                        <p className="font-nunito font-medium text-sm text-[#bebebe] mt-1">
                          {" "}
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </p>
                      </div>
                    </div>
                  ) : item.whoreceiverid == data.groupId && item.audio ? (
                    <div className="mt-5 flex justify-end">
                      <div>
                        <p className="font-nunito font-medium text-xl text-[#bebebe]  inline-block  rounded-xl">
                          {item.whosendername}
                        </p>
                        <br />
                        <p className="font-nunito font-medium text-xl text-white bg-primary inline-block p-3.5 rounded-xl">
                          <audio
                            className="text-red"
                            controls
                            src={item.audio}
                          ></audio>
                        </p>

                        <p className="font-nunito font-medium text-sm text-[#bebebe] mt-1">
                          {" "}
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </p>
                      </div>
                    </div>
                  ) : (
                    item.whoreceiverid == data.groupId && (
                      <div className="mt-5 flex justify-end">
                        <div>
                          <p className="font-nunito font-medium text-xl text-[#bebebe]  inline-block  rounded-xl">
                            {item.whosendername}
                          </p>
                          <br />
                          <p className="bg-primary text-white p-4 font-nunito font-semibold text-md rounded-xl inline-block">
                            <picture>
                              <img className="w-52 h-52" src={item.img} />
                            </picture>
                          </p>
                          <p className="font-nunito font-semibold text-sm opacity-60 mt-1">
                            {moment(item.date, "YYYYMMDD, h:mm").fromNow()}
                          </p>
                        </div>
                      </div>
                    )
                  )
                ) : item.whoreceiverid == data.groupId && item.msg ? (
                  <div className="mt-5">
                    <p className="font-nunito font-medium text-xl text-[#bebebe]  inline-block  rounded-xl">
                      {item.whosendername}
                    </p>
                    <br />
                    <p className="font-nunito font-medium text-xl bg-[#F1F1F1] inline-block p-3.5 rounded-xl">
                      {item.msg}
                    </p>
                    <p className="font-nunito font-medium text-sm text-[#bebebe] mt-1">
                      {" "}
                      {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                    </p>
                  </div>
                ) : item.whoreceiverid == data.groupId && item.audio ? (
                  <div className="mt-5">
                    <p className="font-nunito font-medium text-xl text-[#bebebe]  inline-block  rounded-xl">
                      {item.whosendername}
                    </p>
                    <br />
                    <audio
                      className="text-red"
                      controls
                      src={item.audio}
                    ></audio>
                    <p className="font-nunito font-medium text-sm text-[#bebebe] mt-1">
                      {" "}
                      {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                    </p>
                  </div>
                ) : (
                  item.whoreceiverid == data.groupId && (
                    <div className="mt-5 ">
                      <p className="font-nunito font-medium text-xl text-[#bebebe]  inline-block  rounded-xl">
                        {item.whosendername}
                      </p>
                      <br />
                      <p className="bg-[#F1F1F1] p-4 font-nunito font-semibold text-md rounded-xl  inline-block">
                        <img className="w-52 h-52" src={item.img} />
                      </p>
                      <p className="font-nunito font-semibold text-sm opacity-60 mt-1">
                        {moment(item.date, "YYYYMMDD, h:mm").fromNow()}
                      </p>
                    </div>
                  )
                )
              )
            : searchGroupmsglist.map((item) =>
                item.whosenderid == auth.currentUser.uid ? (
                  item.whoreceiverid == data.groupId && item.msg ? (
                    <div className="mt-5 flex justify-end">
                      <div>
                        <p className="font-nunito font-medium text-xl text-[#bebebe]  inline-block  rounded-xl">
                          {item.whosendername}
                        </p>
                        <br />
                        <p className="font-nunito font-medium text-xl text-white bg-primary inline-block p-3.5 rounded-xl">
                          {item.msg}
                        </p>
                        <p className="font-nunito font-medium text-sm text-[#bebebe] mt-1">
                          {" "}
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </p>
                      </div>
                    </div>
                  ) : (
                    item.whoreceiverid == data.groupId && (
                      <div className="mt-5 flex justify-end">
                        <div>
                          <p className="font-nunito font-medium text-xl text-[#bebebe]  inline-block  rounded-xl">
                            {item.whosendername}
                          </p>
                          <br />
                          <p className="bg-primary text-white p-4 font-nunito font-semibold text-md rounded-xl inline-block">
                            <picture>
                              <img className="w-52 h-52" src={item.img} />
                            </picture>
                          </p>
                          <p className="font-nunito font-semibold text-sm opacity-60 mt-1">
                            {moment(item.date, "YYYYMMDD, h:mm").fromNow()}
                          </p>
                        </div>
                      </div>
                    )
                  )
                ) : item.whoreceiverid == data.groupId && item.msg ? (
                  <div className="mt-5">
                    <p className="font-nunito font-medium text-xl text-[#bebebe]  inline-block  rounded-xl">
                      {item.whosendername}
                    </p>
                    <br />
                    <p className="font-nunito font-medium text-xl bg-[#F1F1F1] inline-block p-3.5 rounded-xl">
                      {item.msg}
                    </p>
                    <p className="font-nunito font-medium text-sm text-[#bebebe] mt-1">
                      {" "}
                      {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                    </p>
                  </div>
                ) : (
                  item.whoreceiverid == data.groupId && (
                    <div className="mt-5 ">
                      <p className="font-nunito font-medium text-xl text-[#bebebe]  inline-block  rounded-xl">
                        {item.whosendername}
                      </p>
                      <br />
                      <p className="bg-[#F1F1F1] p-4 font-nunito font-semibold text-md rounded-xl  inline-block">
                        <img className="w-52 h-52" src={item.img} />
                      </p>
                      <p className="font-nunito font-semibold text-sm opacity-60 mt-1">
                        {moment(item.date, "YYYYMMDD, h:mm").fromNow()}
                      </p>
                    </div>
                  )
                )
              )
          : searchSinglemsglistlist == ""
          ? singlemsglist.map((item) =>
              item.whosenderid == auth.currentUser.uid ? (
                item.msg ? (
                  <div className="mt-5 flex justify-end">
                    <div>
                      <p className="bg-primary text-white p-4 font-nunito font-semibold text-md rounded-xl inline-block">
                        {item.msg}
                      </p>
                      <p className="font-nunito font-semibold text-sm opacity-60 mt-1">
                        {moment(item.date, "YYYYMMDD, h:mm").fromNow()}
                      </p>
                    </div>
                  </div>
                ) : item.audio ? (
                  <div className="mt-5 flex justify-end">
                    <div>
                      <p className="font-nunito font-medium text-xl text-[#bebebe]  inline-block  rounded-xl">
                        {item.whosendername}
                      </p>
                      <br />
                      <p className="font-nunito font-medium text-xl text-white bg-primary inline-block p-3.5 rounded-xl">
                        <audio
                          className="text-red"
                          controls
                          src={item.audio}
                        ></audio>
                      </p>

                      <p className="font-nunito font-medium text-sm text-[#bebebe] mt-1">
                        {" "}
                        {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 flex justify-end">
                    <div>
                      <p className="bg-primary text-white p-4 font-nunito font-semibold text-md rounded-xl inline-block">
                        <picture>
                          <img className="w-52 h-52" src={item.img} />
                        </picture>
                      </p>
                      <p className="font-nunito font-semibold text-sm opacity-60 mt-1">
                        {moment(item.date, "YYYYMMDD, h:mm").fromNow()}
                      </p>
                    </div>
                  </div>
                )
              ) : item.msg ? (
                <div className="mt-5">
                  <p className="bg-[#F1F1F1] p-4 font-nunito font-semibold text-md rounded-xl  inline-block">
                    {item.msg}
                  </p>
                  <p className="font-nunito font-semibold text-sm opacity-60 mt-1">
                    {moment(item.date, "YYYYMMDD, h:mm").fromNow()}
                  </p>
                </div>
              ) : item.audio ? (
                <div className="mt-5">
                  <p className="font-nunito font-medium text-xl text-[#bebebe]  inline-block  rounded-xl">
                    {item.whosendername}
                  </p>
                  <br />
                  <audio className="text-red" controls src={item.audio}></audio>
                  <p className="font-nunito font-medium text-sm text-[#bebebe] mt-1">
                    {" "}
                    {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                  </p>
                </div>
              ) : (
                <div className="mt-5 ">
                  <p className="bg-[#F1F1F1] p-4 font-nunito font-semibold text-md rounded-xl  inline-block">
                    <img className="w-52 h-52" src={item.img} />
                  </p>
                  <p className="font-nunito font-semibold text-sm opacity-60 mt-1">
                    {moment(item.date, "YYYYMMDD, h:mm").fromNow()}
                  </p>
                </div>
              )
            )
          : searchSinglemsglistlist.map((item) =>
              item.whosenderid == auth.currentUser.uid ? (
                item.msg ? (
                  <div className="mt-5 flex justify-end">
                    <div>
                      <p className="bg-primary text-white p-4 font-nunito font-semibold text-md rounded-xl inline-block">
                        {item.msg}
                      </p>
                      <p className="font-nunito font-semibold text-sm opacity-60 mt-1">
                        {moment(item.date, "YYYYMMDD, h:mm").fromNow()}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 flex justify-end">
                    <div>
                      <p className="bg-primary text-white p-4 font-nunito font-semibold text-md rounded-xl inline-block">
                        <picture>
                          <img className="w-52 h-52" src={item.img} />
                        </picture>
                      </p>
                      <p className="font-nunito font-semibold text-sm opacity-60 mt-1">
                        {moment(item.date, "YYYYMMDD, h:mm").fromNow()}
                      </p>
                    </div>
                  </div>
                )
              ) : item.msg ? (
                <div className="mt-5">
                  <p className="bg-[#F1F1F1] p-4 font-nunito font-semibold text-md rounded-xl  inline-block">
                    {item.msg}
                  </p>
                  <p className="font-nunito font-semibold text-sm opacity-60 mt-1">
                    {moment(item.date, "YYYYMMDD, h:mm").fromNow()}
                  </p>
                </div>
              ) : (
                <div className="mt-5 ">
                  <p className="bg-[#F1F1F1] p-4 font-nunito font-semibold text-md rounded-xl  inline-block">
                    <img className="w-52 h-52" src={item.img} />
                  </p>
                  <p className="font-nunito font-semibold text-sm opacity-60 mt-1">
                    {moment(item.date, "YYYYMMDD, h:mm").fromNow()}
                  </p>
                </div>
              )
            )}
      </div>

      {audio && (
        <>
          <audio controls src={audio}></audio>
          <button
            onClick={handleAudioUpload}
            className="bg-primary ml-2.5	 text-white font-nunito font-bold text-lg rounded p-2"
          >
            Send
          </button>

          <button
            onClick={() => setAudio(false)}
            className="bg-primary ml-2.5	 text-white font-nunito font-bold text-lg rounded p-2"
          >
            Remove
          </button>
        </>
      )}
      <div className="relative">
        <input
          onChange={handleMsg}
          className="bg-[#F1F1F1] w-[80%] px-4 rounded py-3 mt-5"
          type="text"
          placeholder="Your Message"
          value={msg}
        />
        <div className="absolute top-[24px] right-[300px]">
          <AudioRecorder
            onRecordingComplete={(blob) => addAudioElement(blob)}
            recorderControls={recorderControls}
          />
        </div>
        <button
          onClick={handleMsgSend}
          className="bg-primary ml-2.5	 text-white font-nunito font-bold text-lg rounded p-2"
        >
          Send
        </button>
        <button
          onClick={() => setShow(true)}
          className="bg-primary ml-2.5	 text-white font-nunito font-bold text-lg rounded p-2"
        >
          Attachment
        </button>
        <button
          onClick={() => setEmmoji(!emmoji)}
          className="absolute top-[25px] right-[250px] text-3xl text-primary ml-2.5	 text-white font-nunito font-bold text-lg rounded p-1"
        >
          <BsFillEmojiSmileFill />
        </button>

        <div className="absolute top-[-430px] right-[255px]">
          {emmoji && (
            <>
              <EmojiPicker onEmojiClick={(a) => setMsg(msg + a.emoji)} />
              <IoMdClose
                onClick={() => setEmmoji(false)}
                className="absolute top-0 right-0 text-2xl opacity-70"
              />
            </>
          )}
        </div>
      </div>
      {show && (
        <div className="h-screen w-full bg-[rgba(0,0,0,.6)] absolute top-0 left-0 z-30 flex justify-center items-center ">
          <div className="bg-white p-4 rounded">
            <h1 className="font-nunito font-bold text-2xl mb-4">
              Select Image For Upload{" "}
            </h1>
            <input type="file" onChange={handleSingleImageUpload} />
            <br />

            <h1>{progress}</h1>

            <button
              onClick={handleImageUpload}
              className="bg-primary text-white font-nunito font-bold text-lg rounded p-1 mt-4"
            >
              Upload
            </button>
            <button
              onClick={() => setShow(false)}
              className="bg-red-500 text-white font-nunito font-bold text-lg rounded p-1 mt-4 ml-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
