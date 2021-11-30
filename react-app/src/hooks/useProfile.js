import firebase from "firebase";
import { useEffect, useState } from "react";

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [experiences, setExperiences] = useState([]);
  const [currentUser, setCurrentUser] = useState({})
  
  
  
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

  const saveExperience = async (experience) => {
    const exp = {
      ...experience,
      createdAt: new Date().getTime(),
    };
    console.log(exp)
    await firebase.firestore().collection("users").doc(currentUser.email).collection("experiences").add(exp)
  }

  const saveUserData = async (userData) => {
    const data = {
      ...userData,
      email: currentUser.email,
      updatedAt: new Date().getTime(),
    };
    console.log(data)
    await firebase.firestore().collection("users").doc(currentUser.email).update(data)
  }

  useEffect(() => {
    if (firebase.auth().currentUser.email == null) {
      return
    }
    const user = firebase.auth().currentUser;
    setCurrentUser(user)
    firebase
      .firestore()
      .collection("users")
      .doc(user.email)
      .onSnapshot(function (querySnapshot) {
        setProfile(querySnapshot.data());
        setIsLoading(false);
      });
      firebase
      .firestore()
      .collection("users")
      .doc(user.email)
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
    saveExperience,
    saveUserData,
  };
};
