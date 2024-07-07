import { useAuth } from "../context/AuthContext";
import AvatarUpload from "../components/AvatarUpload";
import { useState } from "react";
import { capitalize } from "../utils/inputValidation";
import { Button } from "antd";
import AddBioModal from "../components/AddBioModal";

const Dashboard = () => {
  const { user } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bio, setBio] = useState("");

  const handleAddBio = () => {
    setIsModalVisible(true);
  };

  const handleSaveBio = async (newBio: string) => {
    setBio(newBio);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex-col w-full p-6 items-center justify-center bg-gray-100">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="bg-white p-6 rounded shadow-md">
        {user && (
          <div className="flex ">
            <div className="flex-2">
              <AvatarUpload />
            </div>
            <div className="mr-32 flex-2">
              <p>
                <strong>Name:</strong>{" "}
                {`${capitalize(user.firstName)} ${capitalize(user.lastName)}`}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Mobile:</strong> {user.mobile}
              </p>
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <p>
                  <strong>Bio:</strong>
                </p>
                <Button type="primary" onClick={handleAddBio}>
                  Add Bio
                </Button>
              </div>

              <div className="max-h-40 overflow-y-scroll">
                <p>{user.bio}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <AddBioModal
        visible={isModalVisible}
        onClose={handleModalClose}
        onSave={handleSaveBio}
      />

      <h2 className="text-2xl my-4">My Videos</h2>
    </div>
  );
};

export default Dashboard;
