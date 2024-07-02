import "./drower.css";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Divider from "@mui/material/Divider";

import { RxCross2 } from "react-icons/rx";
import { FaCaretDown } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import logo from "../../assets/phulkuri.png";

const DrawerComponent = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const shouldShowData = localStorage.getItem("currentCampId");

  const [openTalika, setOpenTalika] = useState(false);
  const [openSubTalikaMap, setOpenSubTalikaMap] = useState({});
  const [campData, setCampData] = useState([]);
  const [currentIdForNaviget, setCurrentIdForNaviget] = useState("");

  const logoFun = () => {
    navigate("/");
    onClose();
  };

  const deligetTalika = () => {
    navigate("/alldeleget")
    onClose();
  };
  const delegeteSongjukti = () => {
    navigate("/addDelegate")
    onClose();
  };
  const delegetReg = () => {
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

          <button onClick={delegeteSongjukti}>ডেলিগেট সংযুক্তি</button>
          <Divider sx={{ borderColor: "#4b99b742" }} />

          {/* <button onClick={delegetReg}>ডেলিগেট রেজিষ্ট্রেশন</button> */}
        </div>
      </Box>
    </SwipeableDrawer>
  );
};

export default DrawerComponent;
