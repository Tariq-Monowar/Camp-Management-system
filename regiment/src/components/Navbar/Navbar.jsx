import "./navBar.css";
import { useEffect,useState } from "react";

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
  // const regimentName = JSON.parse(localStorage.getItem("authtoken"))?.regimentName;
  const regimentData = JSON.parse(localStorage.getItem("authtoken"));

  console.log(regimentData);
  function convertToBanglaNumber(number) {
    const banglaNumbers = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  
    return number
      .toString()
      .split("")
      .map((digit) => banglaNumbers[parseInt(digit, 10)])
      .join("");
  }

  const logOutRegiment = () => {
    localStorage.removeItem("authtoken");
    localStorage.removeItem("campId");
    localStorage.removeItem("campData");
    navigate("/");
    location.reload();
  };

  useEffect(() => {
    const getData = async () => {
      const deleget = await Firebase?.delegetData;
      const filteredDelegates = deleget.filter(
        (delegate) => delegate.regiment === regimentData?.regimentName
      );
      setAllDeleget(filteredDelegates);
    };
    getData();
  }, [Firebase]);


  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <nav className="navBar">
          <div onClick={toggleDrawer(true)} className="modalOpanBar">
            <HiMiniBars3BottomLeft />
          </div>
          <DrawerComponent
            isOpen={isDrawerOpen}
            onClose={toggleDrawer(false)}
          />
      {/* <DrawerComponent
      isOpen={isDrawerOpen}
      onClose={toggleDrawer(false)}
    /> */}
      <div className="homeTitle">
        <p>{`${regimentData?.regimentName} (${convertToBanglaNumber(allDeleget?.length)})`}</p>
      </div>
      <div className="logoutIcon">
        <FiLogOut onClick={logOutRegiment} />
      </div>
    </nav>
  );
};

export default Navbar;
