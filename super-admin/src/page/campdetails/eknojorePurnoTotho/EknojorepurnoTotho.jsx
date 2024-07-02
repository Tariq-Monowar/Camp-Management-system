import React from "react";
import { NavLink } from "react-router-dom";
const EknojorepurnoTotho = () => {
  return (
    <div className="homeSection">
      <div className="homeAllBtn">
        <NavLink className="homeLinkBtn" to="/AllListDeleget">
          <button style={{ paddingRight: "30px", paddingLeft: "32px" }}>
            ডেলিগেট তথ্য
          </button>
        </NavLink>
        <NavLink className="homeLinkBtn" to="/alllistorganizer">
          <button style={{ paddingRight: "35px", paddingLeft: "35px", marginTop: "10px" }}>সংগঠক তথ্য</button>
        </NavLink>
      </div>
    </div>
  );
};

export default EknojorepurnoTotho;
