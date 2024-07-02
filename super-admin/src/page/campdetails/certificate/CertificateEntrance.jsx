import React from "react";
import { NavLink } from "react-router-dom";
const CertificateEntrance = () => {
  return (
    <div className="homeSection">
      <div className="homeAllBtn">
        <NavLink className="homeLinkBtn" to="/delegetCertificate">
          <button style={{ paddingRight: "30px", paddingLeft: "32px" }}>
            ডেলিগেট ভিত্তিক তথ্য
          </button>
        </NavLink>
        <NavLink className="homeLinkBtn" to="/organizersCertificate">
          <button style={{ paddingRight: "35px", paddingLeft: "35px", marginTop: "10px" }}>সংগঠক ভিত্তিক তথ্য</button>
        </NavLink>
      </div>
    </div>
  );
};

export default CertificateEntrance;
