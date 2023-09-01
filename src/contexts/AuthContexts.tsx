import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "@services/api";
import { Toast } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  storageUserSave,
  storageUserGet,
  storageUserRemove,
} from "@storage/storage.User";
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@storage/storageAuthToken";

export type AuthContextDataProps = {
  signIn: (username: string, password: string) => Promise<void>;
  token: string;
  isLoadingUserStorageData: boolean;
  signOut: () => void;
  usernameUser: string;
  emailUser: string;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [token, setToken] = useState("");
  const [usernameUser, setUsernameUser] = useState("")
  const [emailUser, setEmailUser] = useState("")
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function userAndTokenUpdate(username: string, token: string) {
    setToken(token);
    setUsernameUser(username)
  }

  async function storageUserAndTokenSave(username: string, token: string) {
    try {
      setIsLoadingUserStorageData(true)

      await storageUserSave(username)
      await storageAuthTokenSave(token)
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }

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

    api
      .post('/auth/token', data, config)
      .then((response) => {
        const { access_token } = response.data;
        storageUserAndTokenSave(username, access_token)
        userAndTokenUpdate(username, access_token)
      })
      .catch((err) => {
        let title = '';

        if (err.message === "Invalid credentials given.", "invalid_grant") {
          title = 'Login ou senha incorretos.';
        }

        Toast.show({
          title,
          placement: 'top',
          bgColor: "red.500",
        })
      }).finally(() => {
        setIsLoadingUserStorageData(false)
      });

    api.get(`/rh_cfr/api/aluno/?username=${username}&turma=&nome=&nome__in=&nome__startswith=&email=&email__in=&ativo=&id=`)
      .then((response) => {
        var responseId = response.data.map((student: any) => {
          setEmailUser(student.email)
          let aluno = student.pk
          return aluno
        })
        AsyncStorage.setItem("alunoID", String(responseId))
      })
  }

  async function loadUserData() {

    const userLogged = await storageUserGet();
    const token: any = await storageAuthTokenGet()

    if (userLogged) {
      userAndTokenUpdate(userLogged, token);
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
      await storageAuthTokenRemove()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, token, isLoadingUserStorageData, signOut, usernameUser, emailUser }}>
      {children}
    </AuthContext.Provider>
  );
}
