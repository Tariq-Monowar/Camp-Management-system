import { useEffect } from "react";
import "./entranceCampDetalse.css";

import { NavLink } from "react-router-dom";
import { UseCampFirebase } from "../../../context/CampManagement";

const EntranceCampDetalse = () => {
  const campFirebase = UseCampFirebase();
  useEffect(() => {
    campFirebase.setForceByUpdate(!campFirebase.forceByUpdate)
    campFirebase.setforceUpdateReg(!campFirebase.forceUpdateReg)
    campFirebase.setForceByUpdateBrince(!campFirebase.forceByUpdateBrince)
  }, [])

  const dataShowD = ()=>{
    campFirebase.setForceByUpdate(!campFirebase.forceByUpdate)
  }
  const dataShowB = ()=>{
    campFirebase.setForceByUpdateBrince(!campFirebase.forceByUpdateBrince)
  }
  const dataShowR = ()=>{
    campFirebase.setforceUpdateReg(!campFirebase.forceUpdateReg)
  }

  const dataShowA = ()=>{
    campFirebase.setForceByUpdate(!campFirebase.forceByUpdate)
    campFirebase.setForceByUpdateBrince(!campFirebase.forceByUpdateBrince)
    campFirebase.setforceUpdateReg(!campFirebase.forceUpdateReg)
  }
   // Auth ----

   useEffect(() => {
    const getAllData = async () => {
      try {
        const data = await campFirebase.getAllSeniorAdmin();
        if (data.length > 0) {
          localStorage.setItem("allSeniorAdmins", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Error fetching senior admins:", error.message);
      }
    };
    getAllData();
  }, [campFirebase]);

  useEffect(() => {
    const getAllData = async () => {
      const authToken = JSON.parse(localStorage.getItem("authtoken"));
      try {
        const admainData = JSON.parse(localStorage.getItem("allSeniorAdmins"));
        if (admainData.length > 0) {
          const matchingAdmin = admainData.find(
            (admin) =>
              admin.userName === authToken.userName &&
              admin.password === authToken.password
          );
          if (matchingAdmin) {
            console.log("Success..");
            localStorage.setItem("authtoken", JSON.stringify(matchingAdmin));
          } else {
            console.log("No matching admin found or user not authenticated.");
            localStorage.removeItem("authtoken");
            navigate("/");
            // window.location.reload();
          }
        }
      } catch (error) {
        console.error("Error fetching senior admins:", error.message);
      }
    };
    getAllData();
  }, []);
  
  return (
    <div className="homeSection">
      <div className="homeAllBtn">
        <NavLink className="homeLinkBtn" to="/alldetalselest">
          <button onClick={dataShowD}>ডেলিগেট তালিকা</button>
        </NavLink>
        <br />
        <NavLink className="homeLinkBtn" to="/branchwisedelegate">
          <button onClick={dataShowB}>শাখার উপস্থিতির তথ্য</button>
        </NavLink>
        <NavLink className="homeLinkBtn" to="/eknojorebranchwisedInfo">
          <button onClick={dataShowB}>একনজরে শাখা তথ্য</button>
        </NavLink>
        <br />
        <NavLink className="homeLinkBtn" to="/branchwisedelegate/brancewisedList">
          <button onClick={dataShowD}>শাখা ভিত্তিক ডেলিগেট তালিকা</button>
        </NavLink>
        <NavLink className="homeLinkBtn" to="/delegateAnalysis">
          <button onClick={dataShowA}>একনজরে অংশগ্রহণকারী</button>
        </NavLink>
        <br />
        <NavLink className="homeLinkBtn" to="/regimentWisedList">
          <button onClick={dataShowR}>রেজিমেন্ট ভিত্তিক ডেলিগেট তালিকা </button>
        </NavLink>
        <NavLink className="homeLinkBtn" to="/eknojoreRegimentInfo">
          <button onClick={dataShowR}>একনজরে রেজিমেন্টের তথ্য</button>
        </NavLink>
        <br />
        <NavLink className="homeLinkBtn" to="/organizerslist">
          <button onClick={dataShowD}>সংগঠক তালিকা</button>
        </NavLink>
        <NavLink className="homeLinkBtn" to="/certificateEntrance">
          <button onClick={dataShowD}>সার্টিফিকেট তথ্য</button>
        </NavLink>
        <br />
        <NavLink className="homeLinkBtn" to="/delegetcodeprint">
            <button onClick={dataShowD}>ডেলিগেট কোড প্রিন্ট</button>
          </NavLink>
          <NavLink className="homeLinkBtn" to="/alldetalsentracr">
            <button onClick={dataShowD}>একনজরে পূর্ণ তথ্য</button>
          </NavLink>
          <br />
        <NavLink className="homeLinkBtn" to="/delegateRegistration">
          <button onClick={dataShowA}>রেজিস্ট্রেশন</button>
        </NavLink>
        <NavLink className="homeLinkBtn" to="/search">
          <button onClick={dataShowA}>অনুসন্ধান</button>
        </NavLink>
      </div>
    </div>
  );
};

export default EntranceCampDetalse;
