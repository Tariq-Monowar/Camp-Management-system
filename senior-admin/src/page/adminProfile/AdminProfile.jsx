import React, { useEffect, useState } from "react";
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
import { UseCampFirebase } from "../../context/CampManagement";

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
  const firebase = JSON.parse(localStorage.getItem("authtoken"));

  const campFirebase = UseCampFirebase();
  const [open, setOpen] = useState(false);
  const [adminData, setAdminData] = useState(null);

  const [updateImageData, setUpdateImageData] = useState(null);
  const [mobile, setMobile] = useState(firebase.mobile || ""); // Initialize with mobile value from firebase

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(firebase)
    try {
      let resizedImage = null;
      if (updateImageData) {
        resizedImage = await resizeImage(updateImageData, 280, 280);
      }
      const result = await campFirebase.updateSeniorAdmin(
        firebase.id,
        mobile, 
        resizedImage,
        firebase.image
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


  useEffect(() => {
    const getAllData = async () => {
      const authToken = JSON.parse(localStorage.getItem("authtoken"));
      try {
        const data = await campFirebase.getAllSeniorAdmin();
        if (data) {
          const matchingAdmin = data.find(
            (admin) =>
              admin.userName === authToken.userName &&
              admin.password === authToken.password
          );
          if (matchingAdmin) {
            console.log("Success..");
            localStorage.setItem("authtoken", JSON.stringify(matchingAdmin))
          } else {
            console.log("No matching admin found.");
            localStorage.removeItem("authtoken");
            navigate("/");
            window.location.reload()
          }
        }
      } catch (error) {
        console.error("Error fetching senior admins:", error.message);
      }
    };
    getAllData();
  }, [open]);


  return (
    <>
      <div className="profleContainer">
        <div className="profileContent">
          <div
            className="bgimage"
            style={{
              backgroundImage: firebase.image
                ? `url(${firebase.image})`
                : `url(${avator})`,
              backgroundSize: "cover", // Add this line for proper image sizing
            }}
          ></div>
          <p>{firebase.userName ? firebase.userName : "অ্যাডমিন ভাইয়া"}</p>
          <p style={{ marginTop: "15px", marginBottom: "-5px" }}>
            {firebase.mobile ? firebase.mobile : "0199........."}
          </p>
          <button className="updateProfile" onClick={handleClickOpen}>
            Update Profile
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
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              type="text"
              placeholder="Mobile Number"
            />
            <br />
            <button type="submit">
              {loading ? (
                <Box sx={{ width: "10px", margin: "0 auto" }}>
                  <CircularProgress size={23} color="inherit" />
                </Box>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </DialogTitle>
      </BootstrapDialog>
    </>
  );
};

export default AdminProfile;
