import { createContext, useContext, useEffect, useState } from "react";


import { firebaseApp } from "./FirebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const SuperAdminAuthContext = createContext(null);

export const UseAdminAuthFirebase = () => useContext(SuperAdminAuthContext);

export const SuperAdminAuthProvider = ({ children }) => {
  const [forceUpdate, setForceUpdate] = useState(false);
  const [users, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        localStorage.setItem("admin", JSON.stringify(user));
        setUser(user);
      } else {
        localStorage.removeItem("admin");
        setUser(null);
      }
    });
  }, [firebaseAuth, forceUpdate]);

  const isLoggedIn = users ? true : false;

  const createSuperAdmin = async (userName, email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const superAdmin = result.user;

      await updateProfile(superAdmin, {
        displayName: userName,
      });

      return { success: true, superAdmin };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  };

  const signinSuperAdmin = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(
        firebaseAuth,
        email + "@gmail.com",
        password
      );
      const superAdmin = result.user;

      return { success: true, superAdmin };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateProfileData = async (userName, image, prevImage, uid) => {
    try {
      if (userName) {
        await updateProfile(users, {
          displayName: userName,
        });
      }

      if (image) {
        console.log(image)
        const date = new Date().getTime();
        const storageRef = ref(storage, `/admin/${uid}_${date}`);

        await uploadBytesResumable(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);

        await updateProfile(users, {
          photoURL: downloadURL,
        });

        if (prevImage) {
          const photoRef = ref(storage, prevImage);
          await deleteObject(photoRef);
        }
      }

      setForceUpdate(!forceUpdate);
      return { success: true, message: "Profile updated successfully" };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  };

  const signoutSuperAdmin = async () => {
    try {
      await signOut(firebaseAuth);
      // Clear the local storage
      localStorage.removeItem("admin");
      setUser(null);
      setForceUpdate(!forceUpdate);
      return { success: true, message: "Logged out successfully" };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  };

  return (
    <SuperAdminAuthContext.Provider
      value={{
        createSuperAdmin,
        signinSuperAdmin,
        users,
        isLoggedIn,
        firebaseAuth,
        updateProfileData,
        forceUpdate,
        signoutSuperAdmin
      }}
    >
      {children}
    </SuperAdminAuthContext.Provider>
  );
};
