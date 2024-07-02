// import "./login.css";
// import loginLogo from "../../assets/loginLogo.png";
// import { FaEyeSlash, FaPassport } from "react-icons/fa";
// import { IoEyeSharp } from "react-icons/io5";
// import { useState } from "react";
// import { UseAdminAuthFirebase } from "../../context/superAdminAuth";

// const Login = () => {
//   const firebase = UseAdminAuthFirebase();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null)
// console.log(error)
//   const [showPassword, setshowPassword] = useState(false);
//   const loginUser = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     const result = await firebase.signinSuperAdmin(email,password);
//     if(result.success === true){
//       setLoading(false)
//       location.reload();
//     }else{
//       setLoading(false)
//       setError(result.error)
//       if(error?.includes("auth/invalid-email")|| error?.includes("auth/invalid-credential")){
//         alert("!Invalide Email or Password")
//       }
//     }
//   };
//   console.log(error)
//   return (
//     <div className="loginContainer">
//       <div className="loginContent">
//         <form onSubmit={loginUser} className="loginForm">
//           <h1>Login Here</h1>
//           <input
//             className="LoginEmail"
//             type="text"
//             placeholder="User name"
//             onChange={(e)=>setEmail(e.target.value)}
//             value={email}
//             required
//           />
//           <div className="passwordContaner">
//             <input
//               className="loginPassword"
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               onChange={(e)=>setPassword(e.target.value)}
//               value={password}
//               required
//             />
//             <div className="showHideIcon">
//               {showPassword ? (
//                 <FaEyeSlash onClick={(_) => setshowPassword(!showPassword)} />
//               ) : (
//                 <IoEyeSharp onClick={(_) => setshowPassword(!showPassword)} />
//               )}
//             </div>
//           </div>

//           <button type="submit">
//             {
//               loading?"Login...":"Login"
//             }
//           </button>
//           <img src={loginLogo} alt="" />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


// Login.jsx

import "./login.css";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import loginLogo from "../../assets/loginLogo.png";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { UseCampFirebase } from "../../context/CampManagement";
// import jwt from "jsonwebtoken";
// import { UseAuthFirebase } from "../../context/SeniorAuth";

const Login = () => {
  const firebase = UseCampFirebase();
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [getAllSeniorAdmins, setGetAllSeniorAdmins] = useState([]);
  const [showPassword, setShowPassword] = useState(false);


  const easyLogin = JSON.parse(localStorage.getItem("allSeniorAdmins"))

  useEffect(() => {
    const getAllData = async () => {
      try {
        const data = await firebase.getAllSeniorAdmin();
        if(data.length > 0){
          localStorage.setItem("allSeniorAdmins", JSON.stringify(data))
        }
        setGetAllSeniorAdmins(data);
      } catch (error) {
        console.error("Error fetching senior admins:", error.message);
        if(!easyLogin){
          window.location.reload()
        }
      }
    };
    getAllData();
  }, [firebase]);
 

  const handleLogin = async (e) => {
    e.preventDefault();
    const matchingAdmin = easyLogin?.find(
      (admin) => admin.userName === email && admin.password === password
    );
    if (matchingAdmin) {
      console.log("Authentication successful!");
      localStorage.setItem("authtoken", JSON.stringify(matchingAdmin));
      window.location.reload()
      navigate("/")
    } else {
      console.log("Authentication failed!");
      setError("Invalid credentials");
      alert("invalid username or password!")
    }
  };

  const authToken = JSON.parse(localStorage.getItem("authtoken"));
  console.log(authToken)

  return (
    <div className="loginContainer">
      <div className="loginContent">
        <form onSubmit={handleLogin} className="loginForm">
          <h1>Login Here</h1>
          <input
            className="LoginEmail"
            type="text"
            placeholder="User name"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <div className="passwordContaner">
            <input
              className="loginPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <div className="showHideIcon">
              {showPassword ? (
                <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
              ) : (
                <IoEyeSharp onClick={() => setShowPassword(!showPassword)} />
              )}
            </div>
          </div>

          <button type="submit">{loading ? "Login..." : "Login"}</button>
          <img src={loginLogo} alt="" />
        </form>
      </div>
    </div>
  );
};

export default Login;
