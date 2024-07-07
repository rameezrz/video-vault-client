import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Form, message } from "antd";
import { useAuth } from "../context/AuthContext";
import { addBio } from "../api/userProfile";

const { TextArea } = Input;

interface AddBioModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (bio: string) => void;
}

const AddBioModal: React.FC<AddBioModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [bio, setBio] = useState("");
  const [form] = Form.useForm();
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (user?.bio) {
      setBio(user.bio);
      form.setFieldsValue({ bio: user.bio });
    }
  }, [user, form]);

  const handleSave = async () => {
    if (bio.split(" ").length > 500) {
      message.error("Bio cannot exceed 500 words.");
    } else {
      const response = await addBio(bio);
      if (response?.status === 200) {
        setUser((prev) => {
          if (!prev) return null;
          const updatedUser = { ...prev, bio };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          return updatedUser;
        });
        setBio("");
        onSave(bio);
        onClose();
      } else {
        message.error("Some error occured. please try later...");
      }
    }
  };

  return (
    <Modal
      title="Add Bio"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <Form form={form}>
        <Form.Item
          name="bio"
          rules={[
            {
              required: true,
              message: "Please enter your bio",
            },
          ]}
        >
          <TextArea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Enter your bio (max 500 words)"
          />
        </Form.Item>
        <p className={`${bio.split(" ").length > 500 ? "text-red-600" : ""}`}>
          {bio.split(" ").length} / 500 words
        </p>
      </Form>
    </Modal>
  );
};

export default AddBioModal;
