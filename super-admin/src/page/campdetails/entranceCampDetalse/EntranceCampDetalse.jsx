import { useEffect } from "react";
import "./entranceCampDetalse.css";

import { NavLink } from "react-router-dom";
import { UseCampFirebase } from "../../../context/CampManagement";
import { useState } from "react";

const EntranceCampDetalse = () => {
  const campFirebase = UseCampFirebase();

  useEffect(() => {
    campFirebase.setForceByUpdate(!campFirebase.forceByUpdate);
    campFirebase.setforceUpdateReg(!campFirebase.forceUpdateReg);
  }, []);
  
  const updateDataForce = () => {
    campFirebase.setForceUBrinces(!campFirebase.forceUBrinces);
    campFirebase.setForceByUpdate(!campFirebase.forceByUpdate);
    campFirebase.setforceUpdateReg(!campFirebase.forceUpdateReg);
  };

  return (
    <>
      <div className="homeSections">
        <div className="homeAllBtn">
          <NavLink className="homeLinkBtn" to="/alldetalselest">
            <button
              onClick={() =>
                campFirebase.setForceByUpdate(!campFirebase.forceByUpdate)
              }
            >
              ডেলিগেট তালিকা
            </button>
          </NavLink>
          <br />
          <NavLink className="homeLinkBtn" to="/branchwisedelegate">
            <button onClick={updateDataForce}>শাখার উপস্থিতির তথ্য</button>
          </NavLink>
          <NavLink className="homeLinkBtn" to="/eknojorebranchwisedInfo">
            <button>একনজরে শাখা তথ্য</button>
          </NavLink>
          <br />
          <NavLink
            className="homeLinkBtn"
            to="/branchwisedelegate/brancewisedList"
          >
            <button>শাখা ভিত্তিক ডেলিগেট তালিকা</button>
          </NavLink>
          <NavLink className="homeLinkBtn" to="/delegateAnalysis">
            <button
              onClick={() =>
                campFirebase.setForceByUpdate(!campFirebase.forceByUpdate)
              }
            >
              একনজরে অংশগ্রহণকারী
            </button>
          </NavLink>
          <br />
          <NavLink className="homeLinkBtn" to="/regimentWisedList">
            <button>রেজিমেন্ট ভিত্তিক ডেলিগেট তালিকা </button>
          </NavLink>
          <NavLink className="homeLinkBtn" to="/eknojoreRegimentInfo">
            <button>একনজরে রেজিমেন্টের তথ্য</button>
          </NavLink>
          <br />
          <NavLink className="homeLinkBtn" to="/organizerslist">
            <button
              onClick={() =>
                campFirebase.setForceByUpdate(!campFirebase.forceByUpdate)
              }
            >
              সংগঠক তালিকা
            </button>
          </NavLink>
          <NavLink className="homeLinkBtn" to="/certificateEntrance">
            <button>সার্টিফিকেট তথ্য</button>
          </NavLink>
          <br />

          {/* /delegetCodePrint
        
        */}
          <NavLink className="homeLinkBtn" to="/delegetcodeprint">
            <button>ডেলিগেট কোড প্রিন্ট</button>
          </NavLink>
          <NavLink className="homeLinkBtn" to="/alldetalsentracr">
            <button
              onClick={() =>
                campFirebase.setForceByUpdate(!campFirebase.forceByUpdate)
              }
            >
              একনজরে পূর্ণ তথ্য
            </button>
          </NavLink>
          <br />
          <NavLink className="homeLinkBtn" to="/passwordentry">
            <button
              onClick={() =>
                campFirebase.setForceByUpdate(!campFirebase.forceByUpdate)
              }
            >
              পাসওয়ার্ড ম্যানেজমেন্ট
            </button>
          </NavLink>
          <br />
          <NavLink className="homeLinkBtn" to="/delegateRegistration">
            <button
              onClick={() =>
                campFirebase.setForceByUpdate(!campFirebase.forceByUpdate)
              }
            >
              রেজিস্ট্রেশন
            </button>
          </NavLink>
          <NavLink className="homeLinkBtn" to="/search">
            <button
              onClick={() =>
                campFirebase.setForceByUpdate(!campFirebase.forceByUpdate)
              }
            >
              অনুসন্ধান
            </button>
          </NavLink>
        </div>
      </div>
      <br />
      <br />
      <br />
    </>
  );
};

export default EntranceCampDetalse;
