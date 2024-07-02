import "./login.css";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginLogo from "../../assets/loginLogo.png";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

///ui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import { MdKeyboardBackspace } from "react-icons/md";
import { RegimentFirebase } from "../../context/RegimentContext";
import branchNames from "../../data/Brance";

const Login = () => {
  const navigate = useNavigate();
  const regFirebase = RegimentFirebase();
  const [campList, setCampList] = useState([]);
  const [loginParmition, setLoginParmition] = useState(true);

  const [branchName, setBranchName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allBrance, setAllBrance] = useState([]);
  const [error, setError] = useState(null);
  // allBrance
  // Function to convert date to Bangla format
  // Function to convert date to Bangla format
  function convertDateToBangla(inputDate) {
    const banglaMonths = [
      "জানুয়ারি",
      "ফেব্রুয়ারি",
      "মার্চ",
      "এপ্রিল",
      "মে",
      "জুন",
      "জুলাই",
      "আগস্ট",
      "সেপ্টেম্বর",
      "অক্টোবর",
      "নভেম্বর",
      "ডিসেম্বর",
    ];

    const parts = inputDate.split("-");
    const year = parts[0];
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    const banglaDay = convertToBanglaNumber(day);
    const banglaYear = convertToBanglaNumber(year);
    const banglaMonth = banglaMonths[month - 1];

    return `${banglaDay} ${banglaMonth} ${banglaYear}`;
  }

  function convertToBanglaNumber(number) {
    const banglaNumbers = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

    return number
      .toString()
      .split("")
      .map((digit) => banglaNumbers[parseInt(digit, 10)])
      .join("");
  }

  useEffect(() => {
    const userData = async () => {
      const result = await regFirebase.getAllCamps();
      setCampList(result);
    };
    userData();
  }, []);

  const setCampId = (id) => {
    localStorage.setItem("campData", JSON.stringify(id));
    setLoginParmition(false);
  };

  useEffect(() => {
    const storedCampData = JSON.parse(localStorage.getItem("campData"));
    if (storedCampData) {
      localStorage.setItem("campId", storedCampData.id);
    }
  }, [loginParmition]);
  // console.log(JSON.parse(localStorage.getItem("campData")))
  // console.log(localStorage.getItem("campId"));

  useEffect(() => {
    if (!loginParmition) {
      const getAllreg = async () => {
        try {
          setLoading(true);
          const data = await regFirebase.getBrance();
          setAllBrance(data);
        } catch (error) {
          console.error("Error fetching regiments:", error.message);
        } finally {
          setLoading(false);
        }
      };
      getAllreg();
    }
  }, [loginParmition, regFirebase]);


  const handleLogin = async (e) => {
    e.preventDefault();
    const matchingAdmin = allBrance.find(
      (admin) =>
        admin.branceName === branchName && admin.password === password
    );
    if (matchingAdmin) {
      console.log("Authentication successful!");
      localStorage.setItem("authtoken", JSON.stringify(matchingAdmin));
      navigate("/");
      window.location.reload();
    } else {
      alert("Invalid Branch! Try again");
      console.log("Authentication failed!");
      setError("Invalid credentials");
    }
  };


  const authToken = JSON.parse(localStorage.getItem("authtoken"));

  return (
    <div>
      <nav className="LoginNavBar">
        {!loginParmition && (
          <MdKeyboardBackspace
            onClick={() => setLoginParmition(!loginParmition)}
            className="backIcon"
          />
        )}

        {/* <IoArrowBackOutline /> */}
        <p>ক্যাম্প ম্যনেজমেন্ট সিস্টেম</p>
      </nav>
      {loginParmition ? (
        <div className="campCardContainer">
          {campList &&
            campList.map((data) => {
              return (
                <div
                  key={data.id}
                  onClick={() => setCampId(data)}
                  className="campCard"
                >
                  <span>ক্যাম্প এর নাম</span>
                  <hr className="hrCard" />
                  <p>{data.campName}</p>

                  <div className="campStartDate">
                    <span className="camp">স্থান</span>
                    <p>{data.place}</p>
                  </div>

                  <div className="dateCard">
                    {data.startDate && (
                      <div className="campStartDate">
                        <span className="camp">ক্যাম্প শুরুর তারিখ</span>
                        <p>{convertDateToBangla(data.startDate)}</p>
                      </div>
                    )}
                    {data.startDate && (
                      <div className="campStartDate">
                        <span className="camp">ক্যাম্প শেষের তারিখ</span>
                        <p>{convertDateToBangla(data.endDate)}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="loginRegiment">
          <div className="innerLogContainner">
            <div className="">
              <form onSubmit={handleLogin} className="loginForm">
                <h1 className="">Login Here</h1>
                {/* <input
                  className=""
                  type="text"
                  placeholder="User name"
                  name="email"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  required
                /> */}
                <div className="selectBrance">
                  {/* <span>শাখা সিলেক্ট করুন</span> */}
                  <select
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      শাখা সিলেক্ট করুন
                    </option>
                    {allBrance?.map((reg) => (
                      <option key={reg.branceName} value={reg.branceName}>
                        {reg.branceName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="Brancepassword">
                  <input
                    className="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                  <div className="showHideIcon">
                    {showPassword ? (
                      <FaEyeSlash
                        className="showHideIcons"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <IoEyeSharp
                        className="showHideIcons"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  </div>
                </div>
                <button className="buttonSubmit" type="submit">
                  {loading ? "Login..." : "Login"}
                </button>
                <br />
                <img src={loginLogo} alt="" />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
