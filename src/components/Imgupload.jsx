import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getAuth, updateProfile } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { RotatingLines } from "react-loader-spinner";
import { useSelector } from "react-redux";

const Imgupload = () => {
  let data2 = useSelector((state) => state.darkmood.value2);
  const navigate = useNavigate();
  const auth = getAuth();
  let [img, setImg] = useState("");
  let [imgname, setImgname] = useState("");
  let [viewimg, setViewimg] = useState("");
  const [cropper, setCropper] = useState();
  const [loader, setLoader] = useState(false);

  let handleChange = (e) => {
    setImgname(e.target.files[0].name);

    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImg(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const cropperRef = useRef(null);
  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setViewimg(cropper.getCroppedCanvas().toDataURL());
  };

  let handleUpload = () => {
    setLoader(true);
    const storage = getStorage();
    const storageRef = ref(storage, imgname);
    console.log(viewimg);
    if (typeof cropper !== "undefined") {
      // setCropData(cropper.getCroppedCanvas().toDataURL());
      const message4 = cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log("File available at", downloadURL);
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          })
            .then(() => {
              setLoader(false);
              navigate("/");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      });
    }
  };

  return (
    <div className="w-full h-screen sm:h-[404px] md:h-screen bg-primary flex justify-center items-center pb-5">
      <div className="w-auto bg-white text-center p-5 sm:p-6 md:p-5 xl:p-10 rounded-lg mt-5">
        <h1 className="font-nunito text-[48px] sm:text-[35px] md:text-[48px] lg:text-[48px] xl:text-[55px] font-bold text-primary ">
          Upload Image
        </h1>

        <div className="mt-5 sm:mt-2 md:mt-5 w-full">
          {viewimg ? (
            <img
              src={viewimg}
              className="w-[60px] xl:w-[100px] xl:h-[100px] rounded-[50%]  mb-8 sm:mb-6 md:mb-6 xl:mb-10 ml-4 xl:ml-32"
            />
          ) : (
            <img
              src={auth.currentUser && auth.currentUser.photoURL}
              className="w-[80px] xl:w-[100px] xl:h-[100px] rounded-[50%]  mb-8 sm:mb-6 md:mb-6 xl:mb-10 ml-4 xl:ml-32"
            />
          )}

          <input
            className={
              data2
                ? "sm:w-[230px] md:w-[310px] xl:w-[350px] border border-solid border-purpal rounded-lg px-2 xl:px-8 py-2 xl:py-5 border-opacity-30 text-black outline-0 "
                : "sm:w-[230px] md:w-[310px] xl:w-[350px] border border-solid border-purpal rounded-lg px-2 xl:px-8 py-2 xl:py-5 border-opacity-30 text-black outline-0 "
            }
            type="file"
            onChange={handleChange}
          />
        </div>

        {img && (
          <Cropper
            src={img}
            style={{
              height: 300,
              width: "50%",
              marginTop: 20,
            }}
            // Cropper.js options
            initialAspectRatio={16 / 9}
            guides={false}
            crop={onCrop}
            ref={cropperRef}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
          />
        )}

        <div className="flex xl:justify-between">
          {loader ? (
            <div className="mt-2 xl:mt-12 ml-5 xl:ml-36">
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
            </div>
          ) : (
            <>
              <button
                className="xl:w-44 xl:h-auto bg-primary xl:p-6 p-2 rounded-lg mt-8 sm:mt-6 md:mt-8  xl:ml-0"
                onClick={handleUpload}
              >
                <p className="font-nunito font-semibold text-white text-xl sm:text-base md:text-xl">
                  Upload
                </p>
              </button>

              <button className="xl:w-40 h-auto bg-amber-600 p-2 xl:p-6 rounded-lg mt-8 md:mt-8 sm:mt-6 ml-4 xl:ml-0">
                <p className="font-nunito font-semibold text-white text-xl sm:text-base md:text-xl">
                  <Link to="/" className="text-white font-bold ">
                    {" "}
                    Cancel
                  </Link>
                </p>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Imgupload;
