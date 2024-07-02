import "./navBar.css";
import { useEffect, useState } from "react";

import { FiLogOut } from "react-icons/fi";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";

import { useLocation, useNavigate } from "react-router-dom";

import DrawerComponent from "../Drower/Drower";

import { RegimentFirebase } from "../../context/RegimentContext";

const Navbar = () => {
  const navigate = useNavigate();
  const Firebase = RegimentFirebase();
  const [allDeleget, setAllDeleget] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const regimentData = JSON.parse(localStorage.getItem("authtoken"));

  function convertToBanglaNumber(number) {
    const banglaNumbers = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

    return number
      .toString()
      .split("")
      .map((digit) => banglaNumbers[parseInt(digit, 10)])
      .join("");
  }

  const logOutRegiment = () => {
    const keysToExclude = [""];
  
    // Get all keys in local storage
    const keys = Object.keys(localStorage);

    // Iterate through keys and remove items not in the exclusion list
    keys.forEach((key) => {
      if (!keysToExclude.includes(key)) {
        localStorage.removeItem(key);
      }
    });
    
    navigate("/");
    location.reload();
  };

  useEffect(() => {
    const getData = async () => {
      const deleget = await Firebase.delegetData;
      // console.log(deleget)
      if (deleget && deleget.length > 0) {
        const filteredData = deleget.filter((item) => item.isHedeleget === "true");
        setAllDeleget(filteredData);
      }
    };
    getData();
  }, [Firebase]);
  localStorage.setItem("delegetLength", allDeleget?.length);
  const delegetLength = localStorage.getItem("delegetLength");

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  useEffect(() => {
    if (regimentData?.branceName === undefined) {
      localStorage.removeItem("authtoken");
    }
  }, []);

  return (
    <nav className="navBar">
      <div onClick={toggleDrawer(true)} className="modalOpanBar">
        <HiMiniBars3BottomLeft />
      </div>
      <DrawerComponent isOpen={isDrawerOpen} onClose={toggleDrawer(false)} />
      {/* <DrawerComponent
      isOpen={isDrawerOpen}
      onClose={toggleDrawer(false)}
    /> */}
      <div className="homeTitle">
        <p onClick={() => navigate("/")}>{`${
          regimentData?.branceName
        } (${convertToBanglaNumber(Number(delegetLength))})`}</p>
      </div>
      <div className="logoutIcon">
        <FiLogOut onClick={logOutRegiment} />
      </div>
    </nav>
  );
};

export default Navbar;
