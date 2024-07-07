import React, { useState } from "react";
import { Modal, Form, Input, Upload, Button, Progress, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import axiosInstance from "../api/axios";

interface VideoUploadModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const VideoUploadModal: React.FC<VideoUploadModalProps> = ({
  visible,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);

  const beforeUpload = (file: File) => {
    if (file.size > 6 * 1024 * 1024) {
      message.error("File must be smaller than 6MB!");
      return Upload.LIST_IGNORE;
    }
    setFile(file);
    return false;
  };

  const handleUpload = async () => {
    try {
      await form.validateFields();
      if (!file) {
        message.error("Please select a video file.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "userVideos");

      setUploading(true);
      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/video/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      const videoUrl = cloudinaryResponse.data.secure_url;

      await axiosInstance.post("/videos/upload", {
        title: form.getFieldValue("title"),
        description: form.getFieldValue("description"),
        url: videoUrl,
      });

      setUploading(false);
      setUploadProgress(0);
      setFile(null);
      form.resetFields();
      onClose();
      onSuccess();
      message.success("Video uploaded successfully...");
    } catch (error) {
      console.error("Error uploading video:", error);
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Modal open={visible} title="Upload Video" onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[
            { required: true, message: "Please enter the video title" },
            { max: 30 * 4, message: "Title should be under 30 words" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please enter the video description" },
            { max: 120 * 4, message: "Description should be under 120 words" },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Video">
          <Upload accept="video/mp4" maxCount={1} beforeUpload={beforeUpload}>
            <Button icon={<UploadOutlined />}>
              Select Video (MP4 only, max 6MB)
            </Button>
          </Upload>
        </Form.Item>
        {uploadProgress > 0 && <Progress percent={uploadProgress} />}
        <Form.Item>
          <Button type="primary" onClick={handleUpload} loading={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default VideoUploadModal;
