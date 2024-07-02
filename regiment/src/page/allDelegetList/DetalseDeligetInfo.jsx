import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../assets/avator.jpg";
import { RegimentFirebase } from "../../context/RegimentContext";

const DetalseDeligetInfo = () => {
  const campFirebase = RegimentFirebase();
  const navigate = useNavigate();
  const [forceByUpdate, setForceByUpdate] = useState(false);
  const [delegateData, setDelegateData] = useState(null);

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

  //   const deleteDelegetData = async () => {
  //     const userConfirmed = window.confirm("আপনি এই ডেলিগেট মুছে ফেলতে চান?");
  //     if (userConfirmed) {
  //       try {
  //         const data = await campFirebase.deleteDeligate(
  //           delegateData.id,
  //           delegateData.selectImage
  //         );
  //         setForceByUpdate(!forceByUpdate);
  //         console.log(data);
  //         navigate(-1);
  //       } catch (error) {
  //         console.error("Error deleting regiment:", error);
  //       }
  //     } else {
  //       console.log("Deletion canceled by user");
  //     }
  //   };

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
              <span>আসরের নাম</span>
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
              <span>পূর্বের ক্যাম্পের সাল</span>
              <p>{delegateData.year}</p>
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
              <span>শ্রেণী</span>
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
      <div className="regCreateBrnList">
        {delegateData && delegateData.comment && (
          <div className="delegateDataComment">
            <span>মন্তব্য</span>
            <br />
            <textarea value={delegateData.comment}></textarea>
          </div>
        )}
        {/* <button
          className="regimentBtn"
          onClick={() => updateData(delegateData)}
        >
          তথ্য আপডেট করুন
        </button>
        <button className="regimentBtn" onClick={deleteDelegetData}>
          ডিলিট করুন
        </button> */}
      </div>

      <br />
      <br />
      <br />
    </div>
  );
};

export default DetalseDeligetInfo;
