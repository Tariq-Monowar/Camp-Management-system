import "./navbar.css";
import {  useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { FiLogOut } from "react-icons/fi";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import DrawerComponent from "../drower/Drower";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location.pathname);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const signOut = () => {
    try {
      const keysToExclude = ["allSeniorAdmins", "campData", "currentCampId"];
  
      // Get all keys in local storage
      const keys = Object.keys(localStorage);
  
      // Iterate through keys and remove items not in the exclusion list
      keys.forEach((key) => {
        if (!keysToExclude.includes(key)) {
          localStorage.removeItem(key);
        }
      });
  
      navigate("/");
      window.location.reload();
    } catch (error) {
      alert("লগআউট করার সময় ত্রুটি হয়েছে!");
    }
  };


  if (
    location.pathname === "/createregiment" ||
    location.pathname === "/infoUpdateAndCreate"
  ) {
    return;
  } else if (
    [
      "/entranceCampDetalse",
      "/alldetalselest",
      "/branchwisedelegate",
      "/branchwisedelegate/brancewisedList",
      "/eknojorebranchwisedInfo",
      "/regimentWisedList",
      "/eknojoreRegimentInfo",
      "/organizerslist",
      "/regimrntwisedOrganizeres",
      "/branchwisedOrganizeres",
      "/delegateRegistration",
      "/search",
      "/detalseDeligetInfo",
      "/detalseDeligetInfo/updateDeligat",
      "/delegetCertificate",
      "/certificateEntrance",
      "/organizersCertificate"
    ].includes(location.pathname)
  ) {
    return (
      <div>
        <nav className="navBar">
          <div onClick={toggleDrawer(true)} className="modalOpanBar">
            <HiMiniBars3BottomLeft />
          </div>
          <DrawerComponent
            isOpen={isDrawerOpen}
            onClose={toggleDrawer(false)}
          />
          <div className="homeTitle">
            <p className="headersTitles">{localStorage.getItem("navheader")}</p>
          </div>
          <div className="logoutIcon">
            <FiLogOut onClick={signOut} />
          </div>
        </nav>
      </div>
    );
  } else {
    return (
      <div>
        <nav className="navBar">
          <div onClick={toggleDrawer(true)} className="modalOpanBar">
            <HiMiniBars3BottomLeft />
          </div>
          <DrawerComponent
            isOpen={isDrawerOpen}
            onClose={toggleDrawer(false)}
          />
          <div className="homeTitle">
            {/* <p>{localStorage.getItem("navheader")}</p> */}
            <p>ক্যাম্প ম্যানেজমেন্ট সিস্টেম</p>
          </div>
          <div className="logoutIcon">
            <FiLogOut onClick={signOut} />
          </div>
        </nav>
      </div>
    );
  }
};

export default Navbar;
