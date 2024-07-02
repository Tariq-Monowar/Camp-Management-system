// import { useEffect, useRef } from "react";
// import { UseCampFirebase } from "../../../context/CampManagement";
// import "./DelegateAnalysis.css";
// import { styled } from "@mui/material/styles";
// import Chart from "react-apexcharts";
// import { useState } from "react";
// import { IoAnalyticsSharp } from "react-icons/io5";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useReactToPrint } from "react-to-print";
// import { SiMicrosoftexcel } from "react-icons/si";
// import { FaFilePdf } from "react-icons/fa6";

// // Tooltip
// import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
// import { downloadTableExcels } from "../../../utils/ResizeImage";

// const DownloadTableExcel = ({ filename, sheet, currentTableRef, children }) => {
//   const handleDownload = () => {
//     downloadTableExcels(filename, sheet, currentTableRef);
//   };

//   return <div onClick={handleDownload}>{children}</div>;
// };

// const DelegateAnalysis = () => {
//   const campFirebase = UseCampFirebase();
//   const naviget = useNavigate();
//   const [allDeligate, setAllDeligate] = useState([]);

//   const componentRef = useRef();
//   const handlePrint = useReactToPrint({
//     content: () => {
//       const printableContent = componentRef.current.cloneNode(true);

//       // Exclude the element with className "downloadeShoit" from the printed content
//       const elementsToExclude =
//         printableContent.querySelectorAll(".downloadeShoit");
//       elementsToExclude.forEach((element) => element.remove());

//       // Exclude the element with className "regCreateBrnList" from the printed content
//       const regCreateBrnList =
//         printableContent.querySelector(".regCreateBrnList");
//       regCreateBrnList && regCreateBrnList.remove();

//       // Add custom styles to the printed content, including styles for homePageContainer
//       const printStyles = document.createElement("style");
//       printStyles.innerHTML = `
//           .homePageContainer {
//             margin-top: -70px;

//           }
//           .regimentTitle{
//              padding-top: 10px;
//              padding-bottom: 13px;
//           }
//           @page{
//             margin: 5px 40px 20px 40px;
//           }
//         `;
//       printableContent.appendChild(printStyles);

//       return printableContent;
//     },
//     documentTitle: "Title",
//     onAfterPrint: () => console.log("Success"),
//   });

//   const tableRef = useRef(null);

//   const seeDetalseInfo = (info) => {
//     campFirebase.setInfoDetalse(info);
//     navigate("/infoUpdateAndCreate");
//   };

//   const screenWidth = window.screen.width;

//   useEffect(() => {
//     const getAllData = async () => {
//       try {
//         const data = await campFirebase.getAllDelegate();

//         // Filter the array to keep only objects where isHedeleget is "true"
//         const filteredData = data.filter((item) => item.isHedeleget === "true");
//         setAllDeligate(filteredData);
//       } catch (error) {
//         console.error("Error fetching regiments:", error.message);
//       }
//     };

//     getAllData();
//   }, [campFirebase]);
//   console.log(allDeligate);

//   const chocos = allDeligate?.filter(
//     (deleget) => deleget.organizationalvalues === "চৌকস"
//   );
//   const ogrophotikh = allDeligate?.filter(
//     (deleget) => deleget.organizationalvalues === "অগ্রপথিক"
//   );

//   const suvasito = allDeligate?.filter(
//     (deleget) => deleget.senOrganizationalvalues === "সুবাসিত"
//   );
//   const bikosito = allDeligate?.filter(
//     (deleget) => deleget.senOrganizationalvalues === "বিকশিত"
//   );
//   const dhiman = allDeligate?.filter(
//     (deleget) => deleget.senOrganizationalvalues === "ধীমান"
//   );
//   const ovijathri = allDeligate?.filter(
//     (deleget) => deleget.senOrganizationalvalues === "অভিযাত্রী"
//   );

