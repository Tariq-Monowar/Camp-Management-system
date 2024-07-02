import "./createRegiment.css";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useRef, useState } from "react";

import { IoClose } from "react-icons/io5";

import { SiMicrosoftexcel } from "react-icons/si";
import { FaFilePdf } from "react-icons/fa6";
import { UseCampFirebase } from "../../../context/CampManagement";

import { useReactToPrint } from "react-to-print";
import { DownloadTableExcel } from "react-export-table-to-excel";

// Tooltip
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const CreateRegiment = () => {
  const navigate = useNavigate();
  const campFirebase = UseCampFirebase();
  const [open, setOpen] = useState(false);

  const [regimentName, setRegimentName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [regimentId, setRegimentId] = useState("")
  const [regimentPassword, setRegimentPassword] = useState("")
  const [loading, setLoading] = useState(false);
  const [errro, setErrro] = useState(null);

  const [forceByUpdate, setForceByUpdate] = useState(false);

  const [regimentData, setRegimentData] = useState([]);

  const [updateImageData, setUpdateImageData] = useState(true);
  const [createData, setCreateData] = useState(false);
  const [updateRegName, setUpdateRegName] = useState("");
  const [updateRegRoomNumber, setUpdateRegRoomNumber] = useState("");
  const [updateRegId, setUpdateRegId] = useState("")
  const [updateUserPassword, setUpdateUserPassword] = useState("")
  const [selectedRegiment, setSelectedRegiment] = useState(null);
  const updateRegData = async (reg) => {
    setOpen(true);
    setCreateData(false);
    setUpdateImageData(true);
    setUpdateRegName(reg.regimentName);
    setUpdateRegRoomNumber(reg.roomNumber);
    setUpdateRegId(reg.regimentId);
    setUpdateUserPassword(reg.regimentPassword)
    setSelectedRegiment(reg);
  };

  const updateRegement = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await campFirebase.updateRegiment(
        selectedRegiment.id,
        updateRegName,
        updateRegRoomNumber,
        updateRegId,
        updateUserPassword
      );
      // console.log(result)
      if (result) {
        setLoading(false);
        setForceByUpdate(!forceByUpdate);
        setOpen(false);
      }
    } catch (error) {
      alert("আভডেট করার সময় একটি ত্রুটি হয়েছে!");
      setLoading(false);
    }
  };

  const handleClickOpenCreate = () => {
    setOpen(true);
    setCreateData(true);
    setUpdateImageData(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resetForm = () => {
    setRegimentName("")
    setRoomNumber("")
    setRegimentId("")
    setRegimentPassword("")
  }

  const submitRegiment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await campFirebase.createRegiment(
        regimentName,
        roomNumber,
        regimentId,
        regimentPassword
      );
      if (result) {
        setLoading(false);
        setForceByUpdate(!forceByUpdate);
        resetForm()
        handleClose();
      }
      console.log(result);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAllData = async () => {
      try {
        const data = await campFirebase.getRegiments();
        setRegimentData(data);
      } catch (error) {
        console.error("Error fetching regiments:", error.message);
      }
    };

    getAllData();
  }, [campFirebase, forceByUpdate]); // Add the dependency array if needed

  console.log(regimentData);

  const deletRegiment = async (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this regiment?"
    );
    if (userConfirmed) {
      try {
        const data = await campFirebase.deleteRegiment(id);
        setForceByUpdate(!forceByUpdate);
        console.log(data);
      } catch (error) {
        console.error("Error deleting regiment:", error);
      }
    } else {
      console.log("Deletion canceled by user");
    }
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => {
      const printableContent = componentRef.current.cloneNode(true);

      // Exclude the element with className "downloadeShoit" from the printed content
      const elementsToExclude =
        printableContent.querySelectorAll(".downloadeShoit");
      elementsToExclude.forEach((element) => element.remove());

      // Exclude the element with className "regCreateBrnList" from the printed content
      const regCreateBrnList =
        printableContent.querySelector(".regCreateBrnList");
      regCreateBrnList && regCreateBrnList.remove();

      // Add custom styles to the printed content, including styles for homePageContainer
      const printStyles = document.createElement("style");
      printStyles.innerHTML = `
          .homePageContainer {
            margin-top: -100px;
            transform: scale(1.2);
          }
          .regimentTitle{
             padding-top: 30px;
             padding-bottom: 13px;
          }
        `;
      printableContent.appendChild(printStyles);

      return printableContent;
    },
    documentTitle: "Title",
    onAfterPrint: () => console.log("Success"),
  });

  const tableRef = useRef(null);

  const seeDetalseInfo = (info)=>{
    campFirebase.setInfoDetalse(info)
    navigate('/infoUpdateAndCreate')

  }

  return (
    <>
      <nav className="regNavBar">
        <h1>ক্যাম্প ম্যনেজমেন্ট সিস্টেম</h1>

        {/* <button className="createRegBtn" onClick={handleClickOpen}>
          রেজিমেন্ট নির্ধারণ করুন
        </button> */}
      </nav>
      <div ref={componentRef} className="homePageContainer">
        <div className="regimentLest">
          <h1 className="regimentTitle">রেজিমেন্ট নির্ধারণ</h1>
          <div className="downloadeShoit">
            <FaFilePdf className="pdfDownloade" onClick={handlePrint} />
            <DownloadTableExcel
              filename="রেজিমেন্ট নির্ধারণ"
              sheet="users"
              currentTableRef={tableRef.current}
            >
              <SiMicrosoftexcel className="excelDownloade" />
            </DownloadTableExcel>
          </div>
          <table ref={tableRef} className="regimentTable">
            <tr>
              <th>ক্রম</th>
              <th>নাম</th>
              <th>স্থান/রুম নং</th>
              <th>অ্যাকশন</th>
            </tr>
            {regimentData &&
              regimentData?.map((reg, index) => (
                <HtmlTooltip
                  key={reg.id}
                  title={
                    <>
                      {/* <Typography color="inherit">Info</Typography> */}
                      <div>
                        {reg.createByName && (
                          <p>Created By: {reg.createByName}</p>
                        )}
                        {reg?.lastUpdateBy&& (
                          <p>Last Update By: {reg.lastUpdateBy}</p>
                        )}

                        {/* <p>Last Updated By: Seam</p> */}
                      </div>
                      <button onClick={()=>seeDetalseInfo(reg)} className="detalseInfoo">Details</button>
                    </>
                  }
                >
                  <tr>
                    <td className="listNumber">{index + 1}</td>
                    <td className="regName">{reg.regimentName}</td>
                    <td className="roomNumber">{reg.roomNumber}</td>
                    <td className="actionud">
                      <BsPencilSquare
                        className="updateBtn"
                        onClick={() => updateRegData(reg)}
                      />{" "}
                      <MdDelete
                        className="deleteBtn"
                        onClick={() => deletRegiment(reg.id)}
                      />
                    </td>
                  </tr>
                </HtmlTooltip>
              ))}

            {/* <tr>
              <td className="listNumber">01</td>
              <td className="regName">বীরশ্রেষ্ঠ মতিউর রহমান রেজিমেন্ট</td>
              <td className="roomNumber">104</td>
              <td className="actionud">
                <BsPencilSquare className="updateBtn" />{" "}
                <MdDelete className="deleteBtn" />
              </td>
            </tr>*/}
          </table>
          <div className="regCreateBrnList">
            <button onClick={handleClickOpenCreate} className="regimentBtn">
              রেজিমেন্ট নির্ধারণ করুন
            </button>
            <button
              onClick={() => navigate("/branchDetermination")}
              className="regimentBtn margintop"
            >
              পরবর্তী
            </button>
          </div>
        </div>
        {createData && (
        <>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle
              sx={{
                paddingLeft: "20px",
                marginBottom: "-20px",
                fontWeight: "bold",
                marginTop: "6px",
              }}
              id="customized-dialog-title"
            >
              রেজিমেন্ট তৈরি করুন
              <IoClose className="closeIcon" onClick={handleClose} />
            </DialogTitle>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              <form onSubmit={submitRegiment} className="regCreateForm">
                <div className="regimentNameDev">
                  <span>রেজিমেন্ট এর নাম</span>
                  <input
                    onChange={(e) => setRegimentName(e.target.value)}
                    value={regimentName}
                    type="text"
                    placeholder="রেজিমেন্ট"
                    required
                  />
                </div>
                <div className="regmentPlaceDev">
                  <span>স্থান/রুম নং</span>
                  <input
                    onChange={(e) => setRoomNumber(e.target.value)}
                    value={roomNumber}
                    type="text"
                    placeholder="স্থান/রুম নং"
                    required
                  />
                </div>
                <div className="regmentPlaceDev">
                  <span>রেজিমেন্ট আইডি</span>
                  <input
                    onChange={(e) => setRegimentId(e.target.value)}
                    value={regimentId}
                    type="text"
                    placeholder="রেজিমেন্ট আইডি"
                    required
                  />
                </div>
                <div className="regmentPlaceDev">
                  <span>রেজিমেন্ট পাসওয়ার্ড</span>
                  <input
                    onChange={(e) => setRegimentPassword(e.target.value)}
                    value={regimentPassword}
                    type="text"
                    placeholder="রেজিমেন্ট পাসওয়ার্ড"
                    required
                  />
                </div>

                <button className="submitReg" type="submit">
                  {loading ? (
                    <Box sx={{ marginTop: "5px" }}>
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
      )}
      {updateImageData && (
        <>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle
              sx={{
                paddingLeft: "20px",
                marginBottom: "-20px",
                fontWeight: "bold",
                marginTop: "7px",
              }}
              id="customized-dialog-title"
            >
              রেজিমেন্ট আপডেট করুন
              <IoClose className="closeIcon" onClick={handleClose} />
            </DialogTitle>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              <form onSubmit={updateRegement} className="regCreateForm">
                <div className="regimentNameDev">
                  <span>রেজিমেন্ট এর নাম</span>
                  <input
                    onChange={(e) => setUpdateRegName(e.target.value)}
                    value={updateRegName}
                    type="text"
                    placeholder="রেজিমেন্ট"
                    required
                  />
                </div>
                <div className="regmentPlaceDev">
                  <span>স্থান/রুম নং</span>
                  <input
                    onChange={(e) => setUpdateRegRoomNumber(e.target.value)}
                    value={updateRegRoomNumber}
                    type="text"
                    placeholder="স্থান/রুম নং"
                    required
                  />
                </div>
                <div className="regmentPlaceDev">
                  <span>রেজিমেন্ট আইডি</span>
                  <input
                    onChange={(e) => setUpdateRegId(e.target.value)}
                    value={updateRegId}
                    type="text"
                    placeholder="রেজিমেন্ট আইডি"
                    required
                  />
                </div>
                <div className="regmentPlaceDev">
                  <span>রেজিমেন্ট পাসওয়ার্ড</span>
                  <input
                    onChange={(e) => setUpdateUserPassword(e.target.value)}
                    value={updateUserPassword}
                    type="text"
                    placeholder="রেজিমেন্ট পাসওয়ার্ড"
                    required
                  />
                </div>

                <button className="submitReg" type="submit">
                  {loading ? (
                    <Box sx={{ marginTop: "5px" }}>
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
      )}
      </div>


    </>
  );
};

export default CreateRegiment;
