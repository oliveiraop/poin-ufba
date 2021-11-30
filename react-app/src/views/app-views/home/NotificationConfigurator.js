import { Switch } from "antd";
import React, { useEffect } from "react";
import firebase from "firebase";

const ListOption = ({ name, selector, disabled, vertical }) => (
  <div
    className={`my-4 ${
      vertical ? "" : "d-flex align-items-center justify-content-between"
    }`}
  >
    <div
      className={`${disabled ? "opacity-0-3" : ""} ${vertical ? "mb-3" : ""}`}
    >
      {name}
    </div>
    <div>{selector}</div>
  </div>
);

export const NotificationConfigurator = () => {
  const [notificationConfig, setNotificationConfig] = React.useState({});
  const userEmail = firebase.auth().currentUser.email;

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(userEmail)
      .onSnapshot((snapshopt) => {
        setNotificationConfig(snapshopt.data());
      });
  }, []);

  const { job, event } = notificationConfig;

  const toggleListener = (isChecked, type) => {
    console.log({ isChecked });
    firebase
      .firestore()
      .collection("users")
      .doc(userEmail)
      .update({ [type]: isChecked });
  };

  return (
    <div className="mb-5">
      <h4 className="mb-3 font-weight-bold">Notificações</h4>

      <ListOption
        name="Vagas"
        selector={
          <Switch
            checked={job}
            onChange={(isChecked) => toggleListener(isChecked, "job")}
          />
        }
      />

      <ListOption
        name="Eventos"
        selector={
          <Switch
            checked={event}
            onChange={(isChecked) => toggleListener(isChecked, "event")}
          />
        }
      />
    </div>
  );
};
