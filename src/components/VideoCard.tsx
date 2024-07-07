import React from "react";
import { Card, Button } from "antd";

interface Video {
  _id: string;
  title: string;
  url: string;
  description: string;
}

interface VideoCardProps {
  video: Video;
  onReadMore: (video: Video) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onReadMore }) => {
  return (
    <Card
      hoverable
      cover={
        <video
          src={video.url}
          controls
          width="100%"
          style={{ height: "200px", objectFit: "cover" }}
        />
      }
    >
      <Card.Meta
        title={video.title}
        description={
          <div>
            {`${video.description.substring(0, 50)}...`}
            <Button
              type="link"
              onClick={() => onReadMore(video)}
              style={{ padding: 0, marginLeft: 5 }}
            >
              Read More
            </Button>
          </div>
        }
      />
    </Card>
  );
};

export default VideoCard;
