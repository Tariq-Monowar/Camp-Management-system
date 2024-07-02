import "./DelegetCodePrint.css";
import { useState } from "react";
import { RegimentFirebase } from "../../context/RegimentContext";
import { useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { FaFilePdf } from "react-icons/fa6";
import { useRef } from "react";

const DelegetCodePrint = () => {
  const campFirebase = RegimentFirebase();
  const [AllDelegetList, setAllDelegetList] = useState([]);

  function convertToBanglaNumbers(inputString) {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  
    const banglaString = inputString
      .split('')
      .map(char => {
        // Check if the character is a digit, if yes, convert to Bangla digit
        const isDigit = /^\d$/.test(char);
        return isDigit ? banglaDigits[parseInt(char, 10)] : char;
      })
      .join('');
  
    return banglaString;
  }

  function convertToBanglaNumber(number) {
    const banglaNumbers = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

    // Separate integer and decimal parts
    const [integerPart, decimalPart] = number.toString().split(".");

    // Convert integer part
    const convertedInteger = integerPart
      .split("")
      .map((digit) => banglaNumbers[parseInt(digit, 10)])
      .join("");

    // Convert decimal part if it exists
    const convertedDecimal = decimalPart
      ? "." +
        decimalPart
          .split("")
          .map((digit) => banglaNumbers[parseInt(digit, 10)])
          .join("")
      : "";

    return convertedInteger + convertedDecimal;
  }

  function convertDateToBangla(inputDate) {
    const banglaMonths = [
      "জানুয়ারি",
      "ফেব্রুয়ারি",
      "মার্চ",
      "এপ্রিল",
      "মে",
      "জুন",
      "জুলাই",
      "আগস্ট",
      "সেপ্টেম্বর",
      "অক্টোবর",
      "নভেম্বর",
      "ডিসেম্বর",
    ];

    const parts = inputDate.split("-");
    const year = parts[0];
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    const banglaDay = convertToBanglaNumber(day);
    const banglaYear = convertToBanglaNumber(year);
    const banglaMonth = banglaMonths[month - 1];

    return `${banglaDay} ${banglaMonth} ${banglaYear}`;
  }

  useEffect(() => {
    const getAllData = async () => {
      try {
        const data = await campFirebase.delegetData;
        data.sort((a, b) => a.delegatId - b.delegatId);
        setAllDelegetList(data);
        // setLiadingTrue(false);
      } catch (error) {
        console.error("Error fetching regiments:", error.message);
      }
    };
    getAllData();
  }, [campFirebase]);

  console.log(AllDelegetList);

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
        .cards {
          transform: scale(0.85);
          margin: -10px;
          page-break-inside: avoid;
        }
        @page {
          size: auto;
          margin: 30px 10px 10px 10px;
        }
      `;
      printableContent.appendChild(printStyles);

      return printableContent;
    },
    documentTitle: "ডেলিগেট",
    onAfterPrint: () => console.log("Success"),
  });

  return (
    <div className="delecteCardContainer">
      <div
        style={{ margin: "30px 0px", fontSize: "32px" }}
        className="downloadeShoit"
      >
        <FaFilePdf className="pdfDownloade" onClick={handlePrint} />
      </div>

      <div ref={componentRef} className="delegetCard">
        {AllDelegetList.map((data) => {
          return (
            <div className="cards">
              <p className="branceNames">{data.brance}</p>
              <hr />
              <div className="delegetCodes">
                <span>ডেলিগেট কোডঃ </span>
                <p>{`৪৪.২৪.${convertToBanglaNumber(
                  String(data.delegatId).padStart(4, "0")
                )}`}</p>
              </div>
              <hr />
              <div className="otherData">
                <div>
                  <span>নামঃ </span>
                  <p>{data.fullNameBangla}</p>
                </div>
                <hr />
                <div>
                  <span>পিতার নামঃ</span>
                  <p>{data.fatherNameBangla}</p>
                </div>
                <hr />
                <div>
                  <span>স্কুলঃ</span>
                  <p>{data.school}</p>
                </div>
                <hr />
                <div>
                  <span>শ্রেণীঃ</span>
                  <p>{data.classValue}</p>
                </div>
                <hr />
                <div>
                  <span>আসরের নামঃ</span>
                  <p>{data.asor}</p>
                </div>
                <hr />
                <div>
                  <span>মোবাইল নাম্বারঃ</span>
                  <p>{convertToBanglaNumber(data.mobileNumber)}</p>
                </div>
                <hr />
                <div>
                  <span>ঠিকানাঃ</span>
                  <p>{data.address}</p>
                </div>
                <hr />
        

                <>
                  <div>
                    <span>সাংগঠনিক মানঃ</span>
                    {data.organizationalvalues !== "প্রযোজ্য নয়" && (
                      <p>
                        {data.organizationalvalues !== "প্রযোজ্য নয়"
                          ? data.organizationalvalues
                          : ""}
                      </p>
                    )}
                  </div>
                  <hr />
                  <div>
                    <span>
                      {data.organizationalvalues !== "প্রযোজ্য নয়"
                        ? data.organizationalvalues + " হওয়ার"
                        : ""}{" "}
                      তারিখঃ
                    </span>
                    {data.organizationalvalues !== "প্রযোজ্য নয়" && (
                      <p>
                        {data.organizationalvalues !== "প্রযোজ্য নয়"
                          ? data.organizationalvalues && convertDateToBangla(data.joiningDate)
                          : data.organizationalvalues}
                      </p>
                    )}
                  </div>
                  <hr />
                  <div>
                    <span>
                      {data.organizationalvalues !== "প্রযোজ্য নয়"
                        ? data.organizationalvalues
                        : ""}{" "}
                      কোডঃ
                    </span>
                    {data.organizationalvalues !== "প্রযোজ্য নয়" && (
                      <p className="DelegetcodeData">
                        {convertToBanglaNumbers(data.code)}
                      </p>
                    )}
                  </div>
                </>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DelegetCodePrint;
