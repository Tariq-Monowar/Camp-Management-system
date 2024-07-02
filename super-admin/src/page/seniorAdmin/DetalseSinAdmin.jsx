import React from "react";
import "./seniorAdmin.css";
import { UseCampFirebase } from "../../context/CampManagement";

const DetalseSinAdmin = () => {
  const campFirebase = UseCampFirebase();
  // console.log(campFirebase.senAdminData)
  const senAdData = campFirebase.senAdminData;
  return (
    <div className="detalseAdData">
      <div style={{height: "390px"}} className="seniuarAdminCard">
        <div
          style={{ backgroundImage: `url(${senAdData?.image})` }}
          className="senAdImages"
        ></div>
        <div className="admindatadiv">
          <span>@User name:</span>
          <p >{senAdData.userName}</p>
        </div>
        <div className="admindatadiv">
          <span>Password:</span>
          <p>{senAdData.password}</p>
        </div>
        <div className="admindatadiv">
          <span>Mobile Number:</span>
          <p>{senAdData.mobile}</p>
        </div>
      </div>
    </div>
  );
};

export default DetalseSinAdmin;
