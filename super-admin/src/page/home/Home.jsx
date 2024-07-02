import { useEffect } from "react";
import CoppyWrite from "../../components/coppyWrite/CoppyWrite";
import { UseCampFirebase } from "../../context/CampManagement";
import "./home.css";
import { NavLink, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  
  const campFirebase = UseCampFirebase();
  useEffect(() => {
    campFirebase.setForceByUpdate(!campFirebase.forceByUpdate)
  }, [])
  return (
    <>
      <div className="homePageContainers">
        {/* <h1 className="homeTitles">৪৪ তম লিডারশীপ ক্যাম্প ২০২৪</h1> */}
        <div className="indexbtn">
          <NavLink to="/createcamp">
            <button className="homepageIndexBtn">নতুন ক্যাম্প</button>
          </NavLink>

          <NavLink to="/brancelist">
            <button className="homepageIndexBtn">শাখা</button>
          </NavLink>
          <NavLink to="/camplist">
            <button className="homepageIndexBtn">ক্যাম্প বিবরণী</button>{" "}
          </NavLink>
        </div>
      </div>
      <CoppyWrite />
    </>
  );
};

export default Home;
