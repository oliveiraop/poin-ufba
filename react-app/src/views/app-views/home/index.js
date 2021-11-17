import React from "react";
import {
  Skeleton,
  Switch,
  Card,
  Avatar,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Typography,
  Divider,
} from "antd";
import { Input, Select } from "antd";
import {
  EditOutlined,
  CalendarOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";

const { Meta } = Card;
const { TextArea } = Input;

const { Option } = Select;

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const Home = (props) => {
  const { user } = props;
  const [loading, setLoading] = React.useState(true);
  const [isPostFormVisible, setPostFormVisible] = React.useState(false);
  const [form] = Form.useForm();

  const [feed, setFeed] = React.useState([
    {
      id: 1,
      title: "Title 1",
      description: "Description 1",
      createdAt: new Date(),
    },
    {
      id: 2,
      title: "Title 2",
      description: "Description 1",
      createdAt: new Date(),
    },
    {
      id: 3,
      title: "Title 3",
      description: "Description 1",
      createdAt: new Date(),
    },
  ]);

  const onFinish = (values) => {
    console.log("onFinish", values);
    setPostFormVisible(false);

    setFeed([
      {
        id: feed.length + 1,
        title: values.title,
        description: values.description,
        createdAt: new Date(),
      },
      ...feed,
    ]);
    form.resetFields();
    setLoading(false);
  };

  React.useEffect(() => {
    setLoading(user == null);
  }, [user]);

  const onClickPost = (type) => {
    setPostFormVisible(true);
  };

  const onClickSubmit = async () => {
    try {
      await form.validateFields();
      form.submit();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Row>
        <Col span={16} push={4}>
          <Card
            actions={[
              <Button type="text" onClick={() => onClickPost("event")}>
                <CalendarOutlined key="calendar" /> Evento
              </Button>,
              <Button type="text" onClick={() => onClickPost("job")}>
                <ContactsOutlined key="jobs" /> Vaga
              </Button>,
              <Button type="text" onClick={() => onClickPost("text")}>
                <EditOutlined key="edit" /> Texto
              </Button>,
            ]}
          >
            <Skeleton loading={loading} avatar active>
              <Meta
                avatar={<Avatar src={user ? user.photoURL : ""} />}
                title="O que você gostaria de postar agora?"
                description="Clique em uma opção para iniciar uma postagem"
              />
            </Skeleton>
          </Card>
        </Col>
      </Row>

      {feed.map((post) => (
        <Row>
          <Col span={16} push={4}>
            <Card style={{ marginTop: 16 }}>
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={post.title}
                description={post.description}
              />
              <Divider />
              <Typography.Text type="secondary">
                Em {post.createdAt.toLocaleString()}
              </Typography.Text>
            </Card>
          </Col>
        </Row>
      ))}

      <Modal
        title="Criar Postagem"
        visible={isPostFormVisible}
        onOk={onClickSubmit}
        confirmLoading={loading}
        onCancel={() => setPostFormVisible(false)}
      >
        <Form
          {...layout}
          layout="vertical"
          form={form}
          name="control-hooks"
          onFinish={onFinish}
        >
          <Form.Item name="title" label="Título" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Descrição"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps)(Home);
