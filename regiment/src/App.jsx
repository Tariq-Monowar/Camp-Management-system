import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./page/login/Login";
import Home from "./page/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import AllDelegetList from "./page/allDelegetList/AllDelegetList";
import DetalseDeligetInfo from "./page/allDelegetList/detalseDeligetInfo";
import DelegetRegistration from "./page/delegetRegistration/DelegetRegistration";
import Delegates from "./page/AddDelegate/Delegates";

const App = () => {
  const isLoggedIn = localStorage.getItem("authtoken") ? true : false;
  console.log(isLoggedIn);
  return (
    <>
      {isLoggedIn ? (
        <> 
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alldeleget" element={<AllDelegetList />} />
          <Route path="/detalseDelegetInfo" element={<DetalseDeligetInfo />} />
          {/* <Route path="/delegetRegistration" element={<DelegetRegistration />} /> */}
          <Route path="/addDelegate" element={<Delegates/>} />
        </Routes>
        </>
      ) : (
        <Routes>
          <Route index element={<Login />} />
        </Routes>
      )}
    </>
  );
};

export default App;
