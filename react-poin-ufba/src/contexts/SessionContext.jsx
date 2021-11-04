import React, { createContext, useEffect, useState } from "react";
import firebase from "firebase/app";

// import { firebaseConfig } from "../constants";
import "firebase/auth";

export const SessionContext = createContext({});

const config = {
  apiKey: "AIzaSyBmEWdDsinfQVv0t53wdBrJFjx_lUhRHH0",
  authDomain: "poin-ufba.firebaseapp.com",
  // ...
};

const firebaseApp = firebase.initializeApp(config);

firebase.auth().useDeviceLanguage();

export const SessionProvider = ({
  children,
}) => {
  const [session, setSession] = useState({
    isFirebaseReady: false,
    user: null,
    logout: () => firebase.auth().signOut(),
  });

  useEffect(() => {
    const unregisterAuthObserver = firebaseApp
      .auth()
      .onAuthStateChanged(async (user) => {
        setSession((s) => ({
          ...s,
          user,
          isFirebaseReady: true,
        }));
      });
    return () => {
      unregisterAuthObserver();
    };
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};
