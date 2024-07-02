import "./allDelegetList.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useReactToPrint } from "react-to-print";
import { MdDelete } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { SiMicrosoftexcel } from "react-icons/si";
import { FaFilePdf } from "react-icons/fa6";
import { downloadTableExcels } from "../../utils/ResizeImage";
import { RegimentFirebase } from "../../context/RegimentContext";


const DownloadTableExcel = ({ filename, sheet, currentTableRef, children }) => {
  const handleDownload = () => {
    downloadTableExcels(filename, sheet, currentTableRef);
  };

  return <div onClick={handleDownload}>{children}</div>;
};

const AllDelegetList = () => {
  const navigate = useNavigate();
  const campFirebase = RegimentFirebase();
  const [open, setOpen] = useState(false);
  const [forceByUpdate, setForceByUpdate] = useState(false);
  const [allDeligatet, setAllDeligate] = useState([]);

  const [liadingTrue, setLiadingTrue] = useState(true);

  function convertToBanglaNumber(number) {
    const banglaNumbers = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  
    return number
      .toString()
      .split("")
      .map((digit) => banglaNumbers[parseInt(digit, 10)])
      .join("");
  }

//   useEffect(() => {
//     const getData = async () => {
//       const deleget = await Firebase.delegetData;
//       console.log()
//     };
//     getData();
//   }, [Firebase]);

  useEffect(() => {
    const getAllData = async () => {
    //   try {
        const data = await campFirebase.delegetData;
        const filteredData = data.filter((item) => item.isHedeleget === "true");
        filteredData.sort((a, b) => a.delegatId - b.delegatId);
        setAllDeligate(filteredData);
        setLiadingTrue(false);
    //   } catch (error) {
    //     console.error("Error fetching regiments:", error.message);
    //   }
    };
    getAllData();
  }, [campFirebase, forceByUpdate]);


  // excl
  const tableRef = useRef(null);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => {
      const printableContent = componentRef.current.cloneNode(true);
  
      // Exclude the element with className "downloadeShoit" from the printed content
      const elementsToExclude = printableContent.querySelectorAll(".downloadeShoit");
      elementsToExclude.forEach((element) => element.remove());
  
      // Exclude the element with className "regCreateBrnList" from the printed content
      const regCreateBrnList = printableContent.querySelector(".regCreateBrnList");
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
  

  const goToDetalseInfo = (id) => {
    // console.log(id)
    localStorage.setItem("goToDetalseInfo", id);

    navigate("/detalseDelegetInfo");
  };

  return (
    <>
      <div ref={componentRef} className="homePageContainer">
        <div style={{ marginBottom: "100px" }} className="regimentLest">
          <h1 className="regimentTitle">
            অংশগ্রহণ কৃত ডেলিগেট সংখ্যা: {convertToBanglaNumber(allDeligatet?.length)}
          </h1>
          <div className="downloadeShoit">
            <FaFilePdf className="pdfDownloade" onClick={handlePrint} />
            <DownloadTableExcel
              filename="অংশগ্রহণ কৃত সকল ডেলিগেট তালিকা"
              sheet="অংশগ্রহণ কৃত সকল ডেলিগেট তালিকা"
              currentTableRef={tableRef}
            >
              <SiMicrosoftexcel className="excelDownloade" />
            </DownloadTableExcel>
          </div>
          <table ref={tableRef} className="regimentTable">
            <tr>
              <th>ক্রম</th>
              <th>নাম</th>
              <th>পিতার নাম</th>
              <th>শ্রেণী</th>
              <th>শাখা</th>
              <th>সাংগঠনিক মান</th>
              <th>রেজিমেন্ট</th>
              <th>ডেলিগেট কোড</th>
              <th>তথ্য</th>
            </tr>

            {allDeligatet &&
              allDeligatet.map((deleget, index) => {
                return (
                    <tr key={deleget.id}>
                      <td>{convertToBanglaNumber(index + 1)}</td>
                      <td>{deleget.fullNameBangla}</td>
                      <td>{deleget.fatherNameBangla}</td>
                      <td>{deleget.classValue}</td>
                      <td>{deleget.brance}</td>
                      <td>
                        <span>
                          {deleget.organizationalvalues !== "প্রযোজ্য নয়" &&
                            deleget.organizationalvalues + ", "}
                        </span>

                        {deleget.senOrganizationalvalues !== "প্রযোজ্য নয়" &&
                          deleget.senOrganizationalvalues}
                      </td>
                      <td>{deleget.regiment}</td>
                      <td>
                        {`৪৪.২৪.${convertToBanglaNumber(String(deleget.delegatId).padStart(4, "0"))}`}
                      </td>
                      <td>
                        <span
                          onClick={() => goToDetalseInfo(deleget.id)}
                          className="detalseInfo"
                        >
                          বিস্তারিত তথ্য
                        </span>
                      </td>
                    </tr>
                );
              })}
          </table>

          {liadingTrue && (
            <div style={{ marginTop: "30px" }} className="animation-hr">
              <hr className="hr1" />
              <hr className="hr2" />
              <hr className="hr3" />
              <hr className="hr4" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllDelegetList;
