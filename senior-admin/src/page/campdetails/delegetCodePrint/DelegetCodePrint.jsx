import "./DelegetCodePrint.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { UseCampFirebase } from "../../../context/CampManagement";
const DelegetCodePrint = () => {
  const campFirebase = UseCampFirebase();
  const [brinceData, setBrinceData] = useState([]);
  useEffect(() => {
    const getAllData = async () => {
      try {
        const data = await campFirebase.branches;
        if (data && data.length > 0) {
          setBrinceData(data);
        }
      } catch (error) {
        console.error("Error fetching regiments:", error.message);
      }
    };

    getAllData();
  }, []);

  return (
    <div className="delecteCardContainers">
      <h1 className="TitleEntBtns" style={{ color: "#001822", marginBottom: "15px" }}>
        ডেলিগেট কোড প্রিন্ট
      </h1>

      {brinceData?.map((data) => {
        return (
          <NavLink className="printCardData" key={data.id} to={data.branceName}>
            <button>{data.branceName}</button>
          </NavLink>
        );
      })}
      <br />
      <br />
      <br />
    </div>
  );
};

export default DelegetCodePrint;
