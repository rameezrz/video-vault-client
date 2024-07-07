import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { List, Avatar, Button, Row, Col, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import { capitalize } from "../utils/inputValidation";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  videos: Video[];
}

interface Video {
  _id: string;
  title: string;
  url: string;
  description: string;
}

const AllUsersVideos: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsersWithVideos();
  }, []);

  const fetchUsersWithVideos = async () => {
    try {
      const response = await axios.get("/videos");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users and videos:", error);
    }
  };

  const handleViewMore = (userId: string) => {
    navigate(`/user/${userId}`);
  };

  const showModal = (video: Video) => {
    setSelectedVideo(video);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedVideo(null);
  };

  return (
    <div className="px-10">
      <List
        itemLayout="vertical"
        dataSource={users}
        renderItem={(user) => (
          <List.Item key={user._id}>
            <List.Item.Meta
              avatar={<Avatar size={64} src={user.avatar || "/user.png"} />}
              title={
                <strong>{`${capitalize(user.firstName)} ${capitalize(
                  user.lastName
                )}`}</strong>
              }
              description={
                <Link className="underline" to={`/user/${user._id}`}>
                  View More Videos
                </Link>
              }
            />
            <Row gutter={[5, 5]} justify={"space-evenly"}>
              {user.videos.map((video) => (
                <Col key={video._id} xs={24} sm={12} md={8} lg={4}>
                  <VideoCard video={video} onReadMore={showModal} />
                </Col>
              ))}
            </Row>
          </List.Item>
        )}
      />

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

export default AllUsersVideos;
