import axios from "axios";

const userService = () => {
  const baseUrl = process.env.REACT_APP_API_URL;

  const identity = axios.create({
    baseURL: baseUrl,
  });

  return {
    getUserInfo: async () => {
      return await identity.get("/user-info");
    },
  };
};

export { userService };
