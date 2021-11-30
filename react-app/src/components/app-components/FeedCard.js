import React from "react";
import { Typography, Divider, Card, Avatar, Badge, Tag } from "antd";

const { Meta } = Card;

export default function FeedCard({ post }) {
  return (
    <div>
      <Card style={{ marginTop: 16 }}>
        <Meta
          avatar={<Avatar src={post.user.avatar} />}
          title={post.title}
          description={
            "Postado em " + new Date(post.createdAt).toLocaleString()
          }
          style={{
            marginBottom: 20,
          }}
        />

        <Typography.Text>
          {post.description} <br />
        </Typography.Text>
        {post.postType === "job" ? (
          <Typography.Text>
            Empresa: {post.company ? post.company : "Confidencial"} <br />
          </Typography.Text>
        ) : null}
        {post.postType === "event" ? (
          <Typography.Text>
            Local do Evento: {post.location ? post.location : "Não informado"}{" "}
            <br />
            Data do evento:{" "}
            {post.date
              ? new Date(post.date).toLocaleString()
              : "Não informado"}{" "}
            <br />
          </Typography.Text>
        ) : null}
        <Divider />
      </Card>
      <Tag
        style={{
          position: "absolute",
          right: -10,
          top: 15,
        }}
        color={
          post.postType === "job"
            ? "#f50"
            : post.postType === "event"
            ? "#2db7f5"
            : "#87d068"
        }
      >
        {post.postType === "job"
          ? "Vaga"
          : post.postType === "event"
          ? "Evento"
          : "Postagem"}
      </Tag>
    </div>
  );
}
