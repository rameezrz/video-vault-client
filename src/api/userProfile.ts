import axios from "./axios";

export const saveAvatar = async (avatar: string) => {
  try {
    const response = await axios.post("/users/avatar", {
      avatar,
    });
    return { status: response?.status, message: response?.data?.message };
  } catch (error: any) {
    return {
      status: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};
