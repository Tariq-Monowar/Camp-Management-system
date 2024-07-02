import "./home.css";
import { useState, useEffect } from "react";
import { RegimentFirebase } from "../../context/RegimentContext";
import CoppyWrite from "../../components/coppyWrite/CoppyWrite";

const Home = () => {
  const Firebase = RegimentFirebase();
  const [allDeleget, setAllDeleget] = useState([]);
  const storedCampData = JSON.parse(localStorage.getItem("campData"));
  const regimentName = JSON.parse(localStorage.getItem("authtoken"))?.regimentName;
  console.log(storedCampData);

  function convertToBanglaNumber(number) {
    const banglaNumbers = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

    return number
      .toString()
      .split("")
      .map((digit) => banglaNumbers[parseInt(digit, 10)])
      .join("");
  }

  useEffect(() => {
    const getData = async () => {
      const deleget = await Firebase.delegetData;
      const filteredDelegates = deleget.filter(
        (delegate) => delegate.regiment === regimentName
      );
      setAllDeleget(filteredDelegates);
    };
    getData();
  }, [Firebase]);

  const authToken = JSON.parse(localStorage.getItem("authtoken"));
  console.log(authToken);

  useEffect(() => {
    const getAllData = async () => {
      const authToken = JSON.parse(localStorage.getItem("authtoken"));
      try {
        const data = await Firebase.getRegiments();
        if (data && data.length > 0) {
          const matchingReg = data.find(
            (reg) =>
              reg.regimentId === authToken.regimentId &&
              reg.regimentPassword === authToken.regimentPassword
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

  return (
    <>
      <div className="homeContainer">
        <div className="innerHomeContainner">
          <p className="campNameHome">{storedCampData?.campName} এ </p>
          <p className="campTextHome">রেজিমেন্টের সর্বমোট ডেলিগেট সংখ্যা</p>
          <p className="regimentNumberHome">
            {convertToBanglaNumber(allDeleget.length)}
          </p>
        </div>
      </div>
      <CoppyWrite />
    </>
  );
};

export default Home;
