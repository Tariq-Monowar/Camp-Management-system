import { createContext, useContext, useEffect, useState } from "react";
import { firebaseApp } from "./FirebaseConfig";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  uploadBytes,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  getMetadata,
} from "firebase/storage";

const FirebaseCamp = createContext(null);

// const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const UseCampFirebase = () => useContext(FirebaseCamp);

export const CampProvider = ({ children }) => {
  // const firebase = UseAdminAuthFirebase();
  const currentUser = JSON.parse(localStorage.getItem("authtoken"));
  const currentcampId = localStorage.getItem("currentCampId");
  const [deligateUpdateData, setDeligateUpdateData] = useState(null);
  const [senAdminData, setSenAdminData] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);

  const [infoDetalse, setInfoDetalse] = useState(null);

  const [forceByUpdate, setForceByUpdate] = useState(false);
  const [forceByUpdateBrince, setForceByUpdateBrince] = useState(false);
  const [deleget_Data, setDelegetData] = useState([]);
  const [branches, setBranches] = useState([]);

  const [allRegimentData, setAllRegimentData] = useState([])
  const [forceUpdateReg, setforceUpdateReg] = useState(false)
  
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

  {
    forceByUpdate && console.clear()
  }
  {
    forceByUpdateBrince && console.clear()
  }
  
  {
    forceUpdateReg && console.clear()
  }
  

  useEffect(() => {
    const fetchData = async () => {
      const currentcampId = localStorage.getItem("currentCampId");

      const campDocRef = doc(firestore, "camp", currentcampId);
      const delegateCollectionRef = collection(campDocRef, "delegate");
      const querySnapshot = await getDocs(delegateCollectionRef);

      const delegates = [];
      querySnapshot.forEach((doc) => {
        delegates.push({ id: doc.id, ...doc.data() });
      });

      if (delegates.length > 0) {
        localStorage.setItem(
          currentcampId + "deleget",
          JSON.stringify(delegates)
        );
        setDelegetData(delegates);
      }
    };
    setDelegetData(JSON.parse(localStorage.getItem(currentcampId + "deleget")));
    fetchData();
  }, [forceByUpdate]);

  useEffect(() => {
    const currentcampId = localStorage.getItem("currentCampId");

    const fetchBranches = async () => {
      try {
        const campDocRef = doc(firestore, "camp", currentcampId);
        const branchCollectionRef = collection(campDocRef, "brance");
        const querySnapshot = await getDocs(branchCollectionRef);

        const branchesData = [];
        querySnapshot.forEach((doc) => {
          branchesData.push({ id: doc.id, ...doc.data() });
        });

        if (branchesData.length > 0) {
          localStorage.setItem(currentcampId + "branch",JSON.stringify(branchesData));
          setBranches(branchesData);
        }
      } catch (error) {
        console.error("Error fetching branches:", error.message);
      }
    };

    const cachedBranches = JSON.parse(localStorage.getItem(currentcampId + "branch"));

    // Check if cached branches exist and use them to set the initial state
    if (cachedBranches && cachedBranches.length > 0) {
      setBranches(cachedBranches);
    }

    fetchBranches();
  }, [forceByUpdateBrince]);

  // useEffect(() => {
  //   const getRegiments = async () => {
  //     const currentcampId = localStorage.getItem("currentCampId");
  //     try {
  //       const campDocRef = doc(firestore, "camp", currentcampId);
  //       const regimentCollectionRef = collection(campDocRef, "regiments");
  //       const querySnapshot = await getDocs(regimentCollectionRef);
  
  //       const regiments = [];
  //       querySnapshot.forEach((doc) => {
  //         regiments.push({ id: doc.id, ...doc.data() });
  //       });

  //       if(regiments && regiments.length > 0){
  //         localStorage.setItem(currentcampId + "Regiment",JSON.stringify(regiments))
  //         setAllRegimentData(regiments)
  //       }
        
  //     } catch (error) {
  //       console.error("Error fetching regiments:", error.message);
  //     }
  //   };
  //   setAllRegimentData(JSON.parse(localStorage.getItem(currentcampId + "Regiment")))
  //   getRegiments()
  // }, [forceUpdateReg]);

  useEffect(() => {
    const getRegiments = async () => {
      const currentcampId = localStorage.getItem("currentCampId");
      try {
        const campDocRef = doc(firestore, "camp", currentcampId);
        const regimentCollectionRef = collection(campDocRef, "regiments");
        const querySnapshot = await getDocs(regimentCollectionRef);
  
        const regiments = [];
        querySnapshot.forEach((doc) => {
          regiments.push({ id: doc.id, ...doc.data() });
        });

        if(regiments && regiments.length > 0){
          localStorage.setItem(currentcampId + "Regiment",JSON.stringify(regiments))
          setAllRegimentData(regiments)
        }
        
      } catch (error) {
        console.error("Error fetching regiments:", error.message);
      }
    };
    setAllRegimentData(JSON.parse(localStorage.getItem(currentcampId + "Regiment")))
    getRegiments()
  }, [forceUpdateReg]);
