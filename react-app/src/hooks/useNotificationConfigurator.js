import { useEffect, useState } from "react";
import firebase from "firebase";

export const useNotificationConfigurator = () => {
  const [notificationConfig, setNotificationConfig] = useState({});
  const userEmail = firebase.auth().currentUser.email;

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(userEmail)
      .onSnapshot((snapshopt) => {
        if (snapshopt.data()) {
          setNotificationConfig(snapshopt.data());
        } else {
          firebase
            .firestore()
            .collection("users")
            .doc(userEmail)
            .set({ job: false, event: false });
        }
      });
  }, []);

  const { job, event } = notificationConfig;

  const toggleListener = (isChecked, type) => {
    firebase
      .firestore()
      .collection("users")
      .doc(userEmail)
      .update({ [type]: isChecked });
  };

  return {
    job,
    event,
    toggleListener,
  };
};
