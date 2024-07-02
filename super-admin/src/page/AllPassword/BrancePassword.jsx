
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { IoClose } from "react-icons/io5";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import branchNames from "../../data/Brance";
import { SiMicrosoftexcel } from "react-icons/si";
import { FaFilePdf } from "react-icons/fa6";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import { useReactToPrint } from "react-to-print";
// import { DownloadTableExcel } from "react-export-table-to-excel";

import { UseCampFirebase } from "../../context/CampManagement";
import { downloadTableExcels } from "../../utils/ResizeImage";

// Styled Components
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

const DownloadTableExcel = ({ filename, sheet, currentTableRef, children }) => {
  const handleDownload = () => {
    downloadTableExcels(filename, sheet, currentTableRef);
  };

  return <div onClick={handleDownload}>{children}</div>;
};

// Functional Component
const BrancePassword = () => {
  // Component State and Variables
  const campFirebase = UseCampFirebase();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [forceByUpdate, setForceByUpdate] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [branceCode, setBranceCode] = useState("");
  const [delegateDarjo, setDelegateDarjo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [branceData, setBranceData] = useState([]);
  const [updateOrCreate, setUpdateOrCreate] = useState(true);

  const [branceCollectionId, setBranceCollectionId] = useState("");
  const [selectedUpdateBrance, setSelectedUpdateBrance] = useState("");
  const [updateBranceCode, setUpdateBranceCode] = useState("");
  const [updateDelegateDarjo, setupdateDelegateDarjo] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");

  useEffect(() => {
    campFirebase.setForceUBrinces(!campFirebase.forceUBrinces)
   }, [])

  // Event Handlers
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addBrance = (e) => {
    setUpdateOrCreate(true);
    setOpen(true);
  };

  const updatedBrance = (e) => {
    setUpdateOrCreate(false);
    setOpen(true);
    setSelectedUpdateBrance(e.branceName);
    setUpdateBranceCode(e.branceCode);
    setupdateDelegateDarjo(e.delegateDarjo);
    setBranceCollectionId(e.id);
    setUpdatePassword(e.password)
  };

  const handleBranchChange = (e) => {
    const selectedBranchName = e.target.value;
    setSelectedBranch(selectedBranchName);

    const selectedBranchObj = branchNames.find(
      (branch) => branch.branchName === selectedBranchName
    );

    if (selectedBranchObj) {
      setBranceCode(selectedBranchObj.branchCode);
    }
  };

  const handleUpdateBranchChange = (e) => {
    const selectedBranchName = e.target.value;
    setSelectedUpdateBrance(selectedBranchName);

    const selectedBranchObj = branchNames.find(
      (branch) => branch.branchName === selectedBranchName
    );

    if (selectedBranchObj) {
      setUpdateBranceCode(selectedBranchObj.branchCode);
    }
  };

  // Branch Determination Logic
  const branchDetermin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await campFirebase.selectBrance(
        selectedBranch,
        branceCode,
        delegateDarjo,
        password
      );
      if (result) {
        setLoading(false);
        setForceByUpdate(!forceByUpdate);
        handleClose();
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAllData = async () => {
      try {
        const data = await campFirebase.all_Brances;
        setBranceData(data);
      } catch (error) {
        console.error("Error fetching regiments:", error.message);
      }
    };

    getAllData();
  }, [campFirebase, forceByUpdate]);

  // Delete Branch Logic
  const deletBrance = async (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this Brance?"
    );
    if (userConfirmed) {
      try {
        const data = await campFirebase.deleteBrance(id);
        setForceByUpdate(!forceByUpdate);
      } catch (error) {
        console.error("Error deleting regiment:", error);
      }
    } else {
      console.log("Deletion canceled by user");
    }
  };

  // Update Branch Logic
  const updatesBrance = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await campFirebase.updateBrance(
        branceCollectionId,
        selectedUpdateBrance,
        updateBranceCode,
        updateDelegateDarjo,
        updatePassword
      );
      
      if (result) {
        setLoading(false);
        setForceByUpdate(!forceByUpdate);
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
          margin-top: -170px;
         
        }
        .regimentTitle{
          padding-top: 30px;
          padding-bottom: 13px;
        }
        @page {
          margin-top: 60px;
          margin-bottom: 60px;
          margin-left: 50px;
          margin-right: 50px;
          content: "";
        }
      `;
      printableContent.appendChild(printStyles);

      return printableContent;
    },
    documentTitle: "শাখা পাসওয়ার্ড",

    onAfterPrint: () => console.log("Success"),
  });

  const seeDetalseInfo = (info) => {
    campFirebase.setInfoDetalse(info);
    navigate("/infoUpdateAndCreate");
  };
  // JSX for Rendering
  return (
    <>
      <div ref={componentRef} className="homePageContainer">
        <div className="regimentLest">
          <h1 className="regimentTitle">শাখা পাসওয়ার্ড</h1>
          <div className="downloadeShoit">
            <FaFilePdf className="pdfDownloade" onClick={handlePrint} />

            <DownloadTableExcel
              filename="শাখা নির্ধারণ"
              sheet="users"
              currentTableRef={tableRef}
            >
              <SiMicrosoftexcel className="excelDownloade" />
            </DownloadTableExcel>
          </div>

          <table ref={tableRef} className="regimentTable">
            <tr>
              <th>ক্রম</th>
              <th>শাখার নাম</th>
              <th>শাখার কোড</th>
              <th>ক্যাম্প</th>
              <th>শাখার পাসওয়ার্ড</th>
              <th>অ্যাকশন</th>
            </tr>
            {branceData.map((brance, index) => (
              <HtmlTooltip
                key={brance.id}
                title={
                  <>
                    <div>
                      {brance.createByName && (
                        <p>Created By: {brance.createByName}</p>
                      )}
                      {brance?.lastUpdateBy && (
                        <p>Last Update By: {brance.lastUpdateBy}</p>
                      )}
                    </div>
                    <button
                      onClick={() => seeDetalseInfo(brance)}
                      className="detalseInfoo"
                    >
                      Details
                    </button>
                  </>
                }
              >
                <tr>
                  <td className="listNumber">{index + 1}</td>
                  <td className="branceName">{brance.branceName}</td>
                  <td className="branceCode">{brance.branceCode}</td>
                  <td>{localStorage.getItem("navheader")}</td>
                  <td className="Delegatefee" style={{fontFamily: "normal", fontSize: "22px"}}>{brance.password}</td>

                  <td className="actionud">
                    <BsPencilSquare
                      className="updateBtn"
                      onClick={() => updatedBrance(brance)}
                    />
                    <MdDelete
                      className="deleteBtn"
                      onClick={() => deletBrance(brance.id)}
                    />
                  </td>
                </tr>
              </HtmlTooltip>
            ))}
          </table>
          <div className="regCreateBrnList">
            {/* <button onClick={addBrance} className="regimentBtn">
              শাখা যুক্ত করুন
            </button> */}
            {/* <button
              onClick={() => navigate("/")}
              className="regimentBtn margintop"
            >
              পরবর্তী
            </button> */}
          </div>
        </div>
      </div>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        {updateOrCreate ? (
          <>
            <DialogTitle
              sx={{ marginLeft: "-6px", p: 2 }}
              id="customized-dialog-title"
            >
              শাখা নির্ধারণ
              <IoClose
                className="closeIcon"
                style={{ marginRight: "-10px" }}
                onClick={handleClose}
              />
            </DialogTitle>
            <form className="addBrance" onSubmit={branchDetermin}>
              <select
                onChange={handleBranchChange}
                className="barnaceDeterminOption"
                defaultValue=""
                required
              >
                <option value="" disabled hidden>
                  শাখা নির্ধারণ করুন
                </option>
                {branchNames
                  .filter(
                    (branch) =>
                      !branceData.some(
                        (data) => data.branceName === branch.branchName
                      )
                  )
                  .map((brance) => (
                    <option key={brance.branchCode} value={brance.branchName}>
                      {brance.branchName}
                    </option>
                  ))}
              </select>

              <input
                className="CreateDarjo"
                onChange={(e) => setDelegateDarjo(e.target.value)}
                value={delegateDarjo}
                type="number"
                placeholder="ডেলিগেট ধার্য্য"
              />

              <input
                style={{ fontFamily: "normal", fontSize: "20px" }}
                className="CreateDarjo"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="text"
                placeholder="শাখা পাসওয়ার্ড"
              />

              <button
                style={{ marginTop: "17px" }}
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
            </form>
          </>
        ) : (
          <>
            <DialogTitle
              sx={{ marginLeft: "-6px", p: 2 }}
              id="customized-dialog-title"
            >
              শাখা আপডেট
              <IoClose
                className="closeIcon"
                style={{ marginRight: "-10px" }}
                onClick={handleClose}
              />
            </DialogTitle>
            <form className="addBrance" onSubmit={updatesBrance}>
              <select
                onChange={handleUpdateBranchChange}
                className="barnaceDeterminOption"
                defaultValue={selectedUpdateBrance}
              >
                <option value="" disabled hidden>
                  শাখা আপডেট করুন
                </option>
                {branchNames
                  // .filter(
                  //   (branch) => branch.branchName !== selectedUpdateBrance
                  // )
                  .map((brance) => (
                    <option key={brance.branchCode} value={brance.branchName}>
                      {brance.branchName}
                    </option>
                  ))}
              </select>

              <input
                className="CreateDarjo"
                onChange={(e) => setupdateDelegateDarjo(e.target.value)}
                value={updateDelegateDarjo}
                type="number"
                placeholder="ডেলিগেট ধার্য্য"
              />

              <input
                style={{ fontFamily: "normal", fontSize: "20px" }}
                className="CreateDarjo"
                onChange={(e) => setUpdatePassword(e.target.value)}
                value={updatePassword}
                type="text"
                placeholder="শাখা পাসওয়ার্ড"
              />

              <button
                style={{ marginTop: "17px" }}
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
            </form>
          </>
        )}
      </BootstrapDialog>
    </>
  );
};

export default BrancePassword;
