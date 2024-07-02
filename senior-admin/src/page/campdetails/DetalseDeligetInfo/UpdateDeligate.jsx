import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

import { UseCampFirebase } from "../../../context/CampManagement";
import { resizeImage } from "../../../utils/ResizeImage";
import districtNames from "../../../data/DistrictNames";

const UpdateDeligat = () => {
  const navigate = useNavigate();
  const campFirebase = UseCampFirebase();
  const data = campFirebase?.deligateUpdateData;

  // State variables for input fields
  // State variables for input fields
  const [brance, setBrance] = useState(data?.brance || "");
  const [fullNameBangla, setFullNameBangla] = useState(
    data.fullNameBangla || ""
  );
  const [fullNameEnglish, setFullNameEnglish] = useState(
    data.fullNameEnglish || ""
  );
  const [fatherNameBangla, setFatherNameBangla] = useState(
    data.fatherNameBangla || ""
  );
  const [fatherNameEnglish, setFatherNameEnglish] = useState(
    data?.fatherNameEnglish || ""
  );
  const [motherNameBangla, setMotherNameBangla] = useState(
    data.motherNameBangla || ""
  );
  const [motherNameEnglish, setMotherNameEnglish] = useState(
    data.motherNameBangla || ""
  );
  const [asor, setAsor] = useState(data.asor || "");
  const [school, setSchool] = useState(data.school || "");
  const [previousCampNumber, setPreviousCampNumber] = useState(
    data.previousCampNumber || ""
  );
  const [address, setAddress] = useState(data.address || "");
  const [regiment, setRegiment] = useState(data.regiment || "");
  const [mobileNumber, setMobileNumber] = useState(data.mobileNumber || "");
  const [classValue, setClassValue] = useState(data.classValue || "");
  const [district, setDistrict] = useState(data.district || "");
  const [joiningDate, setJoiningDate] = useState(data.joiningDate || "");
  const [code, setCode] = useState(data.code || "");
  const [year, setYear] = useState(data.year || "");
  const [selectImage, setSelectImage] = useState(null);
  const [organizationalvalues, setOrganizationalvalues] = useState(
    data.organizationalvalues || ""
  );
  const [isHedeleget, setIsHedeleget] = useState(data.isHedeleget || null);
  const [senOrganizationalvalues, setSenOrganizationalvalues] = useState(data.senOrganizationalvalues|| "");
  const [senValueDate, setSenValueDate] = useState(data.senValueDate  || "");
  const [comment, setComment] = useState(data.comment || "")

  const [regimentData, setRegimentData] = useState([]);
  const [branceData, setBranceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resizeImageData, setResizeImageData] = useState(null);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const data = await campFirebase.allRegimentData;
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
        const data = await campFirebase.branches;
        setBranceData(data);
      } catch (error) {
        console.error("Error fetching regiments:", error.message);
      }
    };

    getAllData();
  }, [campFirebase]);

  const updateDelegated = async (e) => {
    e.preventDefault();

    try {
      let imageData;

      if (selectImage) {
        imageData = await resizeImage(selectImage, 280, 280);
      }

      setLoading(true);

      const result = await campFirebase.updateDelegate(
        data.id,
        brance,
        fullNameBangla,
        fullNameEnglish,
        motherNameBangla,
        motherNameBangla,
        fatherNameBangla,
        fatherNameEnglish,
        asor,
        school,
        regiment,
        mobileNumber,
        classValue,
        district,
        joiningDate,
        code,
        organizationalvalues,
        year,
        isHedeleget,
        senOrganizationalvalues,
        senValueDate,
        comment,
        imageData,
        data.selectImage // Pass the resized image data here
      );

      setLoading(false);
      console.log(result);
      campFirebase.setForceByUpdate(!campFirebase.forceByUpdate)
      navigate(-1);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  //   console.log(campFirebase.deligateUpdateData)

  //   setDeligateUpdateData,
  //   deligateUpdateData
  return (
    <div className="delegateRegContainer">
      <h1 className="regTitle">ব্যক্তিগত তথ্য ফরম</h1>
      <form onSubmit={updateDelegated} className="regForm">
        <div className="userdatacontent">
          <div className="regLest">
            <div>
              <span>শাখা</span>
              <select
                value={brance}
                onChange={(e) => setBrance(e.target.value)}
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
            </div>

            <div>
              <span>পূর্ণ নাম (বাংলা)</span>
              <input
                type="text"
                value={fullNameBangla}
                onChange={(e) => setFullNameBangla(e.target.value)}
                placeholder="নাম"
                name=""
                id=""
              />
            </div>

            <div>
              <span>পূর্ণ নাম (ইংরেজি)</span>
              <input
                type="text"
                value={fullNameEnglish}
                onChange={(e) => setFullNameEnglish(e.target.value)}
                placeholder="নাম"
                name=""
                id=""
              />
            </div>

            <div>
              <span>পিতার নাম (বাংলা)</span>
              <input
                type="text"
                value={fatherNameBangla}
                onChange={(e) => setFatherNameBangla(e.target.value)}
                placeholder="নাম"
                name=""
                id=""
              />
            </div>

            <div>
              <span>পিতার নাম (ইংরেজি)</span>
              <input
                type="text"
                value={fatherNameEnglish}
                onChange={(e) => setFatherNameEnglish(e.target.value)}
                placeholder="নাম"
                name=""
                id=""
              />
            </div>

            <div>
              <span>মাতার নাম (বাংলা)</span>
              <input
                type="text"
                value={motherNameBangla}
                onChange={(e) => setMotherNameBangla(e.target.value)}
                placeholder="নাম"
                name=""
                id=""
              />
            </div>

            <div>
              <span>মাতার নাম (ইংরেজি)</span>
              <input
                type="text"
                value={motherNameEnglish}
                onChange={(e) => setMotherNameEnglish(e.target.value)}
                placeholder="নাম"
                name=""
                id=""
              />
            </div>

            <div>
              <span>আসরের নাম</span>
              <input
                type="text"
                value={asor}
                onChange={(e) => setAsor(e.target.value)}
                placeholder="আসর"
                name=""
                id=""
              />
            </div>

            <div>
              <span>স্কুল</span>
              <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="স্কুল"
                name=""
                id=""
              />
            </div>

            <div>
              <span>শ্রেণী</span>
              <input
                type="text"
                value={classValue}
                onChange={(e) => setClassValue(e.target.value)}
                placeholder="শ্রেণী"
                name=""
                id=""
              />
            </div>

            <div>
              <span>ঠিকানা</span>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="ঠিকানা"
                name=""
                id=""
              />
            </div>
          </div>

          <div className="regRight">
            <div>
              <span>রেজিমেন্ট</span>
              <select
                value={regiment}
                onChange={(e) => setRegiment(e.target.value)}
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
            </div>


            <div>
              <span>সাংগঠনিক মান</span>
              <select
                value={senOrganizationalvalues}
                onChange={(e) => setSenOrganizationalvalues(e.target.value)}
              >
                <option value="" disabled hidden>
                  সুবাসিত/ বিকশিত/ ধীমান
                </option>
                <option value="সুবাসিত">সুবাসিত</option>
                <option value="বিকশিত">বিকশিত</option>
                <option value="ধীমান">ধীমান</option>
                <option value="অভিযাত্রী">অভিযাত্রী</option>
                <option value="প্রযোজ্য নয়">প্রযোজ্য নয়</option>
              </select>
            </div>

            <div>
              <span>
                {senOrganizationalvalues &&
                  (senOrganizationalvalues === "সুবাসিত"
                    ? "সুবাসিত হওয়ার তারিখ"
                    : senOrganizationalvalues === "বিকশিত"
                    ? "বিকশিত হওয়ার তারিখ"
                    : senOrganizationalvalues === "ধীমান"
                    ? "ধীমান হওয়ার তারিখ"
                    : senOrganizationalvalues === "অভিযাত্রী"
                    ? "অভিযাত্রী হওয়ার তারিখ"
                    : "তারিখ")}
                {!senOrganizationalvalues && "তারিখ"}
              </span>
              <input
                type="date"
                value={senValueDate}
                onChange={(e) => setSenValueDate(e.target.value)}
                name=""
                id=""
              />
            </div>



            <div>
              <span>মোবাইল নাম্বার</span>
              <input
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="মোবাইল নাম্বার"
                name=""
                id=""
              />
            </div>

            <div>
              <span>পূর্বের ক্যাম্পের সংখ্যা</span>
              <input
                type="number"
                value={previousCampNumber}
                onChange={(e) => setPreviousCampNumber(e.target.value)}
                placeholder="পূর্বের ক্যাম্পের সংখ্যা"
                name=""
                id=""
              />
            </div>

            <div>
              <span>জন্ম তারিখ</span>
              <input
                type="date"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="শ্রেণী"
                name=""
                id=""
              />
            </div>

            <div>
              <span>নিজ জেলা</span>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
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
              <span>সাংগঠনিক মান</span>
              <select
                value={organizationalvalues}
                onChange={(e) => setOrganizationalvalues(e.target.value)}
              >
                <option value="" disabled hidden>
                  সাংগঠনিক মান
                </option>
                <option value="চৌকস">চৌকস</option>
                <option value="অগ্রপথিক">অগ্রপথিক</option>
                <option value="প্রযোজ্য নয়">প্রযোজ্য নয়</option>
              </select>
            </div>

            <div>
              <span>
                {organizationalvalues && organizationalvalues === "চৌকস"
                  ? "চৌকস হওয়ার তারিখ"
                  :organizationalvalues === "অগ্রপথিক"? "অগ্রপথিক হওয়ার তারিখ": "তারিখ প্রযোজ্য নয়"}
              </span>
              <input
                type="date"
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
                placeholder="চৌকস হওয়ার তারিখ"
                name=""
                id=""
              />
            </div>

            <div>
              <span>
                {organizationalvalues && organizationalvalues === "চৌকস"
                  ? "চৌকস কোড"
                  : organizationalvalues === "অগ্রপথিক" ? "অগ্রপথিক কোড": "কোড প্রযোজ্য নয়"}
              </span>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="শ্রেণী"
                name=""
                id=""
              />
            </div>

            <div>
              <span>আপনার ক্যাটাগরি নির্বাচন করুন*</span>
              <select
                value={isHedeleget}
                onChange={(e) => setIsHedeleget(e.target.value)}
              >
                <option value="">নির্বাচন করুন</option>
                <option value={true}>ডেলিগেট</option>
                <option value={false}>সংগঠক</option>
              </select>
            </div>
          </div>
        </div>

        <div className="comments">
          <span>মন্তব্য লিখুন*</span>
          <br />
          <textarea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder="মন্তব্য...."
          ></textarea>
        </div>

        <div className="selectImage">
          <div className="updateImaged">
            <input
              type="file"
              onChange={(e) => setSelectImage(e.target.files[0])}
              accept="image/*"
              className="custom-file-input"
            />
          </div>
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
          <button className="deligetSubmitBtn" type="submit">
            {loading ? (
              <Box
                sx={{
                  // width: "10px",
                  // marginLeft: "78px",
                  marginBottom: "-3px",
                  marginTop: "-3px",
                }}
              >
                <CircularProgress size={25} color="inherit" />
              </Box>
            ) : (
              "আপডেট করুন"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateDeligat;