//   const dhiman_ogrophotikh = allDeligate?.filter(
//     (deleget) =>
//       deleget.senOrganizationalvalues === "ধীমান" &&
//       deleget.organizationalvalues === "অগ্রপথিক"
//   );
//   const ovijathri_ogrophotikh = allDeligate?.filter(
//     (deleget) =>
//       deleget.senOrganizationalvalues === "অভিযাত্রী" &&
//       deleget.organizationalvalues === "অগ্রপথিক"
//   );

//   const _noCamp = allDeligate?.filter(
//     (deleget) => deleget.previousCampNumber === "০টি"
//   );
//   const _1camp = allDeligate?.filter(
//     (deleget) => deleget.previousCampNumber === "১টি"
//   );
//   const _2camp = allDeligate?.filter(
//     (deleget) => deleget.previousCampNumber === "২টি"
//   );
//   const _3camp = allDeligate?.filter(
//     (deleget) => deleget.previousCampNumber === "৩টি"
//   );
//   const _4camp = allDeligate?.filter(
//     (deleget) => deleget.previousCampNumber === "৪টি"
//   );
//   const _4plusCamp = allDeligate?.filter(
//     (deleget) =>
//       deleget.previousCampNumber === "৫টি" ||
//       deleget.previousCampNumber === "৬টি"
//   );

//   // console.log(_4plusCamp)

//   // console.log(_noCamp)

//   console.log(chocos);

//   return (
//     <div className="analysisContainner">
//       <h1 className="titleAnalisis">অংশগ্রহণকারীদের তথ্য</h1>

//       <div className="downloadeShoit">
//         <FaFilePdf className="pdfDownloade" onClick={handlePrint} />

//         <DownloadTableExcel
//           filename="রেজিমেন্টের তথ্য"
//           sheet="রেজিমেন্টের তথ্য"
//           currentTableRef={tableRef}
//         >
//           <SiMicrosoftexcel className="excelDownloade" />
//         </DownloadTableExcel>
//       </div>

//       <div className="textAnalyais">
//         <NavLink to={"/alldetalselest"}>
//           <div>
//             <span className="analysisTitle">অংশগ্রহণ কৃত ডেলিগেট সংখ্যাঃ </span>
//             <span className="analysisDescs">{allDeligate.length}জন</span>
//           </div>
//         </NavLink>

//         <NavLink to={"/delegateAnalysis/অংশগ্রহণ কৃত চৌকস সংখ্যাঃ"}>
//           <div
// onClick={() => {
//   campFirebase.setAnalysisData(chocos);
// }}
//           >
//             <span className="analysisTitle">চৌকসঃ </span>
//             <span className="analysisDescs">{chocos.length}জন</span>
//           </div>
//         </NavLink>

//         <NavLink to={"/delegateAnalysis/অংশগ্রহণ কৃত অগ্রপথিক সংখ্যাঃ"}>
//           <div
// onClick={() => {
//   campFirebase.setAnalysisData(ogrophotikh);
// }}
//           >
//             <span className="analysisTitle">অগ্রপথিকঃ </span>
//             <span className="analysisDescs">{ogrophotikh.length}জন</span>
//           </div>
//         </NavLink>

//         <NavLink to={"/delegateAnalysis/অংশগ্রহণ কৃত সুবাসিত সংখ্যাঃ"}>
//           <div
// onClick={() => {
//   campFirebase.setAnalysisData(suvasito);
// }}
//           >
//             <span className="analysisTitle">সুবাসিতঃ </span>
//             <span className="analysisDescs">{suvasito.length}জন</span>
//           </div>
//         </NavLink>
//         <NavLink to={"/delegateAnalysis/অংশগ্রহণ কৃত বিকশিত সংখ্যাঃ"}>
//           <div
// onClick={() => {
//   campFirebase.setAnalysisData(bikosito);
// }}
//           >
//             <span className="analysisTitle">বিকশিতঃ </span>
//             <span className="analysisDescs">{bikosito.length}জন</span>
//           </div>
//         </NavLink>
//         <NavLink to={"/delegateAnalysis/অংশগ্রহণ কৃত ধীমান সংখ্যাঃ"}>
//           <div
// onClick={() => {
//   campFirebase.setAnalysisData(dhiman);
// }}
//           >
//             <span className="analysisTitle">ধীমানঃ </span>
//             <span className="analysisDescs">{dhiman.length}জন</span>
//           </div>
//         </NavLink>
//         <NavLink to={"/delegateAnalysis/অংশগ্রহণ কৃত অভিযাত্রী সংখ্যাঃ"}>
//           <div
// onClick={() => {
//   campFirebase.setAnalysisData(ovijathri);
// }}
//           >
//             <span className="analysisTitle">অভিযাত্রীঃ </span>
//             <span className="analysisDescs">{ovijathri.length}জন</span>
//           </div>
//         </NavLink>
//         <NavLink to={"/delegateAnalysis/অংশগ্রহণ কৃত ধীমান ও অগ্রপথিক সংখ্যাঃ"}>
//           <div
// onClick={() => {
//   campFirebase.setAnalysisData(dhiman_ogrophotikh);
// }}
//           >
//             <span className="analysisTitle">ধীমান/অগ্রপথিকঃ </span>
//             <span className="analysisDescs">{dhiman_ogrophotikh.length}জন</span>
//           </div>
//         </NavLink>

