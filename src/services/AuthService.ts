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
  passwordConfirmation: string;
  subscriptionPlan: string;
};

const authService = () => {
  const baseUrl = "https://livros-gamificados-api.herokuapp.com/api";

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
