import React, { useState } from "react";
import { Menu, Dropdown, Badge, Avatar, List, Button } from "antd";
import {
  MailOutlined,
  BellOutlined,
  WarningOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import notificationData from "assets/data/notification.data.json";
import Flex from "components/shared-components/Flex";

import { useNotifications } from "../../hooks/useNotifications";

const getIcon = (icon) => {
  switch (icon) {
    case "mail":
      return <MailOutlined />;
    case "alert":
      return <WarningOutlined />;
    case "check":
      return <CheckCircleOutlined />;
    default:
      return <MailOutlined />;
  }
};

const getNotificationBody = (list) => {
  return list.length > 0 ? (
    <List
      size="small"
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item) => (
        <List.Item className="list-clickable">
          <div style={{ display: "flex", flex: 1 }}>
            <div className="mr-3 pr-3">
              <span className="font-weight-bold text-dark">{item.title} </span>{" "}
              <br />
              <span className="text-gray-light">{item.description}</span>
            </div>
            <small className="ml-3" style={{ marginLeft: "auto" }}>
              {new Date(item.createdAt).toLocaleTimeString()}
            </small>
          </div>
        </List.Item>
      )}
    />
  ) : (
    <div className="empty-notification">
      <img
        src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
        alt="empty"
      />
      <p className="mt-3">You have viewed all notifications</p>
    </div>
  );
};

export const NavNotification = () => {
  const [visible, setVisible] = useState(false);
  const [viewd, setViewd] = useState(new Set());

  const { notifications: allNotifications, clear } = useNotifications();

  const notifications = allNotifications.filter(
    (notification) => !viewd.has(notification.id)
  );

  console.log(notifications);

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  const onClickClear = () => {
    const newViewed = new Set(viewd);
    allNotifications.forEach((item) => {
      newViewed.add(item.id);
    });
    setViewd(newViewed);
    clear();
  };

  const notificationList = (
    <div className="nav-dropdown nav-notification">
      <div className="nav-notification-header d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Notificações</h4>
        <Button type="link" onClick={onClickClear} size="small">
          Limpar{" "}
        </Button>
      </div>
      <div className="nav-notification-body">
        {getNotificationBody(notifications)}
      </div>
      {notifications.length > 0 ? (
        <div className="nav-notification-footer">
          <a className="d-block" href="#/">
            Ver todas
          </a>
        </div>
      ) : null}
    </div>
  );

  return (
    <Dropdown
      placement="bottomRight"
      overlay={notificationList}
      onVisibleChange={handleVisibleChange}
      visible={visible}
      trigger={["click"]}
    >
      <Menu mode="horizontal">
        <Menu.Item key="notification">
          <Badge count={notifications.length}>
            <BellOutlined className="nav-icon mx-auto" type="bell" />
          </Badge>
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
};

export default NavNotification;
