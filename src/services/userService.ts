import axios from "axios";

const userService = () => {
  const baseUrl = "https://livros-gamificados-api.herokuapp.com/api";

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
