import { createContext, useContext, useEffect, useState } from "react";
import { firebaseApp } from "./Config";
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, updateDoc } from "firebase/firestore";
import {
  getStorage,
  uploadBytes,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  getMetadata
} from "firebase/storage";

const FirebaseContext = createContext(null);

const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const RegimentFirebase = () => useContext(FirebaseContext);

export const RegimentProvider = ({ children }) => {

  const [delegetData, setDelegetData] = useState([]);
  const [forceByUpdate, setForceByUpdate] = useState(false)


  const currentCampId = localStorage.getItem("campId");

  const branceName = JSON.parse(localStorage.getItem("authtoken"))?.branceName;

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campDocRef = doc(firestore, "camp", currentCampId);
        const delegateCollectionRef = collection(campDocRef, "delegate");
        const querySnapshot = await getDocs(delegateCollectionRef);

        const delegates = [];
        querySnapshot.forEach((doc) => {
          delegates.push({ id: doc.id, ...doc.data() });
        });

        const filteredDelegates = delegates.filter(
          (delegate) => delegate.brance === branceName
        );

        if(filteredDelegates.length > 0){
          setDelegetData(filteredDelegates);
          localStorage.setItem("deleghetStorage", JSON.stringify(filteredDelegates))
        }
      } catch (error) {
        console.error("Error fetching delegates:", error.message);
      }
    };
    setDelegetData(JSON.parse(localStorage.getItem("deleghetStorage")))
    fetchData();
  }, [currentCampId, branceName, forceByUpdate]);
  

  localStorage.setItem("delegetLength", delegetData?.length)
  
  const getAllCamps = async () => {
    try {
      const campsCollectionRef = collection(firestore, "camp");
      const querySnapshot = await getDocs(campsCollectionRef);

      const camps = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return camps;
    } catch (error) {
      console.error("Error fetching camps:", error.message);
    }
  };

  const getBrance = async () => {
    const currentcampId = localStorage.getItem("campId")
    try {
      const campDocRef = doc(firestore, "camp", currentcampId);
      const regimentCollectionRef = collection(campDocRef, "brance");
      const querySnapshot = await getDocs(regimentCollectionRef);

      const regiments = [];
      querySnapshot.forEach((doc) => {
        regiments.push({ id: doc.id, ...doc.data() });
      });
      return regiments;
    } catch (error) {
      console.error("Error fetching regiments:", error.message);
    }
  };

  const getRegiments = async () => {
    const currentcampId = localStorage.getItem("campId")
    try {
      const campDocRef = doc(firestore, "camp", currentcampId);
      const regimentCollectionRef = collection(campDocRef, "regiments");
      const querySnapshot = await getDocs(regimentCollectionRef);

      const regiments = [];
      querySnapshot.forEach((doc) => {
        regiments.push({ id: doc.id, ...doc.data() });
      });
      return regiments;
    } catch (error) {
      console.error("Error fetching regiments:", error.message);
    }
  };

  const getDelegateById = async () => {
    const currentcampId = localStorage.getItem("campId")
    const delegateId = localStorage.getItem("goToDetalseInfo");
    try {
      const campDocRef = doc(firestore, "camp", currentcampId);
      const delegateDocRef = doc(campDocRef, "delegate", delegateId);
      const delegateDocSnapshot = await getDoc(delegateDocRef);

      if (delegateDocSnapshot.exists()) {
        const delegateData = delegateDocSnapshot.data();
        return { id: delegateDocSnapshot.id, ...delegateData };
      } else {
        console.log("Delegate not found");
        return null;
      }
    } catch (error) {
      console.error("Error getting delegate by ID:", error.message);
      return null;
    }
  };


  const getDelegatId = async () => {
    try {
      const countDocRef = doc(firestore, "count", "7idTPADEBJY2ABZzLo5V");
      const countDocSnapshot = await getDoc(countDocRef);

      if (countDocSnapshot.exists()) {
        const delegatId = countDocSnapshot.data().delegatId;
        return delegatId;
      } else {
        console.log("Document does not exist");
        return null;
      }
    } catch (error) {
      console.error("Error getting delegatId:", error.message);
      return null;
    }
  };

  const updateDelegatId = async (newDelegatId) => {
    try {
      const countDocRef = doc(firestore, "count", "7idTPADEBJY2ABZzLo5V");
      await updateDoc(countDocRef, {
        delegatId: newDelegatId,
      });

      console.log("delegatId updated successfully");
    } catch (error) {
      console.error("Error updating delegatId:", error.message);
    }
  };

  const ctereateDeligate = async (
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
    selectImage
  ) => {
    const currentcampId = localStorage.getItem("campId")
    const createByName = branceName;
    const createByAbator = "";

    try {
      // Upload image to storage
      const delegatId = await getDelegatId();

      let downloadURL = "";
      if (selectImage) {
        const date = new Date().getTime();
        const storageRef = ref(storage, `/deligate/${currentcampId}_${date}`);
        await uploadBytesResumable(storageRef, selectImage);
        downloadURL = await getDownloadURL(storageRef);
      }

      const campDocRef = doc(firestore, "camp", currentcampId);
      const delegateCollectionRef = collection(campDocRef, "delegate");

      const docRef = await addDoc(delegateCollectionRef, {
        brance: branceName,
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
        selectImage: downloadURL,
        delegatId,
        createByName,
        createByAbator,
        lastUpdateBy: "",
        lastUpdateByAbator: "",
      });

      // Get the current delegatId and update it
      const currentDelegatId = await getDelegatId();
      const newDelegatId = currentDelegatId + 1;
      // Update the delegatId
      await updateDelegatId(newDelegatId);

      setForceByUpdate(!forceByUpdate);
      
      return docRef.id
    } catch (error) {
      console.error("Error creating new delegate:", error.message);
    }
  };

  const getAllDelegate = async () => {
    const currentcampId = localStorage.getItem("campId")
    try {
      const campDocRef = doc(firestore, "camp", currentcampId);
      const delegateCollectionRef = collection(campDocRef, "delegate");
      const querySnapshot = await getDocs(delegateCollectionRef);

      const delegates = [];
      querySnapshot.forEach((doc) => {
        delegates.push({ id: doc.id, ...doc.data() });
      });
      return delegates;
    } catch (error) {
      console.error("Error fetching delegates:", error.message);
    }
  };

  
  const assignDelegate = async (delegateId) => {
    const currentcampId = localStorage.getItem("campId");
    const newRegiment = JSON.parse(localStorage.getItem("authtoken"))?.regimentName

    try {
      const campDocRef = doc(firestore, "camp", currentcampId);
      const delegateDocRef = doc(campDocRef, "delegate", delegateId);

      await updateDoc(delegateDocRef, {
        regiment: newRegiment,
      });

      return delegateId
    } catch (error) {
      console.error("Error assigning delegate to regiment:", error.message);
    }
  };

 
  return (
    <FirebaseContext.Provider
      value={{ getBrance, getRegiments, getAllCamps, delegetData, getDelegateById, ctereateDeligate, getAllDelegate, assignDelegate, forceByUpdate, setForceByUpdate }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
