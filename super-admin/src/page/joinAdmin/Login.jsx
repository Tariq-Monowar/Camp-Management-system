import "./login.css";
import loginLogo from "../../assets/loginLogo.png";
import { FaEyeSlash, FaPassport } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { useState } from "react";
import { UseAdminAuthFirebase } from "../../context/superAdminAuth";

const Login = () => {
  const firebase = UseAdminAuthFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
console.log(error)
  const [showPassword, setshowPassword] = useState(false);
  const loginUser = async (e) => {
    e.preventDefault()
    setLoading(true)
    const result = await firebase.signinSuperAdmin(email,password);
    if(result.success === true){
      setLoading(false)
      location.reload();
    }else{
      setLoading(false)
      setError(result.error)
      if(error?.includes("auth/invalid-email")|| error?.includes("auth/invalid-credential")){
        alert("!Invalide Email or Password")
      }
    }
  };
  console.log(error)
  return (
    <div className="loginContainer">
      <div className="loginContent">
        <form onSubmit={loginUser} className="loginForm">
          <h1>Login Here</h1>
          <input
            className="LoginEmail"
            type="text"
            placeholder="User name"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            required
          />
          <div className="passwordContaner">
            <input
              className="loginPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              required
            />
            <div className="showHideIcon">
              {showPassword ? (
                <FaEyeSlash onClick={(_) => setshowPassword(!showPassword)} />
              ) : (
                <IoEyeSharp onClick={(_) => setshowPassword(!showPassword)} />
              )}
            </div>
          </div>

          <button type="submit">
            {
              loading?"Login...":"Login"
            }
          </button>
          <img src={loginLogo} alt="" />
        </form>
      </div>
    </div>
  );
};

export default Login;
