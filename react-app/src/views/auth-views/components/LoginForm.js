import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Divider, Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { GoogleSVG, FacebookSVG } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
import {
  showLoading,
  showAuthMessage,
  hideAuthMessage,
  authenticated,
  signInWithGoogle,
  signInWithFacebook,
} from "redux/actions/Auth";
import JwtAuthService from "services/JwtAuthService";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

export const LoginForm = (props) => {
  let history = useHistory();

  const {
    otherSignIn,
    showForgetPassword,
    hideAuthMessage,
    onForgetPasswordClick,
    showLoading,
    extra,
    loading,
    showMessage,
    message,
    authenticated,
    showAuthMessage,
    token,
    redirect,
    signInWithGoogle,
    signInWithFacebook,
  } = props;

  const onLogin = (values) => {
    showLoading();
    const fakeToken = "fakeToken";
    JwtAuthService.login(values)
      .then((resp) => {
        authenticated(fakeToken);
      })
      .then((e) => {
        showAuthMessage(e);
      });
  };

  const onGoogleLogin = () => {
    showLoading();
    signInWithGoogle();
  };

  const onFacebookLogin = () => {
    showLoading();
    signInWithFacebook();
  };

  useEffect(() => {
    if (token !== null) {
      history.push(redirect);
    }
    if (showMessage) {
      setTimeout(() => {
        hideAuthMessage();
      }, 3000);
    }
  });

  const renderOtherSignIn = (
    <div>
      <Divider>
        <span className="text-muted font-size-base font-weight-normal">
          ou entre com
        </span>
      </Divider>
      <div className="d-flex justify-content-center">
        <Button
          onClick={() => onGoogleLogin()}
          className="mr-2"
          disabled={loading}
          icon={<CustomIcon svg={GoogleSVG} />}
        >
          Google
        </Button>
        <Button
          onClick={() => onFacebookLogin()}
          icon={<CustomIcon svg={FacebookSVG} />}
          disabled={loading}
        >
          Facebook
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity: showMessage ? 1 : 0,
          marginBottom: showMessage ? 20 : 0,
        }}
      >
        <Alert type="error" showIcon message={message}></Alert>
      </motion.div>
      <Form layout="vertical" name="login-form" onFinish={onLogin}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Por favor insira o email",
            },
            {
              type: "email",
              message: "Coloque um email v??lido!",
            },
          ]}
        >
          <Input prefix={<MailOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="password"
          label={
            <div
              className={`${
                showForgetPassword
                  ? "d-flex justify-content-between w-100 align-items-center"
                  : ""
              }`}
            >
              <span>Senha</span>
              {showForgetPassword && (
                <span
                  onClick={() => onForgetPasswordClick}
                  className="cursor-pointer font-size-sm font-weight-normal text-muted"
                >
                  Esqueceu a senha?
                </span>
              )}
            </div>
          }
          rules={[
            {
              required: true,
              message: "Por favor coloque a senha",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <p>
          Esqueceu a senha? {" "}
            <a href="/auth/forgot-password">Clique aqui</a>
        </p>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Entrar
          </Button>
        </Form.Item>
        {otherSignIn ? renderOtherSignIn : null}
        {extra}
      </Form>
    </>
  );
};

LoginForm.propTypes = {
  otherSignIn: PropTypes.bool,
  showForgetPassword: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

LoginForm.defaultProps = {
  otherSignIn: true,
  showForgetPassword: false,
};

const mapStateToProps = ({ auth }) => {
  const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect };
};

const mapDispatchToProps = {
  showAuthMessage,
  showLoading,
  hideAuthMessage,
  authenticated,
  signInWithGoogle,
  signInWithFacebook,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
