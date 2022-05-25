import React, { createContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import { userService } from "../services/userService";

interface AuthContextProps {
  authenticated: boolean;
  getUser(): Promise<{ [key: string]: any } | undefined>;
  authenticate(email: string, password: string): Promise<void>;
  signOut(): void;
  user: { [key: string]: any } | null;
}

const AuthContext = createContext({} as AuthContextProps);

type Props = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<{ [key: string]: any } | null>(null);

  const authenticate = async (email: string, password: string) => {
    const { login } = authService();
    const { getUserInfo } = userService();
    const response = await login({ email, password });
    localStorage.setItem("token", response.data.accessToken!);
    const userInfo = await getUserInfo();
    setUser(userInfo);
    setUser({});
  };

  const signOut = async () => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
  };

  const getUser = async () => {
    if (user) return user;
    const tokenExists = localStorage.getItem("accesToken");

    if (tokenExists) {
      try {
        // const userData = await customerService.getCustomer();
        // setUser(userData);
        // return userData;
      } catch (e) {
        signOut();
      }
    }
  };

  const sharedValues: AuthContextProps = {
    authenticated: !!user,
    authenticate,
    getUser,
    signOut,
    user,
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={sharedValues}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
