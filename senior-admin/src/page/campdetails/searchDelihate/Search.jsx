import { useEffect, useState } from "react";
import "./search.css";

import { IoReloadCircleSharp } from "react-icons/io5";
import { UseCampFirebase } from "../../../context/CampManagement";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const campFirebase = UseCampFirebase();
  const [allDeligateList, setAllDeligateList] = useState([]);
  const [delegetForSearch, setDelegetForSearch] = useState(null);
  const [activeUpdateCode, setActiveUpdateCode] = useState(false);
  const [forceByUpdate, setForceByUpdate] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (allDeligateList) {
      setDelegetForSearch(allDeligateList);
    }
  }, [allDeligateList]);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const data = await campFirebase.deleget_Data;
        data.sort((a, b) => a.delegatId - b.delegatId);
        setAllDeligateList(data);
      } catch (error) {
        console.error("Error fetching regiments:", error.message);
      }
    };

    getAllData();
  }, [campFirebase, forceByUpdate]);

  const codeUpdate = async (id) => {
    const updataId = window.confirm("আপনি ডেলিগেট কোড আপডেট করতে চান?");
    if (updataId) {
      try {
        setActiveUpdateCode(id); // Set the active state for the specific delegate
        console.log(id);
        const result = await campFirebase.updateDelegateDelegatId(id);
        if (result) {
          campFirebase.setForceByUpdate(!campFirebase.forceByUpdate)
        }
        console.log(result);
        setActiveUpdateCode(null); // Reset the active state after the update
      } catch (error) {
        alert("আপডেট করার সময় ত্রুটি হয়েছে!");
      }
    }
  };

  const detalseDataSee = (id) => {
    localStorage.setItem("goToDetalseInfo", id);

    navigate("/detalseDeligetInfo");
  };

  const searchData = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    console.log(value);
    const filteredDelegates = allDeligateList.filter((x) => {
      var delegateId = String(x.delegatId);
      return delegateId.includes(value);
    });
    setDelegetForSearch(filteredDelegates);
  };

  const delegetPresrnt = async (id, present) => {
    console.log(id, present);
    try {
      const result = await campFirebase.updateDelegatePresent(id, present);
      if (result) {
        setForceByUpdate(!forceByUpdate);
        console.log(result);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
      alert("আপডেট করার সময় ত্রুটি হয়েছে!");
    }
  };

  return (
    <div className="searchContainer">
      <div className="aleing">
        <p className="titleforSearrch">অনুসন্ধান</p>
        <p className="descForSearch">ডেলিগেট কোড দিয়ে অনুসন্ধান করুন</p>
        <div id="search">
          <svg viewBox="0 0 420 60" xmlns="http://www.w3.org/2000/svg">
            <rect class="bar" />

            <g class="magnifier">
              <circle class="glass" />
              <line class="handle" x1="32" y1="32" x2="44" y2="44"></line>
            </g>

            <g class="sparks">
              <circle class="spark" />
              <circle class="spark" />
              <circle class="spark" />
            </g>

            <g class="burst pattern-one">
              <circle class="particle circle" />
              <path class="particle triangle" />
              <circle class="particle circle" />
              <path class="particle plus" />
              <rect class="particle rect" />
              <path class="particle triangle" />
            </g>
            <g class="burst pattern-two">
              <path class="particle plus" />
              <circle class="particle circle" />
              <path class="particle triangle" />
              <rect class="particle rect" />
              <circle class="particle circle" />
              <path class="particle plus" />
            </g>
            <g class="burst pattern-three">
              <circle class="particle circle" />
              <rect class="particle rect" />
              <path class="particle plus" />
              <path class="particle triangle" />
              <rect class="particle rect" />
              <path class="particle plus" />
            </g>
          </svg>
          <input onChange={searchData} type="search" aria-label="অনুসন্ধান" />
        </div>
      </div>
      <div className="result">
        {delegetForSearch &&
          delegetForSearch.map((data) => {
            return (
              <div key={data.id} className="deligetCard">
                <div className="delegetName">
                  <div
                    onClick={() => detalseDataSee(data.id)}
                    style={{ backgroundImage: `url(${data.selectImage})` }}
                    className="deligetImage"
                  ></div>
                  <p>{data.fullNameBangla}</p>
                </div>
                <p className="BranceNameSearch">{data.brance}</p>
                {
                  <p className="ragimentNames">
                    {data.regiment
                      ? `${data.regiment}`
                      : "রেজিমেন্ট এসাইন করা হয়নি"}
                  </p>
                  // data.regiment?<p>{data.regiment}</p>:<p>রেজিমেন্ট এসাইন করা হয়নি</p>
                }
                {/* <p>{data.regiment}</p> */}
                <div className="class">
                  <span>{data.classValue}</span>
                </div>
                <div className="orgValue">
                  <span>
                    {" "}
                    <span>
                      {data.organizationalvalues !== "প্রযোজ্য নয়" &&
                        data.organizationalvalues + ", "}
                    </span>
                    {data.senOrganizationalvalues !== "প্রযোজ্য নয়" &&
                      data.senOrganizationalvalues}
                  </span>
                </div>
                <div className="deligetCode">
                  <span className="delCode">
                    44.24.{String(data.delegatId).padStart(4, "0")}
                  </span>
                  <span
                    onClick={() => codeUpdate(data.id)}
                    className={
                      activeUpdateCode === data.id
                        ? "updateCodeData activeCodeData"
                        : "updateCodeData"
                    }
                  >
                    {/* activeCodeData */}
                    <IoReloadCircleSharp />
                  </span>
                </div>
                <div className="campPresent">
                  {data?.isHedeleget === "true" ? (
                    <span>ডেলিগেট</span>
                  ) : (
                    <span>সংগঠক</span>
                  )}
                  {/* <span>উপস্থিতি নিশ্চিত করুন</span> */}
                  {/* {data.DelegatePresent ? (
                    <span
                      onClick={() => {
                        delegetPresrnt(data.id, data.DelegatePresent);
                      }}
                    >
                      <img
                        className="delegetPresentClass"
                        src={delegetPresents}
                        alt=""
                      />
                    </span>
                  ) : (
                    <div class="checkbox-wrapper-31">
                      <input
                        type="checkbox"
                        onClick={() => {
                          delegetPresrnt(data.id, data.DelegatePresent);
                        }}
                      />
                      <svg viewBox="0 0 35.6 35.6">
                        <circle
                          class="background"
                          cx="17.8"
                          cy="17.8"
                          r="17.8"
                        ></circle>
                        <circle
                          class="stroke"
                          cx="17.8"
                          cy="17.8"
                          r="14.37"
                        ></circle>
                        <polyline
                          class="check"
                          points="11.78 18.12 15.55 22.23 25.17 12.87"
                        ></polyline>
                      </svg>
                    </div>
                  )} */}
                </div>
              </div>
            );
          })}
      </div>
      <br />
      <br />
    </div>
  );
};

export default Search;

