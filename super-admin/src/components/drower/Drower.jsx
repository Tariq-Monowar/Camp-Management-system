import "./drower.css";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Divider from "@mui/material/Divider";

import { RxCross2 } from "react-icons/rx";
import { FaCaretDown } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import logo from "../../assets/phulkuri.png";
import { UseCampFirebase } from "../../context/CampManagement";

const DrawerComponent = ({ isOpen, onClose }) => {
  const campFirebase = UseCampFirebase();
  const navigate = useNavigate();
  const shouldShowData = localStorage.getItem("currentCampId");

  const [openTalika, setOpenTalika] = useState(false);
  const [openSubTalikaMap, setOpenSubTalikaMap] = useState({});
  const [campData, setCampData] = useState([]);
  const [currentIdForNaviget, setCurrentIdForNaviget] = useState("");

  useEffect(() => {
    const getAllData = async () => {
      try {
        const data = await campFirebase.camp_WithDeleget;
        setCampData(data);
      } catch (error) {
        console.error("Error fetching regiments:", error.message);
      }
    };
    getAllData();
  }, [campFirebase]);

  const logoFun = () => {
    navigate("/");
    onClose();
  };

  const campAlltalikaFun = (campName) => {
    localStorage.setItem("currentCampId", currentIdForNaviget);
    campFirebase.setForceByUpdate(!campFirebase.forceByUpdate)
    localStorage.setItem("navheader", campName);
    navigate("/entranceCampDetalse");
    onClose();
  };

  const deligateTalikaFun = (campName) => {
    localStorage.setItem("currentCampId", currentIdForNaviget);
    campFirebase.setForceByUpdate(!campFirebase.forceByUpdate)
    localStorage.setItem("navheader", campName);
    navigate("/alldetalselest");
    onClose();
  };

  const regDeligateTalikaFun = (campName) => {
    localStorage.setItem("currentCampId", currentIdForNaviget);
    campFirebase.setForceByUpdate(!campFirebase.forceByUpdate);
    campFirebase.setforceUpdateReg(!campFirebase.forceUpdateReg)
    localStorage.setItem("navheader", campName);
    navigate("/regimentWisedList");
    onClose();
  };

  const brancDeligateTalikaFun = (campName) => {
    localStorage.setItem("currentCampId", currentIdForNaviget);
    campFirebase.setForceByUpdate(!campFirebase.forceByUpdate)
    campFirebase.setForceUBrinces(!campFirebase.forceUBrinces)
    campFirebase.setforceUpdateReg(!campFirebase.forceUpdateReg)
    localStorage.setItem("navheader", campName);
    navigate("/branchwisedelegate");
    onClose();
  };

  const brancDeligateTalikaFunS = (campName) => {
    localStorage.setItem("currentCampId", currentIdForNaviget);
    campFirebase.setForceByUpdate(!campFirebase.forceByUpdate)
    localStorage.setItem("navheader", campName);
    navigate("/branchwisedelegate/brancewisedList");
    onClose();
  };

  const attendantDelegateFun =(campName)=>{
    localStorage.setItem("currentCampId", currentIdForNaviget);
    campFirebase.setForceByUpdate(!campFirebase.forceByUpdate)
    localStorage.setItem("navheader", campName);
    navigate("/delegateAnalysis");
    onClose();
  }

  const delegateRegFun = (campName) => {
    localStorage.setItem("currentCampId", currentIdForNaviget);
    campFirebase.setForceByUpdate(!campFirebase.forceByUpdate)
    localStorage.setItem("navheader", campName);
    navigate("/delegateRegistration");
    onClose();
  };

  const adminProfileFun = () => {
    navigate("/profile");
    onClose();
  };

  const searchFun = (campName) => {
    localStorage.setItem("currentCampId", currentIdForNaviget);
    campFirebase.setForceByUpdate(!campFirebase.forceByUpdate)
    localStorage.setItem("navheader", campName);
    navigate("/search");
    onClose();
  };

  // const brancDeligateUnpresntFun = (campName) => {
  //   localStorage.setItem("currentCampId", currentIdForNaviget);
  //   localStorage.setItem("navheader", campName);
  //   navigate("/branchwisedelegate/brancewisedunpresent");
  //   onClose();
  // };

  const regInfoOneFun = (campName) => {
    localStorage.setItem("currentCampId", currentIdForNaviget);
    campFirebase.setForceByUpdate(!campFirebase.forceByUpdate)
    localStorage.setItem("navheader", campName);
    navigate("/eknojoreRegimentInfo");
    onClose();
  };

  const organizatiorTalikaFun = (campName) => {
    localStorage.setItem("currentCampId", currentIdForNaviget);
    campFirebase.setForceByUpdate(!campFirebase.forceByUpdate)
    localStorage.setItem("navheader", campName);
    navigate("/organizerslist");
    onClose();
  };

  const seniorAdminFun = () => {
    navigate("/seniorAdmin");
    onClose();
  };

  const toggleSubTalika = (campId) => {
    setCurrentIdForNaviget(campId);
    setOpenSubTalikaMap((prev) => {
      const newState = {
        ...prev,
        [campId]: !prev[campId],
      };

      Object.keys(newState).forEach((key) => {
        if (key !== campId) {
          newState[key] = false;
        }
      });

      return newState;
    });
  };

  return (
    <SwipeableDrawer anchor="left" open={isOpen} onClose={onClose}>
      <Box className="DrowerManue" role="presentation" onKeyDown={onClose}>
        <div className="drowerHeader">
          <img onClick={logoFun} className="goTohomePage" src={logo} alt="" />
          <div onClick={onClose} className="crossDrower">
            <RxCross2 />
          </div>
        </div>
        {
          <>
            <div
              className="talikaFaq"
              onClick={() => setOpenTalika(!openTalika)}
            >
              <button className="talikaBtn">ক্যাম্প বিবরণী</button>
              <FaCaretDown
                className={
                  openTalika ? "dropDownIcon truetalika" : "dropDownIcon"
                }
              />
            </div>

            {openTalika &&
              campData &&
              campData.map((data) => {
                return (
                  <div key={data.id}>
                    <Divider sx={{ borderColor: "#4b99b742" }} />
                    <div
                      className="talikanames"
                      onClick={() => toggleSubTalika(data.id)}
                    >
                      <button className="talikaDropBtn">{data.campName}</button>
                      <FaCaretDown
                        className={
                          openSubTalikaMap[data.id]
                            ? "dropDownIcon truetalika"
                            : "dropDownIcon"
                        }
                      />
                    </div>
                    {openSubTalikaMap[data.id] && (
                      <>
                        <Divider sx={{ borderColor: "#4b99b742" }} />
                        <div
                          className="talikaname"
                          onClick={() => campAlltalikaFun(data.campName)}
                        >
                          <button className="talikaDropBtn">
                            ক্যাম্পের সকল তালিকা
                          </button>
                        </div>
                        <Divider />
                        <div
                          className="talikaname"
                          onClick={() => deligateTalikaFun(data.campName)}
                        >
                          <button className="talikaDropBtn">
                            সকল ডেলিগেট তালিকা
                          </button>
                        </div>
                        <Divider />
                        <div
                          className="talikaname"
                          onClick={() => brancDeligateTalikaFun(data.campName)}
                        >
                          <button className="talikaDropBtn">
                            শাখার উপস্থিতির তথ্য
                          </button>
                        </div>
                        <Divider />
                        <div
                          className="talikaname"
                          onClick={() => brancDeligateTalikaFunS(data.campName)}
                        >
                          <button className="talikaDropBtn">
                            শাখা ভিত্তিক ডেলিগেট তালিকা
                          </button>
                        </div>
                        <Divider />
                        <div
                          className="talikaname"
                          onClick={() => attendantDelegateFun(data.campName)}
                        >
                          <button className="talikaDropBtn">
                               একনজরে অংশগ্রহণকারী
                          </button>
                        </div>
                        <Divider />
                        <div
                          className="talikaname"
                          onClick={() => regDeligateTalikaFun(data.campName)}
                        >
                          <button className="talikaDropBtn">
                            রেজিমেন্ট ভিত্তিক ডেলিগেট তালিকা
                          </button>
                        </div>
                        <Divider />
                        <div
                          className="talikaname"
                          onClick={() => regInfoOneFun(data.campName)}
                        >
                          <button className="talikaDropBtn">
                            একনজরে রেজিমেন্টের তথ্য
                          </button>
                        </div>

                        <Divider />
                        <div
                          className="talikaname"
                          onClick={() => organizatiorTalikaFun(data.campName)}
                        >
                          <button className="talikaDropBtn">
                            সংগঠক তালিকা
                          </button>
                        </div>
                        <Divider sx={{ borderColor: "#4b99b742" }} />
                        <div
                          className="talikaname"
                          onClick={() => delegateRegFun(data.campName)}
                        >
                          <button className="talikaDropBtn">
                            রেজিস্ট্রেশন
                          </button>
                        </div>
                        <Divider />
                        <div
                          className="talikaname"
                          onClick={() => searchFun(data.campName)}
                        >
                          <button className="talikaDropBtn">অনুসন্ধান</button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
          </>
        }
        <Divider />
        <div className="talikaFaq" onClick={seniorAdminFun}>
          <button className="talikaBtn">সিনিয়র এডমিন তথ্য</button>
        </div>
        <Divider />
        <div className="talikaFaq" onClick={adminProfileFun}>
          <button className="talikaBtn">প্রোফাইল</button>
        </div>
      </Box>
    </SwipeableDrawer>
  );
};

export default DrawerComponent;
