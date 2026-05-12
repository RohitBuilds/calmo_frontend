import API from "../api/axios";

export const signupUser = async (data) => {
  const response = await API.post("users/create", data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await API.post("users/login", data);
  return response.data;
};

export const getProfile = async () => {
  const response = await API.get("/profile");
  return response.data;
};