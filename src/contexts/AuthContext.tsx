import React, { createContext, useEffect, useState } from "react";

interface AuthContextProps {
  authenticated: boolean;
  getUser(): Promise<{ [key: string]: any } | undefined>;
  signIn(email: string, password: string): void;
  signOut(): void;
}

const AuthContext = createContext({} as AuthContextProps);

type Props = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<{ [key: string]: any } | null>(null);

  const signIn = async (email: string, password: string) => {
    // const result = await authService.login({ email, password });
    // if (!result) throw new Error("Unexpected error on login");
    // localStorage.setItem("token", result.token!);
    // localStorage.setItem("refreshToken", result.refreshToken!);
    // const userData = await customerService.getCustomer();
    // setUser(userData);
    // return userData;
  };

  const signOut = async () => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
  };

  const getUser = async () => {
    if (user) return user;
    const tokenExists = localStorage.getItem("token");

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
    signIn,
    getUser,
    signOut,
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={sharedValues}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

