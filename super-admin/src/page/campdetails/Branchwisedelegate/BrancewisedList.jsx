import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import { useReactToPrint } from "react-to-print";
import { DownloadTableExcel } from "react-export-table-to-excel";

import { SiMicrosoftexcel } from "react-icons/si";
import { FaFilePdf } from "react-icons/fa6";
import { UseCampFirebase } from "../../../context/CampManagement";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BrancewisedList = () => {
  const navigate = useNavigate();
  const campFirebase = UseCampFirebase();
  const [open, setOpen] = useState(false);
  const [forceByUpdate, setForceByUpdate] = useState(false);
  const [allDelegate, setAllDelegate] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getAllData = async () => {
      try {
        const data = await campFirebase.deleget_Data;
        if (data && data.length > 0) {
          const filteredData = data.filter(
            (item) => item.isHedeleget === "true"
          );
          setAllDelegate(filteredData);
        }
      } catch (error) {
        console.error("Error fetching regiments:", error.message);
      }
    };

    getAllData();
  }, [campFirebase, forceByUpdate]);

  // shooting this arrow of an object
  function groupBy(array, property) {
    return array.reduce((result, obj) => {
      const key = obj[property];
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(obj);
      return result;
    }, {});
  }
  const groupedObject = groupBy(allDelegate, "brance");
  // setRegimentWisedList( groupBy(allDelegate, "regiment"););

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

          transform: scale(.95);
        }
        .regimentTitle{
          margin-top: -5px;
          padding-bottom: 13px;
          page-break-before: always;
        }
        @page {
          size: auto; /* Use auto to fit the content to the page size */
          margin: 40px 30px 30px 20px; 
        }
      `;
      printableContent.appendChild(printStyles);

      return printableContent;
    },
    documentTitle: ".",

    onAfterPrint: () => console.log("Success"),
  });

  const seeDetalseInfo = (id) => {
    localStorage.setItem("goToDetalseInfo", id);
    navigate("/detalseDeligetInfo");
  };
  return (
    <>
      <div ref={componentRef} className="homePageContainer">
        <div className="regwlist regimentLest">
          <div style={{ paddingTop: "110px" }} className="downloadeShoit">
            <FaFilePdf className="pdfDownloade" onClick={handlePrint} />
            <DownloadTableExcel
              filename="রেজিমেন্ট ভিত্তিক ডেলিগেট তালিকা"
              sheet="রেজিমেন্ট ভিত্তিক ডেলিগেট তালিকা"
              currentTableRef={tableRef.current}
            >
              <SiMicrosoftexcel className="excelDownloade" />
            </DownloadTableExcel>
          </div>
          <div ref={tableRef}>
            {Object.keys(groupedObject).map((regiment, index) => {
              return (
                <div key={index}>
                  <h1 className="regWtitle regimentTitle">
                    {console.log(regiment)}
                    শাখা: {regiment}
                  </h1>
                  <table className="regimentTable">
                    <thead>
                      <tr>
                        <th>ক্রম</th>
                        <th>নাম</th>
                        <th>পিতার নাম</th>
                        <th>শ্রেণী</th>
                        <th>রেজিমেন্ট</th>
                        <th>ডেলিগেট কোড</th>
                        <th>তথ্য</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedObject[regiment].map(
                        (delegate, delegateIndex) => (
                          <tr key={delegateIndex}>
                            <td className="listNumber">{delegateIndex + 1}</td>
                            <td className="deligateName">
                              {delegate.fullNameBangla}
                            </td>
                            <td className="fathersName">
                              {delegate.fatherNameBangla}
                            </td>
                            <td className="classname">{delegate.classValue}</td>
                            <td className="branceName">{delegate.regiment}</td>
                            <td className="deligateCode">
                              44.24.
                              {String(delegate.delegatId).padStart(4, "0")}
                            </td>
                            <td>
                              <span
                                onClick={() => seeDetalseInfo(delegate.id)}
                                style={{ fontWeight: "normal" }}
                                className="detalseInfo"
                              >
                                বিস্তারিত তথ্য
                              </span>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Update Profile
        </DialogTitle>
      </BootstrapDialog>
    </>
  );
};

export default BrancewisedList;
