import { useEffect, useState } from "react";
import { UseAdminAuthFirebase } from "../../context/superAdminAuth";
import "./AdminProfile.css";
import avator from "../../assets/avator.jpg";

import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { FaCloudUploadAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { resizeImage } from "../../utils/ResizeImage";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const AdminProfile = () => {
  const navigate = useNavigate();
  const firebase = UseAdminAuthFirebase();
  const [open, setOpen] = useState(false);
  const [adminData, setAdminData] = useState(null);

  const [userName, setUserName] = useState("");
  const [updateImageData, setUpdateImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser =
          (await firebase?.users) || JSON.parse(localStorage.getItem("admin"));
        if (currentUser) {
          setAdminData(currentUser);
        } else {
          console.log("User not authenticated yet");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [firebase.users, firebase.forceUpdate]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    let resizedImage;
    try {
      if (updateImageData) {
        resizedImage = await resizeImage(updateImageData, 280, 280);
      } else {
        // Handle the case when no image is selected
        console.log("No image selected");
      }
      const result = await firebase.updateProfileData(
        userName,
        resizedImage,
        adminData?.photoURL,
        adminData?.uid
      );
      console.log(result);
      setLoading(false);
      setOpen(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert("Try Again!");
    }
  };

  return (
    <>
      <div className="profleContainer">
        <div className="profileContent">
          <div
            className="bgimage"
            style={{
              backgroundImage: adminData?.photoURL
                ? `url(${adminData.photoURL})`
                : `url(${avator})`,
              backgroundSize: "cover", // Add this line for proper image sizing
            }}
          ></div>
          <p>
            {adminData?.displayName ? adminData.displayName : "অ্যাডমিন ভাইয়া"}
          </p>
          <button onClick={handleClickOpen} className="updateProfile">
            update
          </button>
        </div>
      </div>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <form className="inpForm" onSubmit={updateProfile}>
            <input
              accept="image/*"
              onChange={(e) => setUpdateImageData(e.target.files[0])}
              style={{ display: "none" }}
              type="file"
              id="image"
            />
            <div className="adminImageShow">
              {updateImageData ? (
                <>
                  <IoClose
                    onClick={() => setUpdateImageData(null)}
                    className="crosUpdateImage"
                  />
                  <img
                    className="showUpdateImage"
                    src={URL.createObjectURL(updateImageData)}
                    alt=""
                  />
                </>
              ) : (
                <label htmlFor="image">
                  <FaCloudUploadAlt />
                </label>
              )}
            </div>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="admin name"
            />
            <br />
            <button type="submit">
              {loading ? (
                <Box sx={{ width: "10px", margin: "0 auto" }}>
                  <CircularProgress size={23} color="inherit" />
                </Box>
              ) : (
                "submit"
              )}
            </button>
          </form>
        </DialogTitle>
      </BootstrapDialog>
    </>
  );
};

export default AdminProfile;
