import "./App.css"
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navBar/Navbar";
import Home from "./page/home/Home";
import Camplist from "./page/campdetails/Camplist/Camplist";
import EntranceCampDetalse from "./page/campdetails/entranceCampDetalse/EntranceCampDetalse";
import AllDeligateList from "./page/campdetails/allDeligateList/AllDeligateList";
import Branchwisedelegate from "./page/campdetails/Branchwisedelegate/Branchwisedelegate";
import RegimentWisedList from "./page/campdetails/regimentWisedList/RegimentWisedList";
import EknojoreRegimentInfo from "./page/campdetails/eknojoreRegimentInfo/EknojoreRegimentInfo";
import SingleRegimentList from "./page/campdetails/eknojoreRegimentInfo/SingleRegimentList";
import DelegateRegistration from "./page/campdetails/delegateRegistration/DelegateRegistration";
import Login from "./page/joinAdmin/Login";
import AdminProfile from "./page/adminProfile/AdminProfile";
import InfoUpdateAndCreate from "./page/InfoUpdateCreate/InfoUpdateAndCreate";
import EknojorebranchwisedInfo from "./page/campdetails/eknojorebranchwisedInfo/EknojorebranchwisedInfo";
import DetalseDeligetInfo from "./page/campdetails/DetalseDeligetInfo/DetalseDeligetInfo";
import UpdateDeligat from "./page/campdetails/DetalseDeligetInfo/UpdateDeligate";
import Search from "./page/campdetails/searchDelihate/Search";
import BrancewisedList from "./page/campdetails/Branchwisedelegate/BrancewisedList";

import OrganizersList from "./page/campdetails/Organizers/OrganizersList";
import BranchwisedOrganizeres from "./page/campdetails/Organizers/BranchwisedOrganizeres";
import RegimrntwisedOrganizeres from "./page/campdetails/Organizers/RegimrntwisedOrganizeres";
import DelegateAnalysis from "./page/campdetails/DelegateAnalysis/DelegateAnalysis";
import CertificateEntrance from "./page/campdetails/certificate/CertificateEntrance";
import OrganizersCertificate from "./page/campdetails/certificate/OrganizersCertificate";
import DelegetCertificate from "./page/campdetails/certificate/DelegetCertificate";
import SliceDeleget from "./page/campdetails/DelegateAnalysis/SliceDeleget";
import AnalysisChart from "./page/campdetails/DelegateAnalysis/AnalysisChart";
import AllListDeleget from "./page/campdetails/eknojorePurnoTotho/AllListDeleget";
import EknojorepurnoTotho from "./page/campdetails/eknojorePurnoTotho/EknojorepurnoTotho";
import AllOrganizere from "./page/campdetails/eknojorePurnoTotho/AllOrganizere";
import DelegetCodePrint from "./page/campdetails/delegetCodePrint/DelegetCodePrint";
import DetalseDelegetCode from "./page/campdetails/delegetCodePrint/DetalseDelegetCode";


const App = () => {

  const isLoggedIn = localStorage.getItem("authtoken") ? true : false;

  return (
    <>
      {isLoggedIn ? (
        <>
          <Navbar />
          <Routes>
            <Route index element={<Home />} />


            <Route path="/camplist" element={<Camplist />} />
            <Route
              path="/entranceCampDetalse"
              element={<EntranceCampDetalse />}
            />
            <Route path="/alldetalselest" element={<AllDeligateList />} />
            <Route
              path="/branchwisedelegate"
              element={<Branchwisedelegate />}
            />
            <Route path="/branchwisedelegate/brancewisedList" element={<BrancewisedList />} />

            <Route 
              path="/eknojorebranchwisedInfo"
              element={<EknojorebranchwisedInfo />}
            />
            <Route path="/regimentWisedList" element={<RegimentWisedList />} />
            <Route
              path="/eknojoreRegimentInfo"
              element={<EknojoreRegimentInfo />}
            />
            <Route path="/singleReginfo" element={<SingleRegimentList />} />
            <Route path="/delegateAnalysis" element={<DelegateAnalysis />} />
            <Route path="/delegateAnalysis/:data" element={<SliceDeleget />} />
            <Route path="/delegateAnalysis/analysisChart" element={<AnalysisChart />} />


            <Route path="/organizerslist" element={<OrganizersList />} />
            <Route path="/branchwisedOrganizeres" element={<BranchwisedOrganizeres />} />
            <Route path="/regimrntwisedOrganizeres" element={<RegimrntwisedOrganizeres />} />
            
            <Route path="/certificateEntrance" element={<CertificateEntrance />} />
            <Route path="/organizersCertificate" element={<OrganizersCertificate />} />
            <Route path="/delegetCertificate" element={<DelegetCertificate />} />

            <Route path="/delegateRegistration" element={<DelegateRegistration />} />
            <Route path="/detalseDeligetInfo" element={<DetalseDeligetInfo />} />
            <Route path="/detalseDeligetInfo/updateDeligat" element={<UpdateDeligat />} />
            <Route path="/search" element={<Search />} />
            
            <Route path="/profile" element={<AdminProfile />} />

            <Route path="/delegetcodeprint" element={<DelegetCodePrint />} />
            <Route path="/delegetcodeprint/:branceName" element={<DetalseDelegetCode />} />

            <Route path="/infoUpdateAndCreate" element={<InfoUpdateAndCreate />} />

            <Route path="/AllListDeleget" element={<AllListDeleget />} />
            <Route path="/alldetalsentracr" element={<EknojorepurnoTotho />} />
            <Route path="/alllistorganizer" element={<AllOrganizere />} />
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
