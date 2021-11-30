import firebase from "firebase";
import { useEffect, useState } from "react";

export const usePosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const savePost = async (post) => {
    const { currentUser } = firebase.auth();
    const postagem = {
      ...post,
      user: {
        uid: currentUser.uid,
        name: currentUser.displayName,
        email: currentUser.email,
        avatar: currentUser.photoURL,
      },
      createdAt: new Date().getTime(),
    };
    await firebase.firestore().collection("postagens").add(postagem);
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("postagens")
      .orderBy("createdAt", "desc")
      .onSnapshot(function (querySnapshot) {
        const list = [];
        querySnapshot.forEach(function (doc) {
          list.push({ ...doc.data(), id: doc.id });
        });
        setPosts(list);
        setIsLoading(false);
      });
  }, []);

  return {
    posts,
    isLoading,
    savePost,
  };
};
