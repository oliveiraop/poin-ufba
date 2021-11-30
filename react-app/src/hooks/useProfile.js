import firebase from "firebase";
import { useEffect, useState } from "react";

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [experiences, setExperiences] = useState([]);
  
  
  
  const saveProfile = async (post) => {
    
    /*const postagem = {
      ...post,
      user: {
        uid: currentUser.uid,
        name: currentUser.displayName,
        email: currentUser.email,
        avatar: currentUser.photoURL,
      },
      createdAt: new Date().getTime(),
    };
    await firebase.firestore().collection("users").doc(currentUser.email).update()*/
  };

  useEffect(() => {
    if (firebase.auth().currentUser.email == null) {
      return
    }
    console.log('passou')
    const userEmail = firebase.auth().currentUser.email;
    firebase
      .firestore()
      .collection("users")
      .doc(userEmail)
      .onSnapshot(function (querySnapshot) {
        setProfile(querySnapshot.data());
        setIsLoading(false);
      });
      firebase
      .firestore()
      .collection("users")
      .doc(userEmail)
      .collection('experiences')
        .onSnapshot(function (querySnapshot) {
        const list = []
          querySnapshot.forEach((doc) => {
            list.push({ ...doc.data(), id: doc.id });
          })
        setExperiences(list);
        setIsLoading(false);
      });
  }, [firebase.auth()]);

  return {
    profile,
    experiences,
    isLoading,
    saveProfile,
  };
};
