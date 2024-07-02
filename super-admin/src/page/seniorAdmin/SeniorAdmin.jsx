import "./seniorAdmin.css";
import { useState, useEffect } from "react";
import useClipboard from "react-use-clipboard";
import { UseCampFirebase } from "../../context/CampManagement";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import { FaCloudUploadAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaCopy } from "react-icons/fa";
import { RiQuillPenFill } from "react-icons/ri";
import { MdDeleteSweep } from "react-icons/md";
import { FaEyeSlash, FaPassport } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import { resizeImage } from "../../utils/ResizeImage";
import { useNavigate } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const SeniorAdmin = () => {
  const campFirebase = UseCampFirebase();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [createSeniorAdmin, setCreateSeniorAdmin] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [forceByUpdate, setForceByUpdate] = useState(false);
  const [adminSelectImage, setAdminSelectImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const [getAllSeniorAdmin, setGetAllSeniorAdmin] = useState([]);

  const [updateAdminSelectImage, setUpdateAdminSelectImage] = useState(null);
  const [uadminId, setUadminId] = useState("");
  const [uuserName, setUuserName] = useState("");
  const [upassword, setUpassword] = useState("");
  const [umobile, setUmobile] = useState("");
  const [uprevImage, setUPrevImage] = useState("");

  // const copyData = (userData) => {
  //   const textToCopy = `Username: ${userData.userName}\nPassword: ${userData.password}\nMobile: ${userData.mobile}`;
  //   setCopied(textToCopy);
  // };
  const setDataFotCopy = (data) => {
    console.log(data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  ///get
  useEffect(() => {
    const getAllData = async () => {
      try {
        const data = await campFirebase.getAllSeniorAdmin();
        if (data && data.length > 0) {
          setGetAllSeniorAdmin(data);
          localStorage.setItem("seniorAdmin", JSON.stringify(data))
        }
      } catch (error) {
        console.error("Error fetching regiments:", error.message);
      }
    };
    
    const senadmindata = JSON.parse(localStorage.getItem("seniorAdmin"))
    if(senadmindata && senadmindata.length > 0){
      setGetAllSeniorAdmin(senadmindata)
    }
    getAllData();
  }, [campFirebase, forceByUpdate]);
  console.log(getAllSeniorAdmin);

  const resetForm = () => {
    setUserName("");
    setPassword("");
    setMobile("");
    setAdminSelectImage(null);
  };
  const createAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    let resizedImage;
    if (adminSelectImage) {
      resizedImage = await resizeImage(adminSelectImage, 280, 280);
    } else {
      // Handle the case when no image is selected
      console.log("No image selected");
    }
    try {
      const result = await campFirebase.createSeniorAdmin(
        userName,
        password,
        mobile,
        resizedImage
      );
      if (result) {
        console.log(result);
        console.log("Success...");
        resetForm();
        setForceByUpdate(!forceByUpdate);
        // setCreateSeniorAdmin(false)
        setLoading(false);
      }
    } catch (error) {
      alert("ত্রুটি হয়েছে!");
      setLoading(false);
    }
  };

  //update
  const resetUpdateForm = () => {
    setUpdateAdminSelectImage("");
    setUuserName("");
    setUpassword("");
    setUmobile("");
  };
  const closePopPup = () => {
    setOpen(false);
    resetUpdateForm();
  };

  const radyForUpdate = (e) => {
    setUadminId(e.id);
    setUuserName(e.userName);
    setUpassword(e.password);
    setUmobile(e.mobile);
    setUPrevImage(e.image);
    setUadminId(e.id);
    setOpen(true);
  };

  const updateRegement = async (e) => {
    e.preventDefault();
    let resizedImages;
    if (updateAdminSelectImage) {
      resizedImages = await resizeImage(updateAdminSelectImage, 280, 280);
    } else {
      // Handle the case when no image is selected
      console.log("No image selected");
    }
    try {
      setLoading(true);
      const result = await campFirebase.updateSeniorAdmin(
        uadminId,
        uuserName,
        upassword,
        umobile,
        resizedImages,
        uprevImage
      );
      console.log(result);
      if (result) {
        setLoading(false);
        setForceByUpdate(!forceByUpdate);
        resetUpdateForm();
        setOpen(false);
      }
    } catch (error) {
      alert("আভডেট করার সময় একটি ত্রুটি হয়েছে!");
      setLoading(false);
    }
  };

  const deleteAdmin = async (id, prevImg) => {
    console.log(id, prevImg);
    const userConfirmed = window.confirm(
      "আপনি এই সিনিয়র এডমিন কে ডিলিট করতে চান?"
    );
    try {
      if (userConfirmed) {
        const result = await campFirebase.deleteSeniorAdmin(id, prevImg);
        if (result) {
          setForceByUpdate(!forceByUpdate);
          console.log("Success....");
        }
      }
    } catch (error) {
      alert("ডিলিট করার সময় ত্রুটি হয়েছে!");
    }
  };

  const seeDetalseInfo = (info) => {
    campFirebase.setInfoDetalse(info);
    navigate("/infoUpdateAndCreate");
  };

  const senAdminData = (data) => {
    campFirebase.setSenAdminData(data);
    navigate("/detalseSinAdminData");
  };

  return (
    <>
      <div className="seniorAdminContainner">
        {!createSeniorAdmin && (
          <button
            onClick={() => {
              setCreateSeniorAdmin(!createSeniorAdmin);
            }}
            type="submit"
            className="seniorAdminCbtn"
          >
            সিনিয়র এডমিন নির্ধারণ করুন
          </button>
        )}

        {/* <h1>সিনিয়র এডমিন</h1> */}
        {createSeniorAdmin && (
          <form onSubmit={createAdmin} className="seniorAdminCreatore">
            <input
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              type="text"
              placeholder="user name"
              required
            />
            <div className="seniorAdminPassword">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? "text" : "password"}
                placeholder="password"
                required
              />
              <div className="showHideIcons">
                {showPassword ? (
                  <FaEyeSlash onClick={(_) => setshowPassword(!showPassword)} />
                ) : (
                  <IoEyeSharp onClick={(_) => setshowPassword(!showPassword)} />
                )}
              </div>
            </div>
            <input
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
              type="text"
              placeholder="mobile number"
            />
            <div className="SeniorAdminimage">
              <input
                onChange={(e) => setAdminSelectImage(e.target.files[0])}
                style={{ display: "none" }}
                accept="image/*"
                type="file"
                name=""
                id="Adminimage"
              />
              {adminSelectImage ? (
                <div className="seletedImage">
                  <IoClose
                    style={{ fontSize: "23px", marginBottom: "-23px" }}
                    onClick={() => setAdminSelectImage(null)}
                    className="crosUpdateImage"
                  />
                  <img src={URL.createObjectURL(adminSelectImage)} alt="" />
                </div>
              ) : (
                <label className="SeniorAdIcon" htmlFor="Adminimage">
                  <FaCloudUploadAlt />
                </label>
              )}
            </div>
            <button type="submit" className="seniorAdminCbtn">
              {loading ? (
                <Box>
                  <CircularProgress size={23} color="inherit" />
                </Box>
              ) : (
                " সিনিয়র এডমিন নির্ধারণ করুন"
              )}
            </button>
          </form>
        )}
        <div className="senAdminBody">
          {getAllSeniorAdmin &&
            getAllSeniorAdmin.map((data) => {
              return (
                <HtmlTooltip
                  key={data.id}
                  title={
                    <>
                      <div>
                        {data.createByName && (
                          <p>Created By: {data.createByName}</p>
                        )}
                        {data?.lastUpdateBy && (
                          <p>Last Update By: {data.lastUpdateBy}</p>
                        )}
                      </div>
                      <button
                        onClick={() => seeDetalseInfo(data)}
                        className="detalseInfoo"
                      >
                        Details
                      </button>
                    </>
                  }
                >
                  <div className="seniuarAdminCard">
                    {data.image && (
                      <div
                        style={{ backgroundImage: `url(${data.image})` }}
                        className="senAdImage"
                      >
                        {" "}
                      </div>
                    )}

                    <p className="adminData">@ {data.userName}</p>
                    <p style={{ marginTop: "5px" }} className="adminData">
                      {data.mobile}
                    </p>
                    {/* <p className="adminData">{data.password}</p> */}
                    <div className="footer">
                      <FaCopy
                        onClick={() => {
                          senAdminData(data);
                        }}
                        className="copyIcon"
                      />
                      <RiQuillPenFill
                        className="updateIcon"
                        onClick={() => radyForUpdate(data)}
                      />
                      <MdDeleteSweep
                        className="deleteIcon"
                        onClick={() => deleteAdmin(data.id, data.image)}
                      />
                    </div>
                  </div>
                </HtmlTooltip>
              );
            })}
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle
              sx={{
                paddingLeft: "20px",
                marginBottom: "-25px",
                fontWeight: "bold",
                marginTop: "7px",
              }}
              id="customized-dialog-title"
            >
              আপডেট করুন
              <IoClose className="closeIcon" onClick={closePopPup} />
            </DialogTitle>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              <form onSubmit={updateRegement} className="regCreateForm">
                <div className="regimentNameDev">
                  <span>সিনিয়র এডমিন এর নাম</span>
                  <input
                    onChange={(e) => setUuserName(e.target.value)}
                    value={uuserName}
                    type="text"
                    placeholder="@username"
                  />
                </div>
                <div className="regmentPlaceDev">
                  <span>পাসরয়ার্ড</span>
                  <input
                    onChange={(e) => setUpassword(e.target.value)}
                    value={upassword}
                    type="text"
                    placeholder="password"
                  />
                </div>

                <div className="regmentPlaceDev">
                  <span>মোবাইল নাম্বার</span>
                  <input
                    onChange={(e) => setUmobile(e.target.value)}
                    value={umobile}
                    type="text"
                    placeholder="mobile number"
                  />
                </div>

                <div
                  style={{ textAlign: "center" }}
                  className="SeniorAdminimage"
                >
                  <input
                    onChange={(e) =>
                      setUpdateAdminSelectImage(e.target.files[0])
                    }
                    style={{ display: "none" }}
                    accept="image/*"
                    type="file"
                    name=""
                    id="Adminimage"
                  />
                  {updateAdminSelectImage ? (
                    <div
                      style={{ marginBottom: "15px", marginTop: "20px" }}
                      className="seletedImage"
                    >
                      <IoClose
                        style={{ fontSize: "23px", marginBottom: "-23px" }}
                        onClick={() => setUpdateAdminSelectImage(null)}
                        className="crosUpdateImage"
                      />
                      <img
                        src={URL.createObjectURL(updateAdminSelectImage)}
                        alt=""
                      />
                    </div>
                  ) : (
                    <label className="SeniorAdIcon" htmlFor="Adminimage">
                      <FaCloudUploadAlt />
                    </label>
                  )}
                </div>
                <div style={{ width: "100%", textAlign: "center" }}>
                  <button
                    style={{
                      marginTop: "10px",
                      margin: "0 auto",
                      width: "200px",
                    }}
                    className="submitReg"
                    type="submit"
                  >
                    {loading ? (
                      <Box sx={{ marginTop: "5px" }}>
                        <CircularProgress size={23} color="inherit" />
                      </Box>
                    ) : (
                      "submit"
                    )}
                  </button>
                </div>
              </form>
            </DialogTitle>
          </BootstrapDialog>
        </div>
      </div>
    </>
  );
};

export default SeniorAdmin;
