import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getAuth } from "firebase/auth";

const Imgupload = () => {
  const auth = getAuth();
  let [img, setImg] = useState("");
  let [viewimg, setViewimg] = useState("");

  let handleChange = (e) => {
    console.log(e.target.files[0]);

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

  return (
    <div className="w-full h-screen bg-primary flex justify-center items-center">
      <div className="w-auto bg-white text-center p-10 rounded-lg">
        <h1 className="font-nunito text-[55px] font-bold text-primary">
          Upload Image
        </h1>

        <div className="mt-5 w-full">
          {viewimg ? (
            <img
              src={viewimg}
              className="w-[60px] xl:w-[100px] xl:h-[100px] rounded-[50%]  mb-5 ml-32"
            />
          ) : (
            <img
              src={auth.currentUser.photoURL}
              className="w-[60px] xl:w-[100px] xl:h-[100px] rounded-[50%]  mb-5 ml-32"
            />
          )}

          <input
            className="border border-solid border-purpal rounded-lg px-8 py-5 border-opacity-30  outline-0 "
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
          />
        )}

        <div className="flex justify-between">
          <button className="w-44 h-auto bg-primary p-6 rounded-lg mt-12">
            <p className="font-nunito font-semibold text-white text-xl">
              Upload Image
            </p>
          </button>

          <button className="w-40 h-auto bg-amber-600	 p-6 rounded-lg mt-12">
            <p className="font-nunito font-semibold text-white text-xl">
              <Link to="/" className="text-white font-bold ">
                {" "}
                Cancel
              </Link>
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Imgupload;
