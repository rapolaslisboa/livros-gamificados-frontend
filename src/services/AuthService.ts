import axios from "axios";

type LoginData = {
  email: string;
  password: string;
};

const AuthService = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  
  const identity = axios.create({
    baseURL: baseUrl,
  });

  return {
    login: async (data: LoginData) => {
      return await identity.post("/login", data);
    },
  };
};

export { AuthService };
