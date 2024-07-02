import React from "react";
import { NavLink } from "react-router-dom";

const PasswordEntry = () => {
  return (
    <div className="homeSection">
      <div className="homeAllBtn">
        <NavLink className="homeLinkBtn" to="/brancePassword">
          <button  style={{paddingRight: "30px", paddingLeft: "32px"}}>শাখা ভিত্তিক তথ্য</button>
        </NavLink>
        <NavLink className="homeLinkBtn" to="/regimentPassword">
          <button>রেজিমেন্ট ভিত্তিক তথ্য</button>
        </NavLink>
      </div>
    </div>
  );
};

export default PasswordEntry;