// <NavLink
//   to={"/delegateAnalysis/অংশগ্রহণ কৃত অভিযাত্রী ও অগ্রপথিক সংখ্যাঃ"}
// >
//           <div
// onClick={() => {
//   campFirebase.setAnalysisData(ovijathri_ogrophotikh);
// }}
//           >
//             <span className="analysisTitle">অভিযাত্রী/অগ্রপথিকঃ</span>
//             <span className="analysisDescs">
//               {ovijathri_ogrophotikh.length}জন
//             </span>
//           </div>
//         </NavLink>

// <NavLink
//   to={"/delegateAnalysis/পূর্বে ক্যাম্প করেনি এমন ডেলিগেট সংখ্যাঃ"}
// >
//           <div
// onClick={() => {
//   campFirebase.setAnalysisData(_noCamp);
// }}
//           >
//             <span className="analysisTitle">ক্যাম্প করেনিঃ </span>
//             <span className="analysisDescs">{_noCamp.length}জন</span>
//           </div>
//         </NavLink>

// <NavLink
//   to={"/delegateAnalysis/পূর্বে ক্যাম্প করেনি এমন ডেলিগেট সংখ্যাঃ"}
// >
//           <div
//             onClick={() => {
//               campFirebase.setAnalysisData(_1camp);
//             }}
//           >
//             <span className="analysisTitle">একটি ক্যাম্প করেছেঃ </span>
//             <span className="analysisDescs">{_1camp.length}জন</span>
//           </div>
//         </NavLink>

// <NavLink
//   to={
//     "/delegateAnalysis/পূর্বে দুইটি ক্যাম্প করেছে এমন ডেলিগেট সংখ্যাঃ"
//   }
// >
//           <div
// onClick={() => {
//   campFirebase.setAnalysisData(_2camp);
// }}
//           >
//             <span className="analysisTitle">দুইটি ক্যাম্প করেছেঃ </span>
//             <span className="analysisDescs">{_2camp.length}জন</span>
//           </div>
//         </NavLink>

// <NavLink
//   to={
//     "/delegateAnalysis/পূর্বে তিনটি ক্যাম্প করেছে এমন ডেলিগেট সংখ্যাঃ"
//   }
// >
//           <div
//             onClick={() => {
//               campFirebase.setAnalysisData(_3camp);
//             }}
//           >
//             <span className="analysisTitle">তিনটি ক্যাম্প করেছেঃ </span>
//             <span className="analysisDescs">{_3camp.length}জন</span>
//           </div>
//         </NavLink>

// <NavLink
//   to={
//     "/delegateAnalysis/পূর্বে চারটি ক্যাম্প করেছে এমন ডেলিগেট সংখ্যাঃ"
//   }
// >
//           <div
//             onClick={() => {
//               campFirebase.setAnalysisData(_4camp);
//             }}
//           >
//             <span className="analysisTitle">চারটি ক্যাম্প করেছেঃ </span>
//             <span className="analysisDescs">{_4camp.length}জন</span>
//           </div>
//         </NavLink>

