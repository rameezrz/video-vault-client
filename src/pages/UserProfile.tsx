import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Card, Avatar, Typography, Button, Modal } from "antd";
import axios from "../api/axios";
import VideoCard from "../components/VideoCard";
import { capitalize } from "../utils/inputValidation";

const { Title } = Typography;

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  avatar: string;
  videos: Video[];
}

interface Video {
  _id: string;
  title: string;
  url: string;
  description: string;
}

const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const showModal = (video: Video) => {
    setSelectedVideo(video);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedVideo(null);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Card>
        <Row gutter={[16, 16]} align="middle">
          <Col>
            <Avatar size={64} src={user.avatar || "/user.png"} />
          </Col>
          <Col>
            <Title level={3}>{`${capitalize(user.firstName)} ${capitalize(
              user.lastName
            )}`}</Title>
            <p className="-mt-3 text-lg">{user.email}</p>
          </Col>
          <Col>
            <Title level={3}>Bio :</Title>
            <div className="max-h-40 overflow-y-scroll">
              <p>{user.bio}</p>
            </div>
          </Col>
        </Row>
      </Card>

      <div style={{ marginTop: "20px" }}>
        <Row gutter={[16, 16]}>
          {user.videos.map((video) => (
            <Col xs={24} sm={12} md={8} lg={6} key={video._id}>
              <VideoCard video={video} onReadMore={showModal} />
            </Col>
          ))}
        </Row>
      </div>

      {selectedVideo && (
        <Modal
          title={selectedVideo.title}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="close" onClick={handleCancel}>
              Close
            </Button>,
          ]}
        >
          <p>{selectedVideo.description}</p>
        </Modal>
      )}
    </div>
  );
};

export default UserProfile;
