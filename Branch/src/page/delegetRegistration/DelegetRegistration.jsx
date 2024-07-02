import { useEffect, useState } from "react";
import "./DelegetRegistration.css";

import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

import { MdCloudUpload } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import districtNames from "../../data/DistrictNames";
import branchNames from "../../data/Brance";
import { resizeImage } from "../../utils/ResizeImage";
import { RegimentFirebase } from "../../context/RegimentContext";

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DelegetRegistration = () => {
  const campFirebase = RegimentFirebase();

  const [open, setOpen] = useState(false);

  // State variables for input fields
  const [brance, setBrance] = useState("");
  const [fullNameBangla, setFullNameBangla] = useState("");
  const [fullNameEnglish, setFullNameEnglish] = useState("");
  const [fatherNameBangla, setFatherNameBangla] = useState("");
  const [fatherNameEnglish, setFatherNameEnglish] = useState("");
  const [motherNameBangla, setMotherNameBangla] = useState("");
  const [motherNameEnglish, setMotherNameEnglish] = useState("");
  const [asor, setAsor] = useState("");
  const [school, setSchool] = useState("");
  const [previousCampNumber, setPreviousCampNumber] = useState("");
  const [address, setAddress] = useState("");
  const [regiment, setRegiment] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [classValue, setClassValue] = useState("");
  const [district, setDistrict] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [code, setCode] = useState("");
  const [year, setYear] = useState("");
  const [previousCampCount, setPreviousCampCount] = useState("");
  const [selectImage, setSelectImage] = useState(null);
  const [organizationalvalues, setOrganizationalvalues] = useState("");
  const [senOrganizationalvalues, setSenOrganizationalvalues] = useState("");
  const [senValueDate, setSenValueDate] = useState("");
  const [isHedeleget, setIsHedeleget] = useState("true");
  const [comment, setComment] = useState("");

  const [selectCategory, setselectCategory] = useState(true);

  const [regimentData, setRegimentData] = useState([]);
  const [branceData, setBranceData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [ahowconfetti, setAhowconfetti] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (ahowconfetti) {
      const timeoutId = setTimeout(() => {
        setAhowconfetti(false);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [ahowconfetti]);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const data = await campFirebase.getRegiments();
        setRegimentData(data);
      } catch (error) {
        console.error("Error fetching regiments:", error.message);
      }
    };

    getAllData();
  }, [campFirebase]);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const data = await campFirebase.getBrance();
        setBranceData(data);
      } catch (error) {
        console.error("Error fetching regiments:", error.message);
      }
    };

    getAllData();
  }, [campFirebase]);

  const resetForm = () => {
    setSenOrganizationalvalues("");
    setSenValueDate("");
    setBrance("");
    setFullNameBangla("");
    setFullNameEnglish("");
    setFatherNameBangla("");
    setFatherNameEnglish("");
    setMotherNameBangla("");
    setMotherNameEnglish("");
    setAsor("");
    setSchool("");
    setPreviousCampNumber("");
    setAddress("");
    setRegiment("");
    setMobileNumber("");
    setClassValue("");
    setDistrict("");
    setJoiningDate("");
    setCode("");
    setYear("");
    setPreviousCampCount("");
    setSelectImage(null);
    setOrganizationalvalues("");
    setIsHedeleget(null);
    setselectCategory(null);
    setComment("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let resizedImage;
    if (selectImage) {
      resizedImage = await resizeImage(selectImage, 280, 280);
    } else {
      // Handle the case when no image is selected
      console.log("No image selected");
    }

    try {
      setLoading(true);
      const result = await campFirebase.ctereateDeligate(
        brance,
        fullNameBangla,
        fullNameEnglish,
        fatherNameBangla,
        fatherNameEnglish,
        motherNameBangla,
        motherNameEnglish,
        asor,
        school,
        previousCampNumber,
        address,
        regiment,
        mobileNumber,
        classValue,
        district,
        joiningDate,
        code,
        year,
        previousCampCount,
        organizationalvalues,
        senOrganizationalvalues,
        senValueDate,
        isHedeleget,
        comment,
        resizedImage
      );
      if (result) {
        setLoading(false);
        console.log(result);
        resetForm();
        handleClose();
        setAhowconfetti(true);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  // const registerDelegated = async (e) => {
  //   e.preventDefault();
  //   setOpen(true);
  // };

  // console.log(isHedeleget);
  const handleHeDeleget = () => {
    setselectCategory(!selectCategory);
    selectCategory ? setIsHedeleget("false") : setIsHedeleget("true");
  };
  console.log(selectCategory);
  console.log(isHedeleget);
  return (
    <div className="delegateRegContainer">
      {ahowconfetti && (
        <Fireworks autorun={{ speed: 3 }} style={canvasStyles} />
      )}

      <h1 className="regTitle">ব্যক্তিগত তথ্য ফরম</h1>
      <form onSubmit={handleSubmit} className="regForm">
        <div style={{ textAlign: "center" }} className="selectOrg">
          <span style={{ marginBottom: "10px" }}>
            আপনার ক্যাটাগরি নির্বাচন করুন*
          </span>
          <div className="orgCatagori">
            <span className="titleOrg">
              {selectCategory === null && "নির্বাচন করুন"}{" "}
              {selectCategory !== null
                ? selectCategory
                  ? "ডেলিগেট"
                  : "সংগঠক"
                : ""}
            </span>

            <div class="toggle">
              <input onChange={handleHeDeleget} type="checkbox" id="switch" />
              <label class="delOrOrg" for="switch"></label>
            </div>
          </div>
        </div>

        <div className="userdatacontent">
          <div className="regLest">
            {/* <div>
              <span>শাখা*</span>
              <select
                value={brance}
                onChange={(e) => setBrance(e.target.value)}
                disabled={selectCategory === null}
                required
              >
                <option value="" disabled hidden>
                  শাখা যুক্ত করুন
                </option>
                {branceData &&
                  branceData.map((brance) => (
                    <option key={brance.branceName} value={brance.branceName}>
                      {brance.branceName}
                    </option>
                  ))}
              </select>
            </div> */}

            <div>
              <span>পূর্ণ নাম (বাংলা)*</span>
              <input
                type="text"
                value={fullNameBangla}
                onChange={(e) => setFullNameBangla(e.target.value)}
                placeholder="নাম"
                name=""
                id=""
                required
                disabled={selectCategory === null}
              />
            </div>

            <div>
              <span>পূর্ণ নাম (ইংরেজি)*</span>
              <input
                type="text"
                value={fullNameEnglish}
                onChange={(e) => setFullNameEnglish(e.target.value)}
                placeholder="Name"
                name=""
                id=""
                required
                disabled={selectCategory === null}
              />
            </div>

            <div>
              <span>পিতার নাম (বাংলা)*</span>
              <input
                type="text"
                value={fatherNameBangla}
                onChange={(e) => setFatherNameBangla(e.target.value)}
                placeholder="পিতার নাম"
                name=""
                id=""
                required
                disabled={selectCategory === null}
              />
            </div>

            <div>
              <span>পিতার নাম (ইংরেজি)*</span>
              <input
                type="text"
                value={fatherNameEnglish}
                onChange={(e) => setFatherNameEnglish(e.target.value)}
                placeholder="Father's name"
                name=""
                id=""
                required
                disabled={selectCategory === null}
              />
            </div>

            <div>
              <span>মাতার নাম (বাংলা)*</span>
              <input
                type="text"
                value={motherNameBangla}
                onChange={(e) => setMotherNameBangla(e.target.value)}
                placeholder="মাতার নাম"
                name=""
                id=""
                required
                disabled={selectCategory === null}
              />
            </div>

            <div>
              <span>মাতার নাম (ইংরেজি)*</span>
              <input
                type="text"
                value={motherNameEnglish}
                onChange={(e) => setMotherNameEnglish(e.target.value)}
                placeholder="Mother's name"
                name=""
                id=""
                required
                disabled={selectCategory === null}
              />
            </div>

            <div>
              <span>{isHedeleget === "false"?"সাংগঠনিক দায়িত্ব*":"আসরের নাম*"}</span>
              <input
                type="text"
                value={asor}
                onChange={(e) => setAsor(e.target.value)}
                placeholder={isHedeleget === "false"?"সাংগঠনিক দায়িত্ব":"আসরের নাম"}
                name=""
                id=""
                required
                disabled={selectCategory === null}
              />
            </div>

            <div>
              <span>শিক্ষা প্রতিষ্ঠান*</span>
              <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="শিক্ষা প্রতিষ্ঠান"
                name=""
                id=""
                required
                disabled={selectCategory === null}
              />
            </div>
            <div>
              <span>শ্রেণি*</span>
              <select
                value={classValue}
                onChange={(e) => setClassValue(e.target.value)}
                required
                disabled={selectCategory === null}
              >
                <option value="" disabled hidden>
                  শ্রেণি
                </option>
                <option value="১ম">১ম</option>
                <option value="২য়">২য়</option>
                <option value="৩য়">৩য়</option>
                <option value="৪র্থ">৪র্থ</option>
                <option value="৫ম">৫ম</option>
                <option value="৬ষ্ঠ">৬ষ্ঠ</option>
                <option value="৭ম">৭ম</option>
                <option value="৮ম">৮ম</option>
                <option value="নবম/সমমান">নবম/সমমান</option>
                <option value="দশম/সমমান">দশম/সমমান</option>
                <option value="একাদশ/সমমান">একাদশ/সমমান</option>
                <option value="দ্বাদশ/সমমান">দ্বাদশ/সমমান</option>
                <option value="অনার্স ১ম বর্ষ/সমমান">
                  অনার্স ১ম বর্ষ/সমমান
                </option>
                <option value="অনার্স ২য় বর্ষ/সমমান">
                  অনার্স ২য় বর্ষ/সমমান
                </option>
                <option value="অনার্স ৩য় বর্ষ/সমমান">
                  অনার্স ৩য় বর্ষ/সমমান
                </option>
                <option value="অনার্স ৪র্থ বর্ষ/সমমান">
                  অনার্স ৪র্থ বর্ষ/সমমান
                </option>
                <option value="মাষ্টার্স/সমমান">মাষ্টার্স/সমমান</option>
              </select>
            </div>

            <div>
              <span>ঠিকানা*</span>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="ঠিকানা"
                name=""
                id=""
                required
                disabled={selectCategory === null}
              />
            </div>
          </div>
          <div className="regRight">
            {/* <div>
              <span>রেজিমেন্ট</span>
              <select
                value={regiment}
                onChange={(e) => setRegiment(e.target.value)}
                disabled={selectCategory === null}
              >
                <option value="" disabled hidden>
                  রেজিমেন্ট যুক্ত করুন
                </option>
                {regimentData &&
                  regimentData.map((reg) => (
                    <option key={reg.regimentName} value={reg.regimentName}>
                      {reg.regimentName}
                    </option>
                  ))}
              </select>
            </div> */}

            <div>
              <span>মোবাইল নম্বর*</span>
              <input
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="মোবাইল নম্বর"
                name=""
                id=""
                required
                disabled={selectCategory === null}
              />
            </div>

            <div>
              <span>
                {selectCategory === false ? "সাংগঠনিক মান*" : "সাংগঠনিক মান"}
              </span>
              <select
                value={senOrganizationalvalues}
                onChange={(e) => setSenOrganizationalvalues(e.target.value)}
                disabled={selectCategory === null}
              >
                <option value="" disabled hidden>
                  {
                    isHedeleget === "true"?"সুবাসিত/ বিকশিত/ ধীমান":"ধীমান/ অভিযাত্রী"
                  }
                
                  
                </option>
                {isHedeleget === "true" && (
                  <>
                    <option value="সুবাসিত">সুবাসিত</option>
                    <option value="বিকশিত">বিকশিত</option>
                  </>
                )}

                <option value="ধীমান">ধীমান</option>
                <option value="অভিযাত্রী">অভিযাত্রী</option>
                {isHedeleget === "true" && (
                  <option value="প্রযোজ্য নয়">প্রযোজ্য নয়</option>
                )}
              </select>
            </div>

            <div>
              <span>
                {senOrganizationalvalues &&
                  (senOrganizationalvalues === "সুবাসিত"
                    ? "সুবাসিত হওয়ার তারিখ*"
                    : senOrganizationalvalues === "বিকশিত"
                    ? "বিকশিত হওয়ার তারিখ*"
                    : senOrganizationalvalues === "ধীমান"
                    ? "ধীমান হওয়ার তারিখ*"
                    : senOrganizationalvalues === "অভিযাত্রী"
                    ? "অভিযাত্রী হওয়ার তারিখ*"
                    : "তারিখ")}
                {!senOrganizationalvalues && "তারিখ"}
              </span>
              <input
                type="date"
                value={senValueDate}
                onChange={(e) => setSenValueDate(e.target.value)}
                name=""
                id=""
                placeholder="mm/dd/yyyy"
                required={
                  senOrganizationalvalues !== "প্রযোজ্য নয়" ||
                  selectCategory === false
                }
                disabled={
                  senOrganizationalvalues === "প্রযোজ্য নয়" ||
                  selectCategory === null ||
                  senOrganizationalvalues === ""
                }
              />
            </div>

            {/* <div>
              <span>পূর্বের ক্যাম্প সংখ্যা*</span>
              <input
                style={{ fontFamily: "normal" }}
                type="number"
                value={previousCampNumber}
                onChange={(e) => setPreviousCampNumber(e.target.value)}
                placeholder="পূর্বের ক্যাম্প সংখ্যা"
                name=""
                id=""
                required
                disabled={selectCategory === null}
              />
            </div> */}
            <div>
              <span>পূর্বের ক্যাম্প সংখ্যা*</span>
              <select
                value={previousCampNumber}
                onChange={(e) => setPreviousCampNumber(e.target.value)}
                disabled={selectCategory === null}
                required
              >
                <option value="" disabled hidden>
                  পূর্বের ক্যাম্প সংখ্যা
                </option>
                <option value="০টি">০ টি</option>
                <option value="১টি">১ টি</option>
                <option value="২টি">২ টি</option>
                <option value="৩টি">৩ টি</option>
                <option value="৪টি">৪ টি</option>
                <option value="৫টি">৫ টি</option>
                <option value="৬টি">৬ টি</option>
              </select>
            </div>

            <div>
              <span>জন্ম তারিখ*</span>
              <input
                type="date"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="mm/dd/yyyy"
                name=""
                id=""
                required
                // disabled={selectCategory === null}
              />
            </div>

            <div>
              <span>নিজ জেলা*</span>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
                disabled={selectCategory === null}
              >
                <option value="">জেলা</option>
                {districtNames.map((names) => (
                  <option key={names.id} value={names.bn_name}>
                    {names.bn_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span>সাংগঠনিক মান*</span>
              <select
                value={organizationalvalues}
                onChange={(e) => setOrganizationalvalues(e.target.value)}
                required
                disabled={selectCategory === null || isHedeleget === "false"}
              >
                <option value="" disabled hidden>
                  সাংগঠনিক মান
                </option>
                <option value="চৌকস">চৌকস</option>
                <option value="অগ্রপথিক">অগ্রপথিক</option>
               
              </select>
            </div>

            <div>
              <span>
                {organizationalvalues && organizationalvalues === "চৌকস"
                  ? "চৌকস হওয়ার তারিখ*"
                  : organizationalvalues === "অগ্রপথিক"
                  ? "অগ্রপথিক হওয়ার তারিখ*"
                  : "তারিখ"}
              </span>
              <input
                type="date"
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
                placeholder="mm/dd/yyyy"
                required
                disabled={
                  organizationalvalues === "প্রযোজ্য নয়" ||
                  selectCategory === null ||
                  isHedeleget === "false" ||
                  organizationalvalues === ""
                }
              />
            </div>

            <div>
              <span>
                {organizationalvalues && organizationalvalues === "চৌকস"
                  ? "চৌকস কোড*"
                  : organizationalvalues === "অগ্রপথিক"
                  ? "অগ্রপথিক কোড*"
                  : "কোড"}
              </span>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="কোড"
                name=""
                id=""
                required
                disabled={
                  selectCategory === null ||
                  isHedeleget === "false" ||
                  organizationalvalues === ""
                }
              />
            </div>

            <div>
              <span>ছবি</span>
              <input
                type="file"
                onChange={(e) => setSelectImage(e.target.files[0])}
                placeholder=""
                accept="image/*"
                className="custom-file-input"
                disabled={selectCategory === null}
              />
            </div>
          </div>
        </div>

        <div className="comment">
          <span>মন্তব্য লিখুন</span>
          <br />
          <textarea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            disabled={selectCategory === null}
            placeholder="মন্তব্য...."
          ></textarea>
        </div>

        <div className="selectImage">
          {selectImage && (
            <div className="uploadeShow">
              <span onClick={() => setSelectImage(null)} className="crosImage">
                <IoClose className="crosImageIcon" />
              </span>
              <img
                className="selectadeImage"
                src={URL.createObjectURL(selectImage)}
                alt={selectImage.name}
              />
            </div>
          )}

          {selectCategory !== null && (
            <button
              style={{ width: "260px", marginBottom: "70px" }}
              className="deligetSubmitBtn"
              type="submit"
            >
              {loading ? (
                <Box
                  sx={{
                    marginBottom: "-4px",
                    marginTop: "-1px",
                  }}
                >
                  <CircularProgress size={25} color="inherit" />
                </Box>
              ) : (
                "রেজিস্ট্রেশন করুন"
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DelegetRegistration;
