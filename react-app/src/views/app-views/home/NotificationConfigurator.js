import React, { useEffect } from "react";
import { Switch } from "antd";
import { useNotificationConfigurator } from "../../../hooks/useNotificationConfigurator";

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
  const { job, event, toggleListener } = useNotificationConfigurator();

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
