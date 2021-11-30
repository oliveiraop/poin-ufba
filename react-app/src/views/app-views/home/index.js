import React, { useRef } from "react";
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
import { usePostagem } from "../../../hooks/usePostagem";
import FeedCard from "../../../components/app-components/FeedCard"
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
  const { posts, isLoading, savePost } = usePostagem();

  const postType = useRef("");

  const onFinish = async (values) => {
    setPostFormVisible(false);
    await savePost({
      title: values.title,
      description: values.description,
      createdAt: new Date(),
      postType: postType.current,
    });
    form.resetFields();
    setLoading(false);
  };

  React.useEffect(() => {
    setLoading(user == null);
  }, [user]);

  const onClickPost = (type) => {
    postType.current = type;
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

      {posts.map((post, index) => (
        <Row key={`${index}-${post.user.id}`}>
          <Col span={16} push={4}>
            <FeedCard post={post}/>
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
