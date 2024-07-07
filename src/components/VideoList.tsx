import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { List, Modal, Button } from "antd";
import VideoCard from "./VideoCard";

interface VideoListProps {
  refresh: boolean;
}

const VideoList: React.FC<VideoListProps> = ({ refresh }) => {
  const [videos, setVideos] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    fetchVideos();
  }, [refresh]);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`/videos/user`, {});
      setVideos(response.data.videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const showModal = (video: any) => {
    setSelectedVideo(video);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedVideo(null);
  };

  return (
    <div>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={videos}
        renderItem={(video) => (
          <List.Item>
            <VideoCard video={video} onReadMore={showModal} />
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

export default VideoList;
