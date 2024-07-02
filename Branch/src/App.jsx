import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./page/login/Login";
import Navbar from "./components/Navbar/Navbar";
import AllDelegetList from "./page/allDelegetList/AllDelegetList";
import DetalseDeligetInfo from "./page/allDelegetList/detalseDeligetInfo";
import DelegetRegistration from "./page/delegetRegistration/DelegetRegistration";
import DelegetCodePrint from "./page/AddDelegate/DelegetCodePrint";
import Organizerslist from "./page/organizerslist/Organizerslist";
import Homes from "./page/Home/Homes";

const App = () => {
  const isLoggedIn = localStorage.getItem("authtoken") ? true : false;

  return (
    <>
      {isLoggedIn ? (
        <> 
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Homes />} />
          <Route path="/alldeleget" element={<AllDelegetList />} />
          <Route path="/organizerslist" element={<Organizerslist />} />
          <Route path="/detalseDelegetInfo" element={<DetalseDeligetInfo />} />
          <Route path="/delegetRegistration" element={<DelegetRegistration />} />
          <Route path="/addDelegate" element={<DelegetCodePrint />} />
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
