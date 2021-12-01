import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  Avatar,
  Button,
  Typography,
  Form,
  Modal,
  Input,
  DatePicker,
} from "antd";
import { Icon } from "components/util-components/Icon";
import {
  employementList,
  interestedList,
  connectionList,
  groupList,
} from "./profileData";
import {
  GlobalOutlined,
  MailOutlined,
  HomeOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import AvatarStatus from "components/shared-components/AvatarStatus";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { connect } from "react-redux";
import { useProfile } from "../../../hooks/useProfile";
import firebase from "firebase";




const {TextArea} = Input
const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};



function ProfileInfo(props) {
  const { user, saveUserData } = props;
  const [isUserDataFormVisible, setUserDataFormVisible] = React.useState(false)
  const [userDataForm] = Form.useForm()

  const onFinish = async (values) => {
    console.log(user)
    setUserDataFormVisible(false);
    await saveUserData({
      about: values.about,
      address: values.address,
      phone: values.phone,
      email: values.email,
      website: values.website,
    });
    userDataForm.resetFields();
  };

  const onClickSubmit = async () => {
    try {
      await userDataForm.validateFields();
      userDataForm.submit();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Card>
      <Row justify="center">
        <Col sm={24} md={23}>
          <div className="d-md-flex">
            <div
              className="rounded p-2 bg-white shadow-sm mx-auto"
              style={{
                marginTop: "-3.5rem",
                maxWidth: `${props.avatarSize + 16}px`,
              }}
            >
              <Avatar
                shape="square"
                size={props.avatarSize}
                src={user.photoURL}
              />
            </div>
            <div className="ml-md-4 w-100">
              <Flex
                alignItems="center"
                mobileFlex={false}
                className="mb-3 text-md-left text-center"
              >
                <h2 className="mb-0">{user.displayName}</h2>
                <div className="ml-md-3 mt-3 mt-md-0">
                  <Button
                    style={{ marginLeft: 20 }}
                    size="small"
                    type="primary"
                  >
                    Follow
                  </Button>
                  <Button size="small" className="ml-2">
                    Message
                    </Button>
                  <Button size="small" className="ml-2" onClick={() => setUserDataFormVisible(true)}>
                    Edit
                  </Button>
                </div>
              </Flex>
              <Row gutter="16">
                <Col sm={24} md={8}>
                  <p className="mt-0 mr-3 text-muted text-md-left text-center">
                    {user.about}
                  </p>
                </Col>
                <Col xs={24} sm={24} md={8}>
                  <Row className="mb-2">
                    <Col xs={12} sm={12} md={9}>
                      <Icon
                        type={MailOutlined}
                        className="text-primary font-size-md"
                      />
                      <span className="text-muted ml-2">Email:</span>
                    </Col>
                    <Col xs={12} sm={12} md={15}>
                      <span className="font-weight-semibold">{user.email}</span>
                    </Col>
                  </Row>

                  {user.phone && (
                    <>
                      <Row>
                        <Col xs={12} sm={12} md={9}>
                          <Icon
                            type={PhoneOutlined}
                            className="text-primary font-size-md"
                          />
                          <span className="text-muted ml-2">Phone:</span>
                        </Col>
                        <Col xs={12} sm={12} md={15}>
                          <span className="font-weight-semibold">
                            {user.phone}
                          </span>
                        </Col>
                      </Row>
                    </>
                  )}
                </Col>
                {user.address || user.website ? (
                  <Col xs={24} sm={24} md={8}>
                    {user.address && (
                      <>
                        <Row className="mb-2 mt-2 mt-md-0 ">
                          <Col xs={12} sm={12} md={9}>
                            <Icon
                              type={HomeOutlined}
                              className="text-primary font-size-md"
                            />
                            <span className="text-muted ml-2">Address:</span>
                          </Col>
                          <Col xs={12} sm={12} md={15}>
                            <span className="font-weight-semibold">
                              {user.address}
                            </span>
                          </Col>
                        </Row>
                      </>
                    )}
                    {user.website && (
                      <>
                        <Row className="mb-2">
                          <Col xs={12} sm={12} md={9}>
                            <Icon
                              type={GlobalOutlined}
                              className="text-primary font-size-md"
                            />
                            <span className="text-muted ml-2">Website:</span>
                          </Col>
                          <Col xs={12} sm={12} md={15}>
                            <span className="font-weight-semibold">
                              {user.website}
                            </span>
                          </Col>
                        </Row>
                      </>
                    )}
                  </Col>
                ) : null}
              </Row>
            </div>
          </div>
        </Col>
      </Row>
      </Card>
      <Modal
        title={`Adicionar experiência`}
        visible={isUserDataFormVisible}
        onOk={onClickSubmit}
        confirmLoading={false}
        onCancel={() => setUserDataFormVisible(false)}
      >
        <Form
          {...layout}
          layout="vertical"
          form={userDataForm}
          name="control-hooks"
          onFinish={onFinish}
        >
          <Form.Item
            initialValue={user.about}
            name="about"
            label="Sobre"
            rules={[{ required: false }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            initialValue={user.address}
            name="address"
            label="Endereço"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={user.phone}
            name="phone"
            label="Telefone"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={user.website}
            name="website"
            label="Website"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
          </Form>
      </Modal>
    </>
  );
}

const Experiences = ({experiences, saveExperience}) => {
  const [isExperienceFormVisible, setExperienceFormVisible] = React.useState(false)
  const [experienceForm] = Form.useForm()

  const onFinish = async (values) => {
    console.log(experiences)
    setExperienceFormVisible(false);
    await saveExperience({
      title: values.title,
      description: values.description,
      startDate: values.startDate? firebase.firestore.Timestamp.fromDate(new Date(values.startDate)) : null,
      endDate: values.endDate? firebase.firestore.Timestamp.fromDate(new Date(values.endDate)) : null,
      company: values.company || "",
    });
    experienceForm.resetFields();
  };

  const onClickSubmit = async () => {
    try {
      await experienceForm.validateFields();
      experienceForm.submit();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Card title="Experiences">
    <div className="mb-3">
      <Row>
        <Col sm={24} md={22}>
          {experiences.map((elm, i) => {
            return (
              <div
                className={`${i === employementList.length - 1 ? "" : "mb-4"}`}
                key={`eduction-${i}`}
							>
								<AvatarStatus hideAvatar name={elm.title} subTitle={elm.startDate.toDate().toLocaleDateString('pt-BR', { year: "numeric", month: "long"}) + ' - ' + (elm.endDate ? elm.endDate.toDate().toLocaleDateString('pt-BR', { year: "numeric", month: "long"}) : 'Atual')}/>
                <p className="pl-5 mt-2 mb-0">{elm.description}</p>
              </div>
            );
          })}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            onClick={() => {
              setExperienceFormVisible(true)
          }}
          >
            Insert
          </Button>
        </Col>
      </Row>
    </div>
      </Card>
      <Modal
        title={`Adicionar experiência`}
        visible={isExperienceFormVisible}
        onOk={onClickSubmit}
        confirmLoading={false}
        onCancel={() => setExperienceFormVisible(false)}
      >
        <Form
          {...layout}
          layout="vertical"
          form={experienceForm}
          name="control-hooks"
          onFinish={onFinish}
        >
          <Form.Item
            name="title"
            label="Cargo"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="company"
            label="Empresa"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Descrição"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Data de Inicio"
            rules={[{ required: true }]}
          >
            <DatePicker format="MMMM YYYY"/>
          </Form.Item>
          <Form.Item
            name="endDate"
            label="Data de Fim"
            rules={[{ required: false }]}
          >
            <DatePicker format="MMMM YYYY" defaultValue={null}/>
          </Form.Item>
          </Form>
      </Modal>
      </>
);
        }

const Interested = () => (
  <Card title="Interested">
    <Row gutter={30}>
      <Col sm={24} md={12}>
        {interestedList
          .filter((_, i) => i < 4)
          .map((elm, i) => {
            return (
              <div className="mb-3" key={`interested-${i}`}>
                <h4 className="font-weight-semibold">{elm.title}</h4>
                <p>{elm.desc}</p>
              </div>
            );
          })}
      </Col>
      <Col sm={24} md={12}>
        {interestedList
          .filter((_, i) => i >= 4)
          .map((elm, i) => {
            return (
              <div className="mb-3" key={`interested-${i}`}>
                <h4 className="font-weight-semibold">{elm.title}</h4>
                <p>{elm.desc}</p>
              </div>
            );
          })}
      </Col>
    </Row>
  </Card>
);

const Connection = () => (
  <Card title="Connection">
    {connectionList.map((elm, i) => {
      return (
        <div
          className={`${i === connectionList.length - 1 ? "" : "mb-4"}`}
          key={`connection-${i}`}
        >
          <AvatarStatus src={elm.img} name={elm.name} subTitle={elm.title} />
        </div>
      );
    })}
  </Card>
);

const Group = () => (
  <Card title="Group">
    {groupList.map((elm, i) => {
      return (
        <div
          className={`${i === groupList.length - 1 ? "" : "mb-4"}`}
          key={`connection-${i}`}
        >
          <AvatarStatus src={elm.img} name={elm.name} subTitle={elm.desc} />
        </div>
      );
    })}
  </Card>
);

const Profile = (props) => {
  const avatarSize = 150;
	const data = useProfile();
  return (
    <>
      <PageHeaderAlt
        background="/img/others/img-12.jpg"
        cssClass="bg-primary"
        overlap
      >
        <div className="container text-center">
          <div className="py-5 my-md-5"></div>
        </div>
      </PageHeaderAlt>
      <div className="container my-4">
        <ProfileInfo
          avatarSize={avatarSize}
          user={{ ...props.user, ...data.profile }}
          saveUserData = {data.saveUserData}
        />
        <Row gutter="16">
					<Col xs={24} sm={24} md={16}>
            <Experiences experiences={data.experiences} saveExperience={data.saveExperience}/>
          </Col>
        </Row>
      </div>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps)(Profile);