// <NavLink
//   to={
//     "/delegateAnalysis/পূর্বে চারের অধিক ক্যাম্প করেছে এমন ডেলিগেট সংখ্যাঃ"
//   }
// >
//           <div
// onClick={() => {
//   campFirebase.setAnalysisData(_4plusCamp);
// }}
//           >
//             <span className="analysisTitle">চারের অধিক ক্যাম্প করেছেঃ </span>
//             <span className="analysisDescs">{_4plusCamp.length}জন</span>
//           </div>
//         </NavLink>
//       </div>
//       <NavLink to={"/delegateAnalysis/analysisChart"}>
//         <div className="divIoAnalyticsSharp">
//           <IoAnalyticsSharp className="IoAnalyticsSharp" />
//         </div>
//       </NavLink>
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <div className="regimentLest">
//       <table ref={tableRef} className="regimentTable">
//         {/* <thead>
//           <tr>
//             <th>Header</th>
//             <th>Content</th>
//           </tr>
//         </thead> */}
//         <tbody>
//           <tr>
//             <th>অংশগ্রহণ কৃত ডেলিগেট সংখ্যাঃ </th>
//             <td>{allDeligate.length}জন</td>
//             <td>বিস্তারিত</td>
//           </tr>
//           <tr>
//             <th>চৌকসঃ </th>
//             <td>{chocos.length}জন</td>
//             <td>বিস্তারিতো</td>
//           </tr>
//           <tr>
//             <th>অগ্রপথিকঃ </th>
//             <td>{ogrophotikh.length}জন</td>
//             <td>বিস্তারিতো</td>
//           </tr>
//           <tr>
//             <th>সুবাসিতঃ </th>
//             <td>{suvasito.length}জন</td>
//             <td>বিস্তারিতো</td>
//           </tr>
//           <tr>
//             <th>বিকশিতঃ </th>
//             <td>{bikosito.length}জন</td>
//             <td>বিস্তারিতো</td>
//           </tr>
//           <tr>
//             <th>ধীমানঃ </th>
//             <td>{dhiman.length}জন</td>
//             <td>বিস্তারিতো</td>
//           </tr>
//           <tr>
//             <th>অভিযাত্রীঃ </th>
//             <td>{ovijathri.length}জন</td>
//             <td>বিস্তারিতো</td>
//           </tr>
//           <tr>
//             <th>ধীমান/অগ্রপথিকঃ </th>
//             <td>{dhiman_ogrophotikh.length}জন</td>
//             <td>বিস্তারিতো</td>
//           </tr>
//           <tr>
//             <th>অভিযাত্রী/অগ্রপথিকঃ</th>
//             <td>{ovijathri_ogrophotikh.length}জন</td>
//             <td>বিস্তারিতো</td>
//           </tr>
//           <tr>
//             <th>ক্যাম্প করেনিঃ </th>
//             <td>{_noCamp.length}জন</td>
//             <td>বিস্তারিতো</td>
//           </tr>
//           <tr>
//             <th>একটি ক্যাম্প করেছেঃ </th>
//             <td>{_1camp.length}জন</td>
//             <td>বিস্তারিতো</td>
//           </tr>
//           <tr>
//             <th>দুইটি ক্যাম্প করেছেঃ </th>
//             <td>{_2camp.length}জন</td>
//             <td>বিস্তারিতো</td>
//           </tr>
//           <tr>
//             <th>তিনটি ক্যাম্প করেছেঃ </th>
//             <td>{_3camp.length}জন</td>
//             <td>বিস্তারিতো</td>
//           </tr>
//           <tr>
//             <th>চারটি ক্যাম্প করেছেঃ </th>
//             <td>{_4camp.length}জন</td>
//             <td>বিস্তারিতো</td>
//           </tr>
//           <tr>
//             <th>চারের অধিক ক্যাম্প করেছেঃ </th>
//             <td>{_4plusCamp.length}জন</td>
//             <td>বিস্তারিতো</td>
//           </tr>
//         </tbody>
//       </table>
//       </div>
//     </div>
//   );
// };

// export default DelegateAnalysis;

