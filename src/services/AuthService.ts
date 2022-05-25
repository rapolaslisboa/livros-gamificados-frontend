import axios from "axios";

type LoginData = {
  email: string;
  password: string;
};

type SignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  subscriptionPlan: string;
};

const authService = () => {
  const baseUrl = process.env.REACT_APP_API_URL;

  const identity = axios.create({
    baseURL: baseUrl,
  });

  return {
    login: async (data: LoginData) => {
      return await identity.post("/login", data);
    },
    signUp: async (data: SignUpData) => {
      return await identity.post("/signup", data);
    },
  };
};

export { authService };
