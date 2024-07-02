import "./drower.css";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Divider from "@mui/material/Divider";

import { RxCross2 } from "react-icons/rx";
import { FaCaretDown } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import logo from "../../assets/phulkuri.png";
import { RegimentFirebase } from "../../context/RegimentContext";

const DrawerComponent = ({ isOpen, onClose }) => {
  const Firebase = RegimentFirebase();
  const navigate = useNavigate();
  const shouldShowData = localStorage.getItem("currentCampId");

  const [openTalika, setOpenTalika] = useState(false);
  const [openSubTalikaMap, setOpenSubTalikaMap] = useState({});
  const [campData, setCampData] = useState([]);
  const [currentIdForNaviget, setCurrentIdForNaviget] = useState("");

  const logoFun = () => {
    Firebase.setForceByUpdate(!Firebase.forceByUpdate)
    navigate("/");
    onClose();
  };

  const deligetTalika = () => {
    Firebase.setForceByUpdate(!Firebase.forceByUpdate)
    navigate("/alldeleget")
    onClose();
  };
  const songoThokTalika = ()=>{
    Firebase.setForceByUpdate(!Firebase.forceByUpdate)
    navigate("/organizerslist")
    onClose();
  }
  const delegeteSongjukti = () => {
    Firebase.setForceByUpdate(!Firebase.forceByUpdate)
    navigate("/addDelegate")
    onClose();
  };
  const delegetReg = () => {
    Firebase.setForceByUpdate(!Firebase.forceByUpdate)
    navigate("/delegetRegistration")
    onClose();
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
        <div className="userDrowerButton">
          <button onClick={deligetTalika}>ডেলিগেট তালিকা</button>
          <Divider sx={{ borderColor: "#4b99b742" }} />
          <button onClick={songoThokTalika}>সংগঠক তালিকা</button>
          <Divider sx={{ borderColor: "#4b99b742" }} />
          <button onClick={delegeteSongjukti}>ডেলিগেট কোড প্রিন্ট</button>
          <Divider sx={{ borderColor: "#4b99b742" }} />

          <button onClick={delegetReg}>ডেলিগেট রেজিস্ট্রেশন</button>
        </div>
      </Box>
    </SwipeableDrawer>
  );
};

export default DrawerComponent;
