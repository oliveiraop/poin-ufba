import firebase from "firebase";
import { useEffect } from "react";

export const useNotifications = () => {
  useEffect(() => {
    firebase
      .firestore()
      .collection("notifications")
      .onSnapshot((snapshot) => {
        // snapshot.docChanges().forEach((change) => {
        //   if (change.type === "added") {
        //     new Notification(change.doc.data().message);
        //   }
        // });
      });
  }, []);
};
