import { useAuth } from "../context/AuthContext";
import AvatarUpload from "../components/AvatarUpload";
import { useState } from "react";
import { capitalize } from "../utils/inputValidation";
import { Button } from "antd";
import AddBioModal from "../components/AddBioModal";
import VideoUploadModal from "../components/VideoUploadModal";
import VideoList from "../components/VideoList";

const Dashboard = () => {
  const { user } = useAuth();
  const [isBioModal, setIsBioModal] = useState(false);
  const [isUploadVideoModal, setIsUploadVideoBioModal] = useState(false);
  const [bio, setBio] = useState("");
  const [refreshVideos, setRefreshVideos] = useState(false);

  const handleAddBio = () => {
    setIsBioModal(true);
  };

  const handleSaveBio = async (newBio: string) => {
    setBio(newBio);
  };

  const handleBioModalClose = () => {
    setIsBioModal(false);
  };

  const handleUploadVideoModalClose = () => {
    setIsUploadVideoBioModal(false);
  };

  const handleVideoUploadSuccess = () => {
    setRefreshVideos(!refreshVideos); // Toggle the state to refresh the videos
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
        visible={isBioModal}
        onClose={handleBioModalClose}
        onSave={handleSaveBio}
      />

      <div className="flex justify-between items-center mt-3">
        <h2 className="text-2xl my-4">My Videos</h2>
        <Button type="primary" onClick={() => setIsUploadVideoBioModal(true)}>
          Upload Video
        </Button>
        <VideoUploadModal
          visible={isUploadVideoModal}
          onClose={handleUploadVideoModalClose}
          onSuccess={handleVideoUploadSuccess}
        />
      </div>
      <VideoList refresh={refreshVideos} />
    </div>
  );
};

export default Dashboard;
