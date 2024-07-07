import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { saveAvatar } from "../api/userProfile";

const avatarUpload = () => {
  const { user, setUser } = useAuth();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1048576) {
        setError("File size should be under 1MB");
        setImage(null);
        setImagePreview(null);
      } else if (!["image/jpeg", "image/png"].includes(file.type)) {
        setError("File should be JPG or PNG");
        setImage(null);
        setImagePreview(null);
      } else {
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
        setError(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "videoVaultAvatar"); // Set up an unsigned upload preset in Cloudinary

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log({ data });
      if (data.secure_url) {
        const avatar = data.secure_url;
        const response = await saveAvatar(avatar);
        console.log({ response });
        setUser((prev) => {
          if (!prev) return null;
          const updatedUser = { ...prev, avatar };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          return updatedUser;
        });
        setImage(null);
        setImagePreview(null);
      }
    } catch (err) {
      setError("Upload failed, please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 justify-center">
      {!image && (
        <div>
          <img
            className="w-[120px] h-[120px] object-cover rounded-full"
            src={user?.avatar || "/user.png"}
            alt=""
          />
        </div>
      )}

      <div className="flex flex-col items-center">
        <h2 className="mb-2">Upload Profile Picture</h2>
        {error && <p className="text-red-500">{error}</p>}

        <input
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
        />
        {image && <p>Selected file: {image.name}</p>}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Image Preview"
            className="mt-4 max-w-xs rounded w-[120px] h-[120px] object-cover"
          />
        )}
        <button
          onClick={handleUpload}
          disabled={!image || uploading}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default avatarUpload;
