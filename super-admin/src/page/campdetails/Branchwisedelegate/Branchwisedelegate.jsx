import "./branchwisedelegate.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { SiMicrosoftexcel } from "react-icons/si";
import { FaFilePdf } from "react-icons/fa6";
import { UseCampFirebase } from "../../../context/CampManagement";
// Update the import statement
import { downloadTableExcels } from "../../../utils/ResizeImage";

const DownloadTableExcel = ({ filename, sheet, currentTableRef, children }) => {
  const handleDownload = () => {
    downloadTableExcels(filename, sheet, currentTableRef);
  };

  return <div onClick={handleDownload}>{children}</div>;
};

const Branchwisedelegate = () => {
  const navigate = useNavigate();
  const campFirebase = UseCampFirebase();
  const [allDeligate, setAllDeligate] = useState([]);
  const [allBrance, setAllBrance] = useState([]);

  useEffect(() => {
    campFirebase.setForceUBrinces(!campFirebase.forceUBrinces);
  }, []);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const data = await campFirebase.all_Brances;
        setAllBrance(data);
      } catch (error) {
        console.error("Error fetching regiments:", error.message);
      }
    };

    getAllData();
  }, [campFirebase]);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const data = await campFirebase.deleget_Data;
        if (data && data.length > 0) {
          const filteredData = data.filter(
            (item) => item.isHedeleget === "true"
          );
          setAllDeligate(filteredData);
        }
      } catch (error) {
        console.error("Error fetching regiments:", error.message);
      }
    };

    getAllData();
  }, [campFirebase]);

  const combinedArray = allBrance.map((obj1) => {
    const matchingObjects = allDeligate.filter(
      (obj2) => obj2.brance === obj1.branceName
    );

    const numberOfPresent = matchingObjects.length;
    const chocos = matchingObjects.filter(
      (data) => data.organizationalvalues === "চৌকস"
    ).length;
    const ogropothic = matchingObjects.filter(
      (data) => data.organizationalvalues === "অগ্রপথিক"
    ).length;
    const dhiman = matchingObjects.filter(
      (data) => data.senOrganizationalvalues === "ধীমান"
    ).length;
    const ovijathri = matchingObjects.filter(
      (data) => data.senOrganizationalvalues === "অভিযাত্রী"
    ).length;
    const dhiman_ogrophotic = matchingObjects.filter(
      (data) =>
        data.senOrganizationalvalues === "ধীমান" &&
        data.organizationalvalues === "অগ্রপথিক"
    ).length;
    const ovijatri_ogrophotic = matchingObjects.filter(
      (data) =>
        data.senOrganizationalvalues === "অভিযাত্রী" &&
        data.organizationalvalues === "অগ্রপথিক"
    ).length;

    return {
      branceName: obj1.branceName,
      branceCode: obj1.branceCode,
      delegateDarjo: obj1.delegateDarjo,
      numberOfPresent: numberOfPresent,
      chocos: chocos,
      ogropothic,
      dhiman,
      ovijathri,
      dhiman_ogrophotic,
      ovijatri_ogrophotic,
    };
  });

  const tableRef = useRef(null);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => {
      const printableContent = componentRef.current.cloneNode(true);

      const elementsToExclude =
        printableContent.querySelectorAll(".downloadeShoit");
      elementsToExclude.forEach((element) => element.remove());

      const regCreateBrnList =
        printableContent.querySelector(".regCreateBrnList");
      regCreateBrnList && regCreateBrnList.remove();

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
    documentTitle: "অংশগ্রহণকৃত শাখা তথ্য",
    onAfterPrint: () => console.log("Success"),
  });

  return (
    <>
      <div ref={componentRef} className="homePageContainer">
        <div className="regimentLest">
          <h1 className="regimentTitle">
            অংশগ্রহণকৃত শাখাঃ {combinedArray?.length}
          </h1>
          <div className="downloadeShoit">
            <FaFilePdf className="pdfDownloade" onClick={handlePrint} />
            <DownloadTableExcel
              filename="শাখা ভিত্তিক অংশগ্রহণ কৃত ডেলিগেট"
              sheet="users"
              currentTableRef={tableRef}
            >
              <SiMicrosoftexcel className="excelDownloade" />
            </DownloadTableExcel>
          </div>
          <table ref={tableRef} className="regimentTable">
            <tr>
              <th>ক্রম</th>
              <th>নাম</th>
              <th>কোড</th>
              <th>ডেলিগেট ধার্য</th>
              <th>ডেলিগেট উপস্থিতি</th>
              <th>চৌকস</th>
              <th>অগ্রপথিক</th>
              <th>ধীমান</th>
              <th>অভিযাত্রী</th>
              <th>ধীমান, অগ্রপথিক</th>
              <th>অভিযাত্রী, অগ্রপথিক</th>
              <th>উপস্থিতির হার</th>
            </tr>

            {allBrance &&
              allDeligate &&
              combinedArray.map((percent, index) => {
                const {
                  branceName,
                  delegateDarjo,
                  numberOfPresent,
                  branceCode,
                  chocos,
                  ogropothic,
                  dhiman,
                  ovijathri,
                  dhiman_ogrophotic,
                  ovijatri_ogrophotic,
                } = percent;
                let percentage =
                  (Number(numberOfPresent) / Number(delegateDarjo)) * 100;
                let percents = parseFloat(percentage.toFixed(2));

                return (
                  <tr key={index}>
                    <td className="listNumber">{index + 1}</td>
                    <td className="branceName">{branceName}</td>
                    <td className="branceCode">{branceCode}</td>
                    <td className="amountOfdeligate">{delegateDarjo}</td>
                    <td className="attendance">{numberOfPresent}</td>

                    <td>{chocos}</td>
                    <td>{ogropothic}</td>
                    <td>{dhiman}</td>
                    <td>{ovijathri}</td>
                    <td>{dhiman_ogrophotic}</td>
                    <td>{ovijatri_ogrophotic}</td>
                    <td className="persentofattendanc">{percents}%</td>
                  </tr>
                );
              })}
          </table>
          <div className="regCreateBrnList">
            {/* <button style={{ width: "260px" }} onClick={() => navigate("/branchwisedelegate/brancewisedList")} className="regimentBtn">
              শাখা ভিত্তিক ডেলিগেট তালিকা
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Branchwisedelegate;
