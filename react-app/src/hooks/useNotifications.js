import firebase from "firebase";
import { useEffect, useState } from "react";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.email)
      .collection("notifications")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          console.log(change.doc.data());
        });
        setLoading(false);
      });
  }, []);

  return {
    notifications,
  };
};
