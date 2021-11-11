import React from "react";
import { Menu, Dropdown, Avatar } from "antd";
import { connect } from "react-redux";
import {
  EditOutlined,
  SettingOutlined,
  ShopOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { signOut } from "redux/actions/Auth";

const menuItem = [
  {
    title: "Edit Profile",
    icon: EditOutlined,
    path: "/asd",
  },

  {
    title: "Account Setting",
    icon: SettingOutlined,
    path: "/asd",
  },
  {
    title: "Billing",
    icon: ShopOutlined,
    path: "/asd",
  },
  {
    title: "Help Center",
    icon: QuestionCircleOutlined,
    path: "/asd",
  },
];

export const NavProfile = ({ signOut }) => {
  const profileImg = "/img/avatars/thumb-1.jpg";
  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex">
          <Avatar size={45} src={profileImg} />
          <div className="pl-3">
            <h4 className="mb-0">Charlie Howard</h4>
            <span className="text-muted">Frontend Developer</span>
          </div>
        </div>
      </div>
      <div className="nav-profile-body">
        <Menu>
          {/* {menuItem.map((el, i) => {
            return (
              <Menu.Item key={i}>
                <a href={el.path}>
                  <Icon className="mr-3" type={el.icon} />
                  <span className="font-weight-normal">{el.title}</span>
                </a>
              </Menu.Item>
            );
          })} */}
          <Menu.Item key={menuItem.legth + 1} onClick={(e) => signOut()}>
            <span>
              <LogoutOutlined className="mr-3" />
              <span className="font-weight-normal">Sign Out</span>
            </span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <Dropdown placement="bottomLeft" overlay={profileMenu}>
      <Menu className="d-flex align-item-center" mode="horizontal">
        <Menu.Item key="12312">
          <Avatar src={profileImg} />
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
};

export default connect(null, { signOut })(NavProfile);
