import "./home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UseCampFirebase } from "../../context/CampManagement";
import CoppyWrite from "../../components/coppyWrite/CoppyWrite";

const Home = () => {
  const campFirebase = UseCampFirebase();
  const navigate = useNavigate();
  const campEntData = JSON.parse(localStorage.getItem("campData"));
  const [campData, setCampData] = useState(campEntData);
  // const [liadingTrue, setLiadingTrue] = useState(true);
  
  const [getAllSeniorAdmins, setGetAllSeniorAdmins] = useState([]);

  //Auth----
  // useEffect(() => {
  //   const getAllData = async () => {
  //     const authToken = JSON.parse(localStorage.getItem("authtoken"));
  //     try {
  //       const data = await campFirebase.getAllSeniorAdmin();
  //       if (data) {
  //         const userExists = data.some(
  //           (admin) =>
  //             admin.userName === authToken.userName &&
  //             admin.password === authToken.password
  //         );
  //         if (userExists) {
  //           console.log("Success..");
  //           console.log("Success..");

  //         } else {
  //           console.log("nai..");
  //           localStorage.removeItem("authtoken");
  //           navigate("/");
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching senior admins:", error.message);
  //     }
  //   };
  //   getAllData();
  // }, []);

  // Auth ----

  useEffect(() => {
    const getAllData = async () => {
      try {
        const data = await campFirebase.getAllSeniorAdmin();
        if (data.length > 0) {
          localStorage.setItem("allSeniorAdmins", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Error fetching senior admins:", error.message);
      }
    };
    getAllData();
  }, [campFirebase]);

  useEffect(() => {
    const getAllData = async () => {
      const authToken = JSON.parse(localStorage.getItem("authtoken"));
      try {
        const admainData = JSON.parse(localStorage.getItem("allSeniorAdmins"));
        if (admainData.length > 0) {
          const matchingAdmin = admainData.find(
            (admin) =>
              admin.userName === authToken.userName &&
              admin.password === authToken.password
          );
          if (matchingAdmin) {
            console.log("Success..");
            localStorage.setItem("authtoken", JSON.stringify(matchingAdmin));
          } else {
            console.log("No matching admin found or user not authenticated.");
            localStorage.removeItem("authtoken");
            navigate("/");
            // window.location.reload();
          }
        }
      } catch (error) {
        console.error("Error fetching senior admins:", error.message);
      }
    };
    getAllData();
  }, []);
  

  //------

  useEffect(() => {
    const getAllData = async () => {
      try {
        const data = await campFirebase.getAllCamps();
        if (data.length > 0) {
          localStorage.setItem("campData", JSON.stringify(data));
          setCampData(data);
          // setLiadingTrue(false);
        }
      } catch (error) {
        console.error("Error fetching regiments:", error.message);
      }
    };
    getAllData();
  }, [campFirebase]);

  const detalseCamp = (id, name) => {
    localStorage.setItem("currentCampId", id);
    localStorage.setItem("navheader", name);
    console.log(id);
    navigate("/entranceCampDetalse");
    campFirebase.setDelegetData([]);
    campFirebase.setForceByUpdate(!campFirebase.forceByUpdate);
  };

 

  return (
    <>
      <div style={{ paddingTop: "11.5vh" }} className="homeCampList">
        <h1 className="campHead">ক্যাম্প বিবরণী</h1>
        {campEntData && campEntData.length > 0 &&
          campEntData?.map((data) => {
            // console.log(data)
            return (
              <div className="campEntBtns" key={data.id}>
                <button
                  onClick={() => detalseCamp(data.id, data.campName)}
                  className=""
                >
                  {data.campName}
                </button>
              </div>
            );
          })}
        {!campEntData && (
          <div style={{ marginTop: "-10px" }} className="animation-hr">
            <hr className="hr1" />
            <hr className="hr2" />
            <hr className="hr3" />
            <hr className="hr4" />
          </div>
        )}
      </div>
      <CoppyWrite />
    </>
  );
};

export default Home;

// // Home.js
// import React, { useEffect } from 'react';
// import { openDB } from 'idb';

// const DB_NAME = 'your_database_name';
// const STORE_NAME = 'your_object_store_name';

// async function addObjects(objects) {
//   const db = await openDB(DB_NAME, 1, {
//     upgrade(db) {
//       if (!db.objectStoreNames.contains(STORE_NAME)) {
//         db.createObjectStore(STORE_NAME, { keyPath: 'id' });
//       }
//     },
//   });

//   const tx = db.transaction(STORE_NAME, 'readwrite');
//   const store = tx.objectStore(STORE_NAME);

//   for (const obj of objects) {
//     await store.put(obj);
//   }

//   await tx.done;
// }

// async function getAllObjects() {
//   const db = await openDB(DB_NAME, 1);
//   const tx = db.transaction(STORE_NAME, 'readonly');
//   const store = tx.objectStore(STORE_NAME);

//   return store.getAll();
// }

// function Home() {
//   useEffect(() => {
//     const dataToStore = [
//       { id: 1, name: 'Object 1' },
//       { id: 2, name: 'Object 2' },
//       // Add more objects as needed
//     ];

//   addObjects(dataToStore);

// getAllObjects().then(objects => {
//   console.log('Objects from IndexedDB:', objects);
// });
// }, []);

//   return (
//     <div>
//       <h1>Hello</h1>
//       <h1>Hello</h1>
//       <h1>Hello</h1>
//       <h1>Hello</h1>
//       <h1>Hello</h1>
//     </div>
//   );
// }

// export default Home;
