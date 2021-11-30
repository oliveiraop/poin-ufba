import firebase from "firebase";
import { useEffect, useState } from "react";
import { useNotificationConfigurator } from "./useNotificationConfigurator";
import { usePosts } from "./usePosts";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const { posts } = usePosts();
  const { job, event } = useNotificationConfigurator();

  useEffect(() => {
    const list = [];
    posts.forEach((post) => {
      const add =
        (post.user.email !== firebase.auth().currentUser.email &&
          post.postType === "job" &&
          job) ||
        (post.postType === "event" && event);

      if (add) {
        const { title, postType, createdAt, company, location } = post;
        const notification = {
          id: post.id,
          title:
            postType === "job"
              ? "Uma nova vaga foi postada"
              : "Um novo evento foi postado",
          description:
            postType === "job"
              ? `${title} - ${company}`
              : `${title} em ${location}`,
          createdAt,
        };
        list.push(notification);
      }

      setNotifications(list);
    });
  }, [posts, job, event]);

  return {
    notifications,
    clear: () => setNotifications([]),
  };
};
