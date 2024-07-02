import { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import "./allDelegetList.css";
import { RegimentFirebase } from "../../context/RegimentContext";
import defaultImage from "../../assets/avator.jpg";

const DetalseDeligetInfo = () => {
  const campFirebase = RegimentFirebase();
  const navigate = useNavigate();
  const [forceByUpdate, setForceByUpdate] = useState(false);
  const [delegateData, setDelegateData] = useState(null);

  //Cobvert To bangla
  function convertDateToBangla(inputDate) {
    const banglaMonths = [
      'জানুয়ারি',
      'ফেব্রুয়ারি',
      'মার্চ',
      'এপ্রিল',
      'মে',
      'জুন',
      'জুলাই',
      'আগস্ট',
      'সেপ্টেম্বর',
      'অক্টোবর',
      'নভেম্বর',
      'ডিসেম্বর'
    ];

    const parts = inputDate.split('-');
    const year = parts[0];
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    const banglaDay = convertToBanglaNumber(day);
    const banglaYear = convertToBanglaNumber(year);
    const banglaMonth = banglaMonths[month - 1];

    return `${banglaDay} ${banglaMonth} ${banglaYear}`;
  }

  function convertToBanglaNumber(number) {
    const banglaNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

    return number
      .toString()
      .split('')
      .map((digit) => banglaNumbers[parseInt(digit, 10)])
      .join('');
  }

  useEffect(() => {
    const getAllData = async () => {
      try {
        const data = await campFirebase.getDelegateById();
        setDelegateData(data);
      } catch (error) {
        console.error("Error fetching delegate data:", error.message);
      }
    };

    getAllData();
  }, [campFirebase, forceByUpdate]);

  const updateData = () => {
    campFirebase.setDeligateUpdateData(delegateData);
    navigate("/detalseDeligetInfo/updateDeligat");
  };

  const deleteDelegetData = async () => {
    const userConfirmed = window.confirm("আপনি এই ডেলিগেট মুছে ফেলতে চান?");
    if (userConfirmed) {
      try {
        const data = await campFirebase.deleteDeligate(
          delegateData.id,
          delegateData.selectImage
        );
        setForceByUpdate(!forceByUpdate);
        console.log(data);
        navigate(-1);
      } catch (error) {
        console.error("Error deleting regiment:", error);
      }
    } else {
      console.log("Deletion canceled by user");
    }
  };

  return (
    <div className="delegetDetalseInfo">
      <div className="kuriImage">
        {delegateData && delegateData.selectImage ? (
          <img src={delegateData.selectImage} alt="" />
        ) : (
          <img src={defaultImage} alt="" />
        )}
      </div>
      {delegateData && (
        <div className="deligetAllData">
          <div className="detalseDev">
            <div>
              <span>পূর্ণ নাম (বাংলা)</span>
              <p>{delegateData.fullNameBangla}</p>
            </div>
            <div>
              <span>ডেলিগেট আইডি</span>
              <p>44.24.{String(delegateData.delegatId).padStart(4, "0")}</p>
            </div>
            <div>
              <span>পূর্ণ নাম (ইংরেজি)</span>
              <p>{delegateData.fullNameEnglish}</p>
            </div>
            <div>
              <span>পিতার নাম (বাংলা)</span>
              <p>{delegateData.fatherNameBangla}</p>
            </div>
            <div>
              <span>পিতার নাম (ইংরেজি)</span>
              <p>{delegateData.fatherNameEnglish}</p>
            </div>
            <div>
              <span>মাতার নাম (বাংলা)</span>
              <p>{delegateData.motherNameBangla}</p>
            </div>
            <div>
              <span>মাতার নাম (ইংরেজি)</span>
              <p>{delegateData.motherNameEnglish}</p>
            </div>
            <div>
              <span>{delegateData.isHedeleget === "false"?"সাংগঠনিক দায়িত্ব":"আসরের নাম"}</span>
              <p>{delegateData.asor}</p>
            </div>
            <div>
              <span>শিক্ষা প্রতিষ্ঠান</span>
              <p>{delegateData.school}</p>
            </div>
            <div>
              <span>পূর্বের ক্যাম্প সংখ্যা</span>
              <p>{delegateData.previousCampNumber}</p>
            </div>

            <div>
              <span>জন্ম তারিখ</span>
              <p>{convertDateToBangla(delegateData.year)}</p>
            </div>
            {/* Add more fields as needed */}
          </div>
          <div className="detalseDev divleftdet">
            <div>
              <span>শাখা</span>
              <p>{delegateData.brance}</p>
            </div>
            <div>
              <span>রেজিমেন্ট</span>
              <p>{delegateData.regiment}</p>
            </div>
            <div>
              <span>মোবাইল নাম্বার</span>
              <p>{delegateData.mobileNumber}</p>
            </div>
            <div>
              <span>শ্রেণি</span>
              <p>{delegateData.classValue}</p>
            </div>
            <div>
              <span>নিজ জেলা</span>
              <p>{delegateData.district}</p>
            </div>
            <div>
              <span>ঠিকানা</span>
              <p>{delegateData.address}</p>
            </div>
            <div>
              <span>সাংগঠনিক মান</span>
              <p>{delegateData.organizationalvalues}</p>
            </div>
            <div>
              <span>
                {delegateData.organizationalvalues === "চৌকস"
                  ? "চৌকস হওয়ার তারিখ"
                  : delegateData.organizationalvalues === "অগ্রপথিক"
                    ? "অগ্রপথিক হওয়ার তারিখ"
                    : "তারিখ প্রযোজ্য নয়"}
              </span>
              <p>{delegateData.joiningDate}</p>
            </div>
            <div>
              <span>
                {delegateData.organizationalvalues === "চৌকস"
                  ? "চৌকস কোড"
                  : delegateData.organizationalvalues === "অগ্রপথিক"
                    ? "অগ্রপথিক কোড"
                    : "কোড প্রযোজ্য নয়"}
              </span>
              <p>{delegateData.code}</p>
            </div>
            {delegateData.senOrganizationalvalues && (
              <>
                <div>
                  <span>সাংগঠনিক মান</span>
                  <p>{delegateData.senOrganizationalvalues}</p>
                </div>
                {delegateData.senOrganizationalvalues !== "প্রযোজ্য নয়" && (
                  <div>
                    <span>
                      {delegateData.senOrganizationalvalues} হওয়ার তারিখ
                    </span>
                    <p>{delegateData.senValueDate}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {delegateData && delegateData.comment && (
        <div className="delegateDataComment">
          <span>মন্তব্য</span>
          <br />
          <textarea value={delegateData.comment}></textarea>
        </div>
      )}

      <div className="regCreateBrnList">
        <br /><br />
      </div>
    </div>
  );
};

export default DetalseDeligetInfo;
