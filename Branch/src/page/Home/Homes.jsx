import "./home.css";
import { useState, useEffect } from "react";
import { RegimentFirebase } from "../../context/RegimentContext";
import CoppyWrite from "../../components/coppyWrite/CoppyWrite";

const Homes = () => {
  const Firebase = RegimentFirebase();

  const [allDeleget, setAllDeleget] = useState([]);
  const storedCampData = JSON.parse(localStorage.getItem("campData"));

  useEffect(() => {
    Firebase.setForceByUpdate(!Firebase.forceByUpdate); 
  }, []);

  // Function to convert date to Bangla format
  function convertToBanglaNumber(number) {
    if (number === undefined || number === null) {
      return ""; // Handle the case where the number is undefined or null
    }

    const banglaNumbers = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

    return number
      .toString()
      .split("")
      .map((digit) => banglaNumbers[parseInt(digit, 10)])
      .join("");
  }

  const authToken = JSON.parse(localStorage.getItem("authtoken"));

  useEffect(() => {
    const getAllData = async () => {
      const authToken = JSON.parse(localStorage.getItem("authtoken"));
      try {
        const data = await Firebase.getBrance();
        if (data && data.length > 0) {
          const matchingReg = data.find(
            (reg) =>
              reg.branceName === authToken.branceName &&
              reg.password === authToken.password
          );

          if (matchingReg) {
            console.log("Success..");
            localStorage.setItem("authtoken", JSON.stringify(matchingReg));
          } else {
            console.log("No matching admin found.");
            localStorage.removeItem("authtoken");
            localStorage.removeItem("campData");
            localStorage.removeItem("campId");
            navigate("/");
            window.location.reload();
          }
        }
      } catch (error) {
        console.error("Error fetching senior admins:", error.message);
      }
    };
    getAllData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const deleget = await Firebase.delegetData;
      if (deleget && deleget.length > 0) {
        const filteredData = deleget.filter((item) => item.isHedeleget === "true");
        setAllDeleget(filteredData);
      }
    };
    getData();
  }, [Firebase]);
  console.log(allDeleget)

  return (
    <>
      <div className="homeContainer">
        <div className="innerHomeContainner">
          <p className="campNameHome">{storedCampData?.campName} এ </p>
          <p className="campTextHome">
            শাখার ডেলিগেট ধার্য{" "}
            <span style={{ color: "#12a8e4" }}>
              {convertToBanglaNumber(authToken?.delegateDarjo)}
            </span>
          </p>
          <p className="campTextHome">
            সর্বমোট রেজিস্ট্রেশন কৃত ডেলিগেট সংখ্যা
          </p>
          <p className="regimentNumberHome">
            { allDeleget && allDeleget.length > 0 ? convertToBanglaNumber(
              allDeleget.length
            ):"০"}
          </p>
        </div>
      </div>
      <CoppyWrite />
    </>
  );
};

export default Homes;
