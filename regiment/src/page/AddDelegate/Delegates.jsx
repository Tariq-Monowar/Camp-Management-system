import { useEffect, useState } from "react";
import "./Delegates.css";
import { IoClose } from "react-icons/io5";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { IoReloadCircleSharp } from "react-icons/io5";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { RegimentFirebase } from "../../context/RegimentContext";
import add from "../../assets/add.png";
import success from "../../assets/success.png";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Delegates = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const campFirebase = RegimentFirebase();
  const regimentName = JSON.parse(localStorage.getItem("authtoken"))?.regimentName;
  const [allDeligateList, setAllDeligateList] = useState([]);
  const [delegetForSearch, setDelegetForSearch] = useState(null);
  const [activeUpdateCode, setActiveUpdateCode] = useState(false);
  const [forceByUpdate, setForceByUpdate] = useState(false);

  const [currentDelegetData, setCurrentDelegetData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMore, setshowMore] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setshowMore(false);
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
        const data = await campFirebase.delegetData;
        setAllDeligateList(data);
      } catch (error) {
        console.error("Error fetching regiments:", error.message);
      }
    };

    getAllData();
  }, [campFirebase, forceByUpdate]);
  console.log(delegetForSearch);

  const detalseDataSee = (id) => {
    localStorage.setItem("goToDetalseInfo", id);

    navigate("/detalseDelegetInfo");
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

  const addDelegetInReg = (e) => {
    setCurrentDelegetData(e);
    setOpen(true);
  };

  const assignDelegate = async () => {
    try {
      setLoading(true);
      await campFirebase.assignDelegate(currentDelegetData.id);
      setForceByUpdate(!forceByUpdate);
      console.log("success...");
      setLoading(false);
      setshowMore(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  console.log(currentDelegetData);
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
                  <div className="delegetData">
                    <apan className="fullName">{data.fullNameBangla}</apan>
                    <span className="branceName">{data.brance}</span>
                    {data.regiment && (
                      <span className="regNameds">{data.regiment}</span>
                    )}

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

                    <span className="delgCode">
                      44.24.{String(data.delegatId).padStart(4, "0")}
                    </span>
                    {data?.isHedeleget === "true" ? (
                      <span className="delSongThok">ডেলিগেট</span>
                    ) : (
                      <span className="delSongThok">সংঠক</span>
                    )}
                    {!data?.regiment && (
                      <button
                        onClick={() => addDelegetInReg(data)}
                        className="DelegetAsinge"
                      >
                        রেজিমেন্ট সংযুক্ত করুন
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        <>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle
              sx={{
                marginBottom: "-20px",
                fontWeight: "bold",
              }}
              id="customized-dialog-title"
            >
              <IoClose
                style={{ marginRight: "auto" }}
                className="closeIcons"
                onClick={handleClose}
              />
            </DialogTitle>
            <div className="asseing">
              {showMore ? (
                <>
                  <img
                    style={{ marginBottom: "10px" }}
                    className="addIcon"
                    src={success}
                    alt=""
                  />
                  <p>রেজিমেন্ট সংযুক্তি সফল হয়েছে</p>
                  <button onClick={handleClose} className="addthisRegiment">
                    আরো সংযুক্ত করুন
                  </button>
                </>
              ) : (
                <>
                  <img className="addIcon" src={add} alt="" />
                  <p>{currentDelegetData?.fullNameBangla}</p>
                  <button onClick={assignDelegate} className="addthisRegiment">
                    {loading ? (
                      <Box
                        sx={{
                          marginBottom: "-3px",
                        }}
                      >
                        <CircularProgress size={25} color="inherit" />
                      </Box>
                    ) : (
                      "রেজিমেন্টে সংযুক্ত করুন"
                    )}
                  </button>
                </>
              )}
            </div>
            ;
          </BootstrapDialog>
        </>
      </div>
    </div>
  );
};

export default Delegates;