import { useEffect, useRef } from "react";
import { UseCampFirebase } from "../../../context/CampManagement";
import "./DelegateAnalysis.css";
import { styled } from "@mui/material/styles";
import Chart from "react-apexcharts";
import { useState } from "react";
import { IoAnalyticsSharp } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { SiMicrosoftexcel } from "react-icons/si";
import { FaFilePdf } from "react-icons/fa6";

// Tooltip
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { downloadTableExcels } from "../../../utils/ResizeImage";

const DownloadTableExcel = ({ filename, sheet, currentTableRef, children }) => {
  const handleDownload = () => {
    downloadTableExcels(filename, sheet, currentTableRef);
  };

  return <div onClick={handleDownload}>{children}</div>;
};

const DelegateAnalysis = () => {
  const campFirebase = UseCampFirebase();
  const naviget = useNavigate();
  const [allDeligate, setAllDeligate] = useState([]);

  useEffect(() => {
    campFirebase.setForceByUpdate(!campFirebase.forceByUpdate)
    campFirebase.setforceUpdateReg(!campFirebase.forceUpdateReg)
    campFirebase.setForceByUpdateBrince(!campFirebase.forceByUpdateBrince)
  }, [])
  
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

          }
          .regimentTitle{
             
          }
          @page{
            margin: -50px 40px 20px 40px;
          }
          .divIoAnalyticsSharp{
            display: none
          }
        `;
      printableContent.appendChild(printStyles);

      return printableContent;
    },
    documentTitle: "অংশগ্রহণকারীদের তথ্য",
    onAfterPrint: () => console.log("Success"),
  });

  const tableRef = useRef(null);

  const seeDetalseInfo = (info) => {
    campFirebase.setInfoDetalse(info);
    navigate("/infoUpdateAndCreate");
  };

  const screenWidth = window.screen.width;

  useEffect(() => {
    const getAllData = async () => {
      try {
        const data = await campFirebase.deleget_Data;

        // Filter the array to keep only objects where isHedeleget is "true"
        const filteredData = data.filter((item) => item.isHedeleget === "true");
        setAllDeligate(filteredData);
      } catch (error) {
        console.error("Error fetching regiments:", error.message);
      }
    };

    getAllData();
  }, [campFirebase]);

  const chocos = allDeligate?.filter(
    (deleget) => deleget.organizationalvalues === "চৌকস"
  );
  const ogrophotikh = allDeligate?.filter(
    (deleget) => deleget.organizationalvalues === "অগ্রপথিক"
  );

  const suvasito = allDeligate?.filter(
    (deleget) => deleget.senOrganizationalvalues === "সুবাসিত"
  );
  const bikosito = allDeligate?.filter(
    (deleget) => deleget.senOrganizationalvalues === "বিকশিত"
  );
  const dhiman = allDeligate?.filter(
    (deleget) => deleget.senOrganizationalvalues === "ধীমান"
  );
  const ovijathri = allDeligate?.filter(
    (deleget) => deleget.senOrganizationalvalues === "অভিযাত্রী"
  );

  const dhiman_ogrophotikh = allDeligate?.filter(
    (deleget) =>
      deleget.senOrganizationalvalues === "ধীমান" &&
      deleget.organizationalvalues === "অগ্রপথিক"
  );
  const ovijathri_ogrophotikh = allDeligate?.filter(
    (deleget) =>
      deleget.senOrganizationalvalues === "অভিযাত্রী" &&
      deleget.organizationalvalues === "অগ্রপথিক"
  );

  const _noCamp = allDeligate?.filter(
    (deleget) => deleget.previousCampNumber === "০টি"
  );
  const _1camp = allDeligate?.filter(
    (deleget) => deleget.previousCampNumber === "১টি"
  );
  const _2camp = allDeligate?.filter(
    (deleget) => deleget.previousCampNumber === "২টি"
  );
  const _3camp = allDeligate?.filter(
    (deleget) => deleget.previousCampNumber === "৩টি"
  );
  const _4camp = allDeligate?.filter(
    (deleget) => deleget.previousCampNumber === "৪টি"
  );
  const _4plusCamp = allDeligate?.filter(
    (deleget) =>
      deleget.previousCampNumber === "৫টি" ||
      deleget.previousCampNumber === "৬টি"
  );

  // console.log(_4plusCamp)

  // console.log(_noCamp)


  return (
    <div
      style={{ marginTop: "120px", marginBottom: "100px" }}
      ref={componentRef}
      className="homePageContainer"
    >
      <div className="regimentLest">
        <h1 className="titleAnalisis">অংশগ্রহণকারীদের তথ্য</h1>

        <div className="downloadeShoit">
          <FaFilePdf className="pdfDownloade" onClick={handlePrint} />

          <DownloadTableExcel
            filename="অংশগ্রহণকারীদের তথ্য"
            sheet="অংশগ্রহণকারীদের তথ্য"
            currentTableRef={tableRef}
          >
            <SiMicrosoftexcel className="excelDownloade" />
          </DownloadTableExcel>
        </div>

        <NavLink to={"/delegateAnalysis/analysisChart"}>
          <div className="divIoAnalyticsSharp">
            <IoAnalyticsSharp className="IoAnalyticsSharp" />
          </div>
        </NavLink>

        <table ref={tableRef} className="regimentTable tabLeft">
          <tbody>
            <tr>
              <th>অংশগ্রহণ কৃত ডেলিগেট সংখ্যাঃ </th>
              <td>{allDeligate.length}জন</td>

              <td className="dtlsLink">
                <NavLink to={"/alldetalselest"}>বিস্তারিত</NavLink>
              </td>
            </tr>
            <tr>
              <th>চৌকসঃ </th>
              <td>{chocos.length}জন</td>
              <td
                onClick={() => {
                  campFirebase.setAnalysisData(chocos);
                }}
              >
                <NavLink to={"/delegateAnalysis/অংশগ্রহণ কৃত চৌকস সংখ্যাঃ"}>
                  বিস্তারিত
                </NavLink>
              </td>
            </tr>
            <tr>
              <th>অগ্রপথিকঃ </th>
              <td>{ogrophotikh.length}জন</td>
              <td
                onClick={() => {
                  campFirebase.setAnalysisData(ogrophotikh);
                }}
              >
                <NavLink to={"/delegateAnalysis/অংশগ্রহণ কৃত অগ্রপথিক সংখ্যাঃ"}>
                  বিস্তারিত
                </NavLink>
              </td>
            </tr>
            <tr>
              <th>সুবাসিতঃ </th>
              <td>{suvasito.length}জন</td>
              <td
                onClick={() => {
                  campFirebase.setAnalysisData(suvasito);
                }}
              >
                <NavLink to={"/delegateAnalysis/অংশগ্রহণ কৃত সুবাসিত সংখ্যাঃ"}>
                  বিস্তারিত
                </NavLink>
              </td>
            </tr>
            <tr>
              <th>বিকশিতঃ </th>
              <td>{bikosito.length}জন</td>
              <td
                onClick={() => {
                  campFirebase.setAnalysisData(bikosito);
                }}
              >
                <NavLink to={"/delegateAnalysis/অংশগ্রহণ কৃত বিকশিত সংখ্যাঃ"}>
                  বিস্তারিত
                </NavLink>
              </td>
            </tr>
            <tr>
              <th>ধীমানঃ </th>
              <td>{dhiman.length}জন</td>
              <td
                onClick={() => {
                  campFirebase.setAnalysisData(dhiman);
                }}
              >
                <NavLink to={"/delegateAnalysis/অংশগ্রহণ কৃত ধীমান সংখ্যাঃ"}>
                  বিস্তারিত
                </NavLink>
              </td>
            </tr>
            <tr>
              <th>অভিযাত্রীঃ </th>
              <td>{ovijathri.length}জন</td>
              <td
                onClick={() => {
                  campFirebase.setAnalysisData(ovijathri);
                }}
              >
                <NavLink
                  to={"/delegateAnalysis/অংশগ্রহণ কৃত অভিযাত্রী সংখ্যাঃ"}
                >
                  বিস্তারিত
                </NavLink>
              </td>
            </tr>
            <tr>
              <th>ধীমান/অগ্রপথিকঃ </th>
              <td>{dhiman_ogrophotikh.length}জন</td>
              <td
                onClick={() => {
                  campFirebase.setAnalysisData(dhiman_ogrophotikh);
                }}
              >
                <NavLink
                  to={"/delegateAnalysis/অংশগ্রহণ কৃত ধীমান ও অগ্রপথিক সংখ্যাঃ"}
                >
                  বিস্তারিত
                </NavLink>
              </td>
            </tr>
            <tr>
              <th>অভিযাত্রী/অগ্রপথিকঃ</th>
              <td>{ovijathri_ogrophotikh.length}জন</td>
              <td
                onClick={() => {
                  campFirebase.setAnalysisData(ovijathri_ogrophotikh);
                }}
              >
                <NavLink
                  to={
                    "/delegateAnalysis/অংশগ্রহণ কৃত অভিযাত্রী ও অগ্রপথিক সংখ্যাঃ"
                  }
                >
                  বিস্তারিত
                </NavLink>
              </td>
            </tr>
            <tr>
              <th>ক্যাম্প করেনিঃ </th>
              <td>{_noCamp.length}জন</td>
              <td
                onClick={() => {
                  campFirebase.setAnalysisData(_noCamp);
                }}
              >
                <NavLink
                  to={
                    "/delegateAnalysis/পূর্বে ক্যাম্প করেনি এমন ডেলিগেট সংখ্যাঃ"
                  }
                >
                  বিস্তারিত
                </NavLink>
              </td>
            </tr>
            <tr>
              <th>একটি ক্যাম্প করেছেঃ </th>
              <td>{_1camp.length}জন</td>
              <td
                onClick={() => {
                  campFirebase.setAnalysisData(_1camp);
                }}
              >
                <NavLink
                  to={
                    "/delegateAnalysis/পূর্বে একটি ক্যাম্প করেছে এমন ডেলিগেট সংখ্যাঃ"
                  }
                >
                  বিস্তারিত
                </NavLink>
              </td>
            </tr>
            <tr>
              <th>দুইটি ক্যাম্প করেছেঃ </th>
              <td>{_2camp.length}জন</td>
              <td                 onClick={() => {
                  campFirebase.setAnalysisData(_2camp);
                }}>
                <NavLink
                  to={
                    "/delegateAnalysis/পূর্বে দুইটি ক্যাম্প করেছে এমন ডেলিগেট সংখ্যাঃ"
                  }
                >
                  বিস্তারিত
                </NavLink>
              </td>
            </tr>
            <tr>
              <th>তিনটি ক্যাম্প করেছেঃ </th>
              <td>{_3camp.length}জন</td>
              <td
                onClick={() => {
                  campFirebase.setAnalysisData(_3camp);
                }}
              >
                <NavLink
                  to={
                    "/delegateAnalysis/পূর্বে তিনটি ক্যাম্প করেছে এমন ডেলিগেট সংখ্যাঃ"
                  }
                >
                  বিস্তারিত
                </NavLink>
              </td>
            </tr>
            <tr>
              <th>চারটি ক্যাম্প করেছেঃ </th>
              <td>{_4camp.length}জন</td>
              <td
                onClick={() => {
                  campFirebase.setAnalysisData(_4camp);
                }}
              >
                <NavLink
                  to={
                    "/delegateAnalysis/পূর্বে চারটি ক্যাম্প করেছে এমন ডেলিগেট সংখ্যাঃ"
                  }
                >
                  বিস্তারিত
                </NavLink>
              </td>
            </tr>
            <tr>
              <th>চারের অধিক ক্যাম্প করেছেঃ </th>
              <td>{_4plusCamp.length}জন</td>
              <td
                onClick={() => {
                  campFirebase.setAnalysisData(_4plusCamp);
                }}
              >
                <NavLink
                  to={
                    "/delegateAnalysis/পূর্বে চারের অধিক ক্যাম্প করেছে এমন ডেলিগেট সংখ্যাঃ"
                  }
                >
                  বিস্তারিত
                </NavLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DelegateAnalysis;
