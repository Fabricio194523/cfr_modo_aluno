import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "@services/api";
import { Toast } from "native-base";

import {
  storageUserSave,
  storageUserGet,
  storageUserRemove,
} from "@storage/storage.User";

export type AuthContextDataProps = {
  signIn: (username: string, password: string) => Promise<void>;
  token: string;
  isLoadingUserStorageData: boolean;
  signOut: () => void;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [token, setToken] = useState("");
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function userAndTokenUpdate(token: string) {
    setToken(token);
  }

  async function signIn(username: string, password: string) {
    const data = {
      username,
      password,
      client_id: "YsUns9jisQeb8DIstVIs58XFp4JRADQXG5WrqsVC",
      client_secret:
        "6xJv7mSNEIPQgSeBsak6isx1oNiwOanQYkVeJSxBoHYoNCfosuupl3ik0oxwWoi5NZ8z9pUDyo9KTAaHyqlSYC8t5zRgvGqjMuSDUFn9EmYoFZm4SQAPdtm0vg1RIj0X",
      grant_type: "password",
    };

    const config = {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await api.post("/auth/token", data, config);
      const { access_token } = response.data;
      setToken(access_token);
      storageUserSave(access_token);
    } catch (err) {
      const title = "Usuário ou senha incorretos.";

      Toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      }).finally(() => {
        setIsLoadingUserStorageData(false)
      });
    }
  }

  async function loadUserData() {
    const userLogged = await storageUserGet();

    if (userLogged) {
      userAndTokenUpdate(userLogged);
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  async function signOut(): Promise<void> {
    try {
      setIsLoadingUserStorageData(true)
      setToken('')
      await storageUserRemove()
      
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  return (
    <AuthContext.Provider value={{signIn, token, isLoadingUserStorageData, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
