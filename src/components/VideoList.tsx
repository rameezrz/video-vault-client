import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { List, Card } from "antd";

const VideoList: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`/videos/user`, {});
      setVideos(response.data.videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  return (
    <div>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={videos}
        renderItem={(video) => (
          <List.Item>
            <Card
              title={video.title}
              cover={<video src={video.url} controls width="100%" />}
            >
              <div className="max-h-32 overflow-y-scroll">
                <p>{video.description}</p>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default VideoList;
