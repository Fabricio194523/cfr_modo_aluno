import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "@services/api";
import { Toast } from "native-base";

import { UserDTO } from "../dTos/UserDTO";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (username: string, password: string) => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);

  async function signIn( username: string, password: string) {
    const data = {
        username,
        password,
        client_id: 'YsUns9jisQeb8DIstVIs58XFp4JRADQXG5WrqsVC',
        client_secret:
          '6xJv7mSNEIPQgSeBsak6isx1oNiwOanQYkVeJSxBoHYoNCfosuupl3ik0oxwWoi5NZ8z9pUDyo9KTAaHyqlSYC8t5zRgvGqjMuSDUFn9EmYoFZm4SQAPdtm0vg1RIj0X',
        grant_type: 'password',
      };

      const config = {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      };

      api
      .post('/auth/token', data, config)
      .then((response) => {
        const {access_token} = response.data;
      })
      .catch((err) => {

        const title = 'Login ou senha incorretos.'
          
          Toast.show({
              title,
              placement: 'top',
              bgColor: "red.500",
          })
      }).finally(() => {
        
      });

      

  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
