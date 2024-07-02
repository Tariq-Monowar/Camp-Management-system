import "./Brancelist.css";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState } from "react";

import { IoClose } from "react-icons/io5";
import { SiMicrosoftexcel } from "react-icons/si";
import { FaFilePdf } from "react-icons/fa6";
import branchNames from "../../../data/Brance";
import { downloadTableExcels } from "../../../utils/ResizeImage";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DownloadTableExcel = ({ filename, sheet, currentTableRef, children }) => {
  const handleDownload = () => {
    downloadTableExcels(filename, sheet, currentTableRef);
  };

  return <div onClick={handleDownload}>{children}</div>;
};

const BranceList = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [branceCode, setBranceCode] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const branchDetermin = (e) => {
    e.preventDefault();
    console.log("Selected Branch:", selectedBranch);
    console.log("Selected Branch Code:", branceCode);
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
           margin-left: 35px;
           margin-right: 35px;
           content: "";
         }
       `;
       printableContent.appendChild(printStyles);
 
       return printableContent;
     },
     documentTitle: "অংশগ্রহণ কৃত ডেলিগেট সংখ্যা",
 
     onAfterPrint: () => console.log("Success"),
   });

  return (
    <>
      <div ref={componentRef} className="homePageContainer">
        <div className="regimentLest">
          <h1 className="regimentTitle">শাখা তালিকা</h1>
          <div className="downloadeShoit">
            <FaFilePdf className="pdfDownloade" onClick={handlePrint} />
            <DownloadTableExcel
              filename="শাখাতালিকা তালিকা"
              sheet="শাখাতালিকা তালিকা"
              currentTableRef={tableRef}
            >
            <SiMicrosoftexcel className="excelDownloade" />
            </DownloadTableExcel>
          </div>
          <table ref={tableRef} className="regimentTable">
            <thead>
              <tr>
                <th>ক্রম</th>
                <th>শাখার নাম</th>
                <th>কোড</th>
              </tr>
            </thead>
            <tbody>
              {branchNames.map((data, i) => {
                return (
                  <tr>
                    <td className="listNumber">{i+1}</td>
                    <td className="regName">{data.branchName}</td>
                    <td className="roomNumber">{data.branchCode}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{marginTop: "30px"}} className="regCreateBrnList">
            {/* <button onClick={handleClickOpen} className="regimentBtn">
              শাখা যুক্ত করুন
            </button> */}
            <button
              onClick={() => navigate("/")}
              className="regimentBtn margintop"
            >
              ফিরে জান
            </button>
          </div>
        </div>
      </div>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
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
            {branchNames.map((brance) => (
              <option key={brance.branchCode} value={brance.branchName}>
                {brance.branchName}
              </option>
            ))}
          </select>

          <button
            style={{ marginTop: "17px" }}
            className="submitReg"
            type="submit"
          >
            {/* {loading && (
              <Box sx={{ marginTop: "5px" }}>
                <CircularProgress size={23} color="inherit" />
              </Box>
            )} */}
            submit
          </button>
        </form>
      </BootstrapDialog>
    </>
  );
};

export default BranceList;
