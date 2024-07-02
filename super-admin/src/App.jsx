import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navBar/Navbar";
import Home from "./page/home/Home";
import Createcamp from "./page/createcamp/Createcamp";
import CreateRegiment from "./page/regimentManagenent/createReginent/CreateRegiment";
import BranchDetermination from "./page/branceManagement/branchDetermination/BranchDetermination";
import BranceList from "./page/branceManagement/branceList/BranceList";
import Camplist from "./page/campdetails/Camplist/Camplist";
import EntranceCampDetalse from "./page/campdetails/entranceCampDetalse/EntranceCampDetalse";
import AllDeligateList from "./page/campdetails/allDeligateList/AllDeligateList";
import Branchwisedelegate from "./page/campdetails/Branchwisedelegate/Branchwisedelegate";
import RegimentWisedList from "./page/campdetails/regimentWisedList/RegimentWisedList";
import EknojoreRegimentInfo from "./page/campdetails/eknojoreRegimentInfo/EknojoreRegimentInfo";
import SingleRegimentList from "./page/campdetails/eknojoreRegimentInfo/SingleRegimentList";
import DelegateRegistration from "./page/campdetails/delegateRegistration/DelegateRegistration";
import { UseAdminAuthFirebase } from "./context/superAdminAuth";
import Login from "./page/joinAdmin/Login";
import AdminProfile from "./page/adminProfile/AdminProfile";
import InfoUpdateAndCreate from "./page/InfoUpdateCreate/InfoUpdateAndCreate";
import EknojorebranchwisedInfo from "./page/campdetails/eknojorebranchwisedInfo/EknojorebranchwisedInfo";
import DetalseDeligetInfo from "./page/campdetails/DetalseDeligetInfo/DetalseDeligetInfo";
import UpdateDeligat from "./page/campdetails/DetalseDeligetInfo/UpdateDeligate";
import Search from "./page/campdetails/searchDelihate/Search";
import BrancewisedList from "./page/campdetails/Branchwisedelegate/BrancewisedList";
import SeniorAdmin from "./page/seniorAdmin/SeniorAdmin";
import OrganizersList from "./page/campdetails/Organizers/OrganizersList";
import BranchwisedOrganizeres from "./page/campdetails/Organizers/BranchwisedOrganizeres";
import RegimrntwisedOrganizeres from "./page/campdetails/Organizers/RegimrntwisedOrganizeres";
import DetalseSinAdmin from "./page/seniorAdmin/DetalseSinAdmin";
import RegimentPassword from "./page/AllPassword/RegimentPassword";
import BrancePassword from "./page/AllPassword/BrancePassword";
import PasswordEntry from "./page/AllPassword/PasswordEntry";
import DelegateAnalysis from "./page/campdetails/DelegateAnalysis/DelegateAnalysis";
import CertificateEntrance from "./page/campdetails/certificate/CertificateEntrance";
import OrganizersCertificate from "./page/campdetails/certificate/OrganizersCertificate";
import DelegetCertificate from "./page/campdetails/certificate/DelegetCertificate";
import SliceDeleget from "./page/campdetails/DelegateAnalysis/SliceDeleget";
import AnalysisChart from "./page/campdetails/DelegateAnalysis/AnalysisChart";
import DelegetCodePrint from "./page/campdetails/delegetCodePrint/DelegetCodePrint";
import DetalseDelegetCode from "./page/campdetails/delegetCodePrint/DetalseDelegetCode";
import AllListDeleget from './page/campdetails/eknojorePurnoTotho/AllListDeleget';
import EknojorepurnoTotho from "./page/campdetails/eknojorePurnoTotho/EknojorepurnoTotho";
import AllOrganizere from "./page/campdetails/eknojorePurnoTotho/AllOrganizere";


const App = () => {
  const firebase = UseAdminAuthFirebase();

  const isLoggedIn = localStorage.getItem("admin") ? true : false;

  return (
    <>
      {isLoggedIn ? (
        <>
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/createcamp" element={<Createcamp />} />
            <Route path="/createregiment" element={<CreateRegiment />} />
            <Route
              path="/branchDetermination"
              element={<BranchDetermination />}
            />

            <Route path="/brancelist" element={<BranceList />} />

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
            <Route path="/delegateAnalysis" element={<DelegateAnalysis />} />
            <Route path="/analysisChart" element={<AnalysisChart />} />

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

            <Route
              path="/delegateRegistration"
              element={<DelegateRegistration />}
            />
            <Route path="/detalseDeligetInfo" element={<DetalseDeligetInfo />} />
            <Route path="/detalseDeligetInfo/updateDeligat" element={<UpdateDeligat />} />
            <Route path="/search" element={<Search />} />
            
            <Route path="/profile" element={<AdminProfile />} />
            <Route path="/seniorAdmin" element={<SeniorAdmin />} />
            <Route path="/detalseSinAdminData" element={<DetalseSinAdmin />} />

            <Route path="/delegetcodeprint" element={<DelegetCodePrint />} />
            <Route path="/delegetcodeprint/:branceName" element={<DetalseDelegetCode />} />
            {/* /delegetcodeprint */}

            <Route path="/passwordentry" element={<PasswordEntry />} />
            <Route path="/regimentPassword" element={<RegimentPassword />} />
            <Route path="/brancePassword" element={<BrancePassword />} />


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