// console.log(forceUpdateReg)

  const createRegiment = async (regimentName, roomNumber) => {
    const currentcampId = localStorage.getItem("currentCampId");
    const createByName = currentUser.userName || "";
    const createByAbator = currentUser.image || "";

    try {
      const campDocRef = doc(firestore, "camp", currentcampId);
      const regimentCollectionRef = collection(campDocRef, "regiments");

      const docRef = await addDoc(regimentCollectionRef, {
        regimentName,
        roomNumber,
        createByName,
        createByAbator,
        lastUpdateBy: "",
        lastUpdateByAbator: "",
      });
      setforceUpdateReg(!forceUpdateReg);
      return docRef.id 
    } catch (error) {
      console.error("Error creating new regiment:", error.message);
    }
  };

  const getRegiments = async () => {
    const currentcampId = localStorage.getItem("currentCampId");
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

  const deleteRegiment = async (regimentId) => {
    const currentcampId = localStorage.getItem("currentCampId");
    try {
      const campDocRef = doc(firestore, "camp", currentcampId);
      const regimentDocRef = doc(campDocRef, "regiments", regimentId);
      await deleteDoc(regimentDocRef);
      setforceUpdateReg(!forceUpdateReg)
      console.log("Regiment deleted successfully");
    } catch (error) {
      console.error("Error deleting regiment:", error.message);
    }
  };

  const updateRegiment = async (regimentId, regimentName, roomNumber) => {
    console.log(regimentId, regimentName, roomNumber);
    const currentcampId = localStorage.getItem("currentCampId");

    const lastUpdateBy = currentUser.userName || "";
    const lastUpdateByAbator = currentUser.image || "";
    try {
      const campDocRef = doc(firestore, "camp", currentcampId);
      const regimentDocRef = doc(campDocRef, "regiments", regimentId);

      const updateData = {};

      if (regimentName) {
        updateData.regimentName = regimentName;
      }

      if (roomNumber) {
        updateData.roomNumber = roomNumber;
      }

      if (lastUpdateBy) {
        updateData.lastUpdateBy = lastUpdateBy;
      }

      if (lastUpdateByAbator) {
        updateData.lastUpdateByAbator = lastUpdateByAbator;
      }

      await updateDoc(regimentDocRef, updateData);
      setforceUpdateReg(!forceUpdateReg);
      return regimentDocRef 
    } catch (error) {
      console.error("Error updating regiment:", error.message);
    }
  };

  //Brance
  const selectBrance = async (branceName, branceCode, delegateDarjo) => {
    const currentcampId = localStorage.getItem("currentCampId");
    const createByName = currentUser.userName || "";
    const createByAbator = currentUser.image || "";
    try {
      const campDocRef = doc(firestore, "camp", currentcampId);
      const regimentCollectionRef = collection(campDocRef, "brance");

      const docRef = await addDoc(regimentCollectionRef, {
        branceName,
        branceCode,
        delegateDarjo,
        createByName,
        createByAbator,
        lastUpdateBy: "",
        lastUpdateByAbator: "",
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating new regiment:", error.message);
    }
  };

  const getBrance = async () => {
    const currentcampId = localStorage.getItem("currentCampId");
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

  const deleteBrance = async (branceId) => {
    const currentcampId = localStorage.getItem("currentCampId");
    try {
      const campDocRef = doc(firestore, "camp", currentcampId);
      const regimentDocRef = doc(campDocRef, "brance", branceId);
      await deleteDoc(regimentDocRef);
      console.log("Regiment deleted successfully");
      setForceByUpdateBrince(forceByUpdateBrince);
    } catch (error) {
      console.error("Error deleting regiment:", error.message);
    }
  };

  const updateBrance = async (
    branceId,
    branceName,
    branceCode,
    delegateDarjo
  ) => {
    // console.log(regimentId, regimentName, roomNumber);
    const currentcampId = localStorage.getItem("currentCampId");

    const lastUpdateBy = currentUser.userName || "";
    const lastUpdateByAbator = currentUser.image || "";
    try {
      const campDocRef = doc(firestore, "camp", currentcampId);
      const regimentDocRef = doc(campDocRef, "brance", branceId);

      const updateData = {};

      if (branceName) {
        updateData.branceName = branceName;
        updateData.branceCode = branceCode;
      }

      if (delegateDarjo) {
        updateData.delegateDarjo = delegateDarjo;
      }

      if (lastUpdateBy) {
        updateData.lastUpdateBy = lastUpdateBy;
      }

      if (lastUpdateByAbator) {
        updateData.lastUpdateByAbator = lastUpdateByAbator;
      }

      await updateDoc(regimentDocRef, updateData);
      return regimentDocRef.id && setForceByUpdateBrince(forceByUpdateBrince);
    } catch (error) {
      console.error("Error updating regiment:", error.message);
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

  // Function to update the delegatId
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
    console.log(
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
    );
    const currentcampId = localStorage.getItem("currentCampId");
    const createByName = currentUser.userName || "";
    const createByAbator = currentUser.image || "";

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

      return docRef.id;
    } catch (error) {
      console.error("Error creating new delegate:", error.message);
    }
  };

  const updateDelegate = async (
    id,
    branch,
    fullNameBangla,
    fullNameEnglish,
    motherNameBangla,
    motherNameEnglish,
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
    image,
    prevImage
  ) => {
    console.log(
      id,
      branch,
      fullNameBangla,
      fullNameEnglish,
      motherNameBangla,
      motherNameEnglish,
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
      image,
      prevImage
    );

    const currentCampId = localStorage.getItem("currentCampId");
    const lastUpdateBy = currentUser.userName || "";
    const lastUpdateByAbator = currentUser.image || "";
    const campDocRef = doc(firestore, "camp", currentCampId);
    const delegateDocRef = doc(campDocRef, "delegate", id);

    const updateData = {};

    if (branch) {
      updateData.brance = branch;
    }
    if (fullNameBangla) {
      updateData.fullNameBangla = fullNameBangla;
    }

    if (fullNameEnglish) {
      updateData.fullNameEnglish = fullNameEnglish;
    }

    if (fatherNameBangla) {
      updateData.fatherNameBangla = fatherNameBangla;
    }

    if (fatherNameEnglish) {
      updateData.fatherNameEnglish = fatherNameEnglish;
    }

    if (motherNameBangla) {
      updateData.motherNameBangla = motherNameBangla;
    }

    if (motherNameEnglish) {
      updateData.motherNameEnglish = motherNameEnglish;
    }

    if (asor) {
      updateData.asor = asor;
    }

    if (school) {
      updateData.school = school;
    }

    if (regiment) {
      updateData.regiment = regiment;
    }

    if (mobileNumber) {
      updateData.mobileNumber = mobileNumber;
    }

    if (classValue) {
      updateData.classValue = classValue;
    }

    if (district) {
      updateData.district = district;
    }

    if (joiningDate) {
      updateData.joiningDate = joiningDate;
    }
    if (code) {
      updateData.code = code;
    }
    if (organizationalvalues) {
      updateData.organizationalvalues = organizationalvalues;
    }
    if (year) {
      updateData.year = year;
    }
    if (isHedeleget) {
      updateData.isHedeleget = isHedeleget;
    }
    if (senOrganizationalvalues) {
      updateData.senOrganizationalvalues = senOrganizationalvalues;
    }
    if (senValueDate) {
      updateData.senValueDate = senValueDate;
    }
    if (comment) {
      updateData.comment = comment;
    }

    if (lastUpdateBy) {
      updateData.lastUpdateBy = lastUpdateBy;
    }
    if (lastUpdateByAbator) {
      updateData.lastUpdateByAbator = lastUpdateByAbator;
    }
    if (image) {
      const storageRef = ref(storage, `/deligate/${id}_${Date.now()}`);
      await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);
      updateData.selectImage = downloadURL;
      if (prevImage) {
        const prevImageRef = ref(storage, prevImage);
        await deleteObject(prevImageRef);
      }
    }

    await updateDoc(delegateDocRef, updateData);
    return delegateDocRef.id;
  };
  const getAllDelegate = async () => {
    const currentcampId = localStorage.getItem("currentCampId");
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

  const getDelegateById = async () => {
    const currentcampId = localStorage.getItem("currentCampId");
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

  const deleteDeligate = async (id, delegetImage) => {
    console.log(id, delegetImage);
    const currentcampId = localStorage.getItem("currentCampId");
    const delegateId = localStorage.getItem("goToDetalseInfo");

    try {
      // Check if the image URL is provided
      if (delegetImage) {
        // Delete the image from Firebase Storage
        const imageRef = ref(storage, delegetImage);
        await deleteObject(imageRef);
        console.log("Delegate image deleted successfully");
      }

      // Delete the delegate data from Firestore
      const campDocRef = doc(firestore, "camp", currentcampId);
      const delegateDocRef = doc(campDocRef, "delegate", id || delegateId);
      await deleteDoc(delegateDocRef);

      console.log("Delegate data deleted successfully");
    } catch (error) {
      console.error(
        "Error deleting delegate and associated image:",
        error.message
      );
    }
  };

  const updateDelegateDelegatId = async (delegateId) => {
    try {
      const currentcampId = localStorage.getItem("currentCampId");
      const newDelegatId = await getDelegatId();
      const campDocRef = doc(firestore, "camp", currentcampId);
      const delegateDocRef = doc(campDocRef, "delegate", delegateId);

      await updateDoc(delegateDocRef, {
        delegatId: newDelegatId,
      });

      // Get the current delegatId and update it
      const currentDelegatId = await getDelegatId();
      const newDelegatIds = currentDelegatId + 1;
      // Update the delegatId
      await updateDelegatId(newDelegatIds);

      return delegateId;
    } catch (error) {
      console.error(
        `Error updating delegatId for delegate ${delegateId}:`,
        error.message
      );
    }
  };

  const updateDelegatePresent = async (delegateId, present) => {
    try {
      const currentcampId = localStorage.getItem("currentCampId");
      const campDocRef = doc(firestore, "camp", currentcampId);
      const delegateDocRef = doc(campDocRef, "delegate", delegateId);

      let updatedPresent = true;

      if (typeof present !== "undefined" && present === true) {
        updatedPresent = false;
      }

      await updateDoc(delegateDocRef, {
        DelegatePresent: updatedPresent,
      });

      return delegateId;
    } catch (error) {
      console.error(
        `Error updating delegatId for delegate ${delegateId}:`,
        error.message
      );
    }
  };

  const createSeniorAdmin = async (userName, password, mobile, image) => {
    try {
      const date = new Date().getTime();
      const storageRef = ref(storage, `/seniorAdmin/${date}`);
      await uploadBytesResumable(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);

      // Create senior admin in Firestore
      const docRef = await addDoc(collection(firestore, "seniorAdmin"), {
        userName,
        password,
        mobile,
        createByName: firebase.users.displayName || "",
        createByAbator: firebase.users.photoURL || "",
        lastUpdateBy: "",
        lastUpdateByAbator: "",
        image: downloadURL, // Store image download URL
      });

      return docRef.id;
    } catch (error) {
      console.error("Error creating new senior admin:", error.message);
    }
  };

  const getAllSeniorAdmin = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "seniorAdmin"));
      const seniorAdminList = [];
      querySnapshot.forEach((doc) => {
        seniorAdminList.push({ id: doc.id, ...doc.data() });
      });

      return seniorAdminList;
    } catch (error) {
      console.error("Error getting documents:", error.message);
    }
  };
  // console.log(currentUser.image)
  const updateSeniorAdmin = async (admainId, mobile, image, previmg) => {
    console.log(previmg);
    const lastUpdateBy = currentUser.userName || "";
    const lastUpdateByAbator = currentUser.image || "";
    try {
      const campDocRef = doc(firestore, "seniorAdmin", admainId);

      const updateData = {};

      if (mobile) {
        updateData.mobile = mobile;
      }
      if (image) {
        const storageRef = ref(
          storage,
          `/seniorAdmin/${admainId}_${Date.now()}`
        );
        await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);
        updateData.image = downloadURL;

        if (previmg) {
          try {
            const imageRef = ref(storage, previmg);
            await getMetadata(imageRef); // Check if the object exists
            await deleteObject(imageRef);
          } catch (error) {
            console.error("Error deleting previous image:", error.message);
          }
        }
      }

      if (lastUpdateBy) {
        updateData.lastUpdateBy = lastUpdateBy;
      }

      if (lastUpdateByAbator) {
        updateData.lastUpdateByAbator = lastUpdateByAbator;
      }

      await updateDoc(campDocRef, updateData);
      return { admainId, ...updateData };
    } catch (error) {
      console.error("Error updating senior admin:", error.message);
    }
  };

  return (
    <FirebaseCamp.Provider
      value={{
        createRegiment,
        getRegiments,
        deleteRegiment,
        updateRegiment,
        setInfoDetalse,
        infoDetalse,
        selectBrance,
        getBrance,
        updateBrance,
        deleteBrance,
        getAllCamps,
        ctereateDeligate,
        getAllDelegate,
        getDelegateById,
        setDeligateUpdateData,
        deligateUpdateData,
        updateDelegate,
        deleteDeligate,
        updateDelegateDelegatId,
        updateDelegatePresent,
        createSeniorAdmin,
        updateSeniorAdmin,
        senAdminData,
        setSenAdminData,
        analysisData,
        allRegimentData,
        setAnalysisData,
        setForceByUpdate,
        setDelegetData,
        getAllSeniorAdmin,
        branches,
        deleget_Data,
        forceByUpdate,
        forceUpdateReg, setforceUpdateReg,
        forceByUpdateBrince, setForceByUpdateBrince
      }}
    >
      {children}
    </FirebaseCamp.Provider>
  );
};
