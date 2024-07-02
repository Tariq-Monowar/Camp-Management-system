import "./createcamp.css";
import { useNavigate } from "react-router-dom";;
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { UseCampFirebase } from "../../context/CampManagement";

const Createcamp = () => {
  const navigate = useNavigate();
  const campFirebase = UseCampFirebase();

  const [campName, setCampName] = useState("");
  const [place, setPlace] = useState("")
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitCampData = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await campFirebase.createCamp(
        campName,
        place,
        startDate,
        endDate,
        year
      );
      console.log(result);
      if (result) {
        navigate("/createregiment");
        campFirebase.setForceUcamp(!campFirebase.forceUcamp)
      }
    } catch (error) {
      console.error(error);
      alert("ক্যাম্প তৈরি করার সময় একটি ত্রুটি হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="createCampContainer">
      <h1 className="createCampTitles">নতুন ক্যাম্প</h1>
      <div className="createCampInput">
        <form onSubmit={submitCampData} className="createCamp">
          <div>
            <input
              onChange={(e) => setCampName(e.target.value)}
              value={campName}
              required
              type="text"
              placeholder="ক্যাম্পের নাম"
            />
          </div>

          <div style={{marginTop: "30px"}}>
            <input
              onChange={(e) => setPlace(e.target.value)}
              value={place}
              type="text"
              placeholder="স্থান"
            />
          </div>

          <div className="selectTime">
            <input
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}
              type="date"
              required
            />
            <input
              onChange={(e) => setEndDate(e.target.value)}
              value={endDate}
              type="date"
              required
            />
          </div>

          <div className="selectYear">
            <select onChange={(e) => setYear(e.target.value)} required>
              <option value="" disabled hidden>
                সাল নির্বাচন করুন
              </option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2025">2027</option>
              <option value="2026">2028</option>
            </select>
          </div>

          <button className="createCampBtns" type="submit">
                {loading ? (
                  <Box sx={{ marginTop: "-1px", marginBottom: "-4px" }}>
                    <CircularProgress size={23} color="inherit" />
                  </Box>
                   ) : (
                     "পরবর্তী"
                   )}
              </button> 
        </form>
      </div>
    </div>
  );
};

export default Createcamp;
