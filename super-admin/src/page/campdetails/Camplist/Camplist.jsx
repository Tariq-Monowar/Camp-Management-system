import "./camplist.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import { IoClose } from "react-icons/io5";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { SiMicrosoftexcel } from "react-icons/si";
import { FaFilePdf } from "react-icons/fa6";

import { useReactToPrint } from "react-to-print";
import { DownloadTableExcel } from "react-export-table-to-excel";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { UseCampFirebase } from "../../../context/CampManagement";

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

const Camplist = () => {
  const campFirebase = UseCampFirebase();
  const navigate = useNavigate();
  const [campData, setCampData] = useState([]);
  const [forceByUpdate, setForceByUpdate] = useState("");
  const [open, setOpen] = useState(false);

  const [campName, setCampName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [place, setPlace] = useState("");
  const [campId, setCampId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [liadingTrue, setLiadingTrue] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [dataLoaded, setDataLoaded] = useState(false);

  //Cobvert To bangla
  function convertDateToBangla(inputDate) {
    const banglaMonths = [
      'জানুয়ারি',
      'ফেব্রুয়ারি',
      'মার্চ',
      'এপ্রিল',
      'মে',
      'জুন',
      'জুলাই',
      'আগস্ট',
      'সেপ্টেম্বর',
      'অক্টোবর',
      'নভেম্বর',
      'ডিসেম্বর'
    ];
  
    const parts = inputDate.split('-');
    const year = parts[0];
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);
  
    const banglaDay = convertToBanglaNumber(day);
    const banglaYear = convertToBanglaNumber(year);
    const banglaMonth = banglaMonths[month - 1];
  
    return `${banglaDay} ${banglaMonth} ${banglaYear}`;
  }
  
  function convertToBanglaNumber(number) {
    const banglaNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  
    return number
      .toString()
      .split('')
      .map((digit) => banglaNumbers[parseInt(digit, 10)])
      .join('');
  }

  // if(campFirebase.camp_WithDeleget){
  //   setLiadingTrue(true);
  // }

  useEffect(() => {
    const getAllData = async () => {
 
      try {
        setLiadingTrue(true);
        const data = await campFirebase.camp_WithDeleget;
        setCampData(data);
        setDataLoaded(true);
        // setLiadingTrue(false)
        if(campFirebase.camp_WithDeleget.length !== 0){
          setLiadingTrue(false);
        }
        if(!data){
          window.location.reload()
        }
      } catch (error) {
       
        console.error("Error fetching regiments:", error.message);
      }
    };
    getAllData();
  }, [campFirebase, forceByUpdate]);


  const deleteCamp = async (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this Camp"
    );
    if (userConfirmed) {
      try {
        const data = await campFirebase.deleteCamp(id);
        campFirebase.setForceUcamp(!campFirebase.forceUcamp)
        console.log(data);
      } catch (error) {
        console.error("Error deleting regiment:", error);
      }
    } else {
      console.log("Deletion canceled by user");
    }
  };
  // update camp
  const forUpdateUamp = (e) => {
    console.log(e);
    setOpen(true);
    setCampName(e.campName);
    setStartDate(e.startDate);
    setEndDate(e.endDate);
    setPlace(e.place);
    setCampId(e.id);
  };

  const updateCamp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await campFirebase.campUpdate(
        campId,
        campName,
        startDate,
        endDate,
        place
      );
      console.log(result);
      if (result) {
        setLoading(false);
        setForceByUpdate(!forceByUpdate);
        campFirebase.setForceUcamp(!campFirebase.forceUcamp)
        setOpen(false);
      }
      setForceByUpdate(!forceByUpdate);
    } catch (error) {
      alert("আভডেট করার সময় একটি ত্রুটি হয়েছে!");
      setLoading(false);
    }
  };

  // excl
  const tableRef = useRef(null);

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
          margin-top: -190px;
        }
        .regimentTitle{
          padding-top: 30px;
          padding-bottom: 13px;
        }
        .campedate{
          font-size: 24px;
        }
        @page {
          margin-top: 60px;
          margin-bottom: 60px;
          content: "";
          margin-left: 45px;
          margin-right: 45px
        }
      `;
      printableContent.appendChild(printStyles);

      return printableContent;
    },
    documentTitle: "ক্যাম্প তালিকা",

    onAfterPrint: () => console.log("Success"),
  });

  const seeDetalseInfo = (info) => {
    campFirebase.setInfoDetalse(info);
    navigate("/infoUpdateAndCreate");
  };

  const detalseCamp = (id, name) => {
    localStorage.setItem("currentCampId", id);
    localStorage.setItem("navheader", name)
    navigate("/entranceCampDetalse");
  };
  return (
    <>
      <div ref={componentRef} className="homePageContainer">
        <div className="regimentLest">
          <h1 className="regimentTitle campTalika">ক্যাম্প তালিকা</h1>
          <div className="downloadeShoit">
            <FaFilePdf className="pdfDownloade" onClick={handlePrint} />
            <DownloadTableExcel
              filename="শাখা নির্ধারণ"
              sheet="users"
              currentTableRef={tableRef.current}
            >
              <SiMicrosoftexcel className="excelDownloade" />
            </DownloadTableExcel>
          </div>
          <table ref={tableRef} className="regimentTable">
            <tr>
              <th>ক্রম</th>
              <th>ক্যাম্পের নাম</th>
              <th>স্থান</th>
              <th>তারিখ</th>
              <th>ডেলিগেট</th>
              <th>তথ্য</th>
              <th>অ্যাকশন</th>
            </tr>

            {campData &&
              campData.map((camp, index) => {
                let totalDelegateCountForCamp = 0;
                return (
                  <HtmlTooltip
                    key={camp.id}
                    title={
                      <>
                        <div>
                          {camp.createByName && (
                            <p>Created By: {camp.createByName}</p>
                          )}
                          {camp?.lastUpdateBy && (
                            <p>Last Update By: {camp.lastUpdateBy}</p>
                          )}
                        </div>
                        <button
                          onClick={() => seeDetalseInfo(camp)}
                          className="detalseInfoo"
                        >
                          Details
                        </button>
                      </>
                    }
                  >
                    <tr>
                      <td className="listNumber">{index + 1}</td>
                      <td className="campName">{camp.campName}</td>
                      <td className="campePleace">{camp.place}</td>
                      <td className="campedate">
                        {convertDateToBangla(camp.startDate)} থেকে {convertDateToBangla(camp.endDate)}
                      </td>
                      {camp.branches &&
                        camp.branches.forEach((branch) => {
                          totalDelegateCountForCamp += Number(
                            branch.delegateDarjo
                          );
                        })}
                      <td className="totalDeligate">
                        {totalDelegateCountForCamp}
                      </td>
                      <td className="campInfo">
                        <span
                          onClick={() => detalseCamp(camp.id, camp.campName)}
                          className="detalseInfo"
                        >
                          বিস্তারিত তথ্য
                        </span>
                      </td>
                      <td className="actionud">
                        <BsPencilSquare
                          className="updateBtn"
                          onClick={() => forUpdateUamp(camp)}
                        />{" "}
                        <MdDelete
                          className="deleteBtn"
                          onClick={() => deleteCamp(camp.id)}
                        />
                      </td>
                    </tr>
                  </HtmlTooltip>
                );
              })}
          </table>
          {liadingTrue && (
            <div style={{marginTop: '30px'}} className="animation-hr">
              <hr className="hr1" />
              <hr className="hr2" />
              <hr className="hr3" />
              <hr className="hr4" />
            </div>
           )} 

          {/* <div className="regCreateBrnList">
            <button onClick={handleClickOpen} className="regimentBtn">
              রেজিমেন্ট নির্ধারণ করুন
            </button>
            <button
              onClick={() => navigate("/branchDetermination")}
              className="regimentBtn margintop"
            >
              পরবর্তী
            </button>
          </div> */}
        </div>
      </div>

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
            ক্যাম্প আপডেট করুন
            <IoClose className="closeIcon" onClick={handleClose} />
          </DialogTitle>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <form onSubmit={updateCamp} className="regCreateForm">
              <div className="regimentNameDev">
                <span>ক্যাম্পের নাম</span>
                <input
                  onChange={(e) => setCampName(e.target.value)}
                  value={campName}
                  type="text"
                  placeholder="ক্যাম্পের নাম"
                />
              </div>
              <div className="regmentPlaceDev">
                <span>স্থান</span>
                <input
                  onChange={(e) => setPlace(e.target.value)}
                  value={place}
                  type="text"
                  placeholder="স্থান"
                />
              </div>

              <div className="regmentPlaceDev">
                <span>ক্যাম্প শুরুর তারিখ</span>
                <input
                  onChange={(e) => setStartDate(e.target.value)}
                  value={startDate}
                  type="date"
                  placeholder="তারিখ"
                />
              </div>

              <div className="regmentPlaceDev">
                <span>ক্যাম্প শেষের তারিখ</span>
                <input
                  onChange={(e) => setEndDate(e.target.value)}
                  value={endDate}
                  type="date"
                  placeholder="তারিখ"
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
    </>
  );
};

export default Camplist;
