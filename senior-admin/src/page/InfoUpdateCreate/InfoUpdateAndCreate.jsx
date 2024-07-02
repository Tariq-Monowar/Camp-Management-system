import "./infoUpdateAndCreate.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { UseCampFirebase } from "../../context/CampManagement";
import { useState } from "react";

const InfoUpdateAndCreate = () => {
  const campFirebase = UseCampFirebase();
  const [info, setInfo] = useState(campFirebase.infoDetalse);
  const navigate = useNavigate();
  console.log(info);

  return (
    <div className="detalseInformation">
      <nav className="detalseInfoNav">
        <FaArrowLeftLong className="goback" onClick={() => navigate(-1)} />
        <h1>ক্যাম্প ম্যনেজমেন্ট সিস্টেম</h1>
      </nav>
      <div className="infoContainer">
        {(info.createByName || info.createByAbator) && (
          <div className="createdOnData">
            <p>Created By</p>
            {info.createByAbator && (
              <div className="byAbator">
                <img src={info.createByAbator} alt="" />
              </div>
            )}
            {info.createByName && (
              <div className="byName">
                <span>{info.createByName}</span>
              </div>
            )}
          </div>
        )}

        {(info.lastUpdateBy || info.lastUpdateByAbator) && (
          <div className="createdOnData updatedOnData">
            <p>Updated By</p>
            {info.createByAbator && (
              <div className="byAbator">
                <img src={info.lastUpdateByAbator} alt="" />
              </div>
            )}
            {info.createByName && (
              <div className="byName">
                <span>{info.lastUpdateBy}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoUpdateAndCreate;
