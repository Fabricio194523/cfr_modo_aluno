import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Flex,
  Stack,
  VStack,
  Text,
  Center,
  Box,
  Button,
  Heading,
  useToast,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Input } from "../../components/Input";

import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigateRoutesProps } from "@routes/auth.routs";
import { AppError } from "@utils/AppError";

type FormDataProps = {
  username: string;
  password: string;
};

export function SignIn() {
  const { signIn } = useAuth();

  const navigation = useNavigation<AuthNavigateRoutesProps>();

  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>();

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const toast = useToast();

   async function handleSignIn({ username, password }: FormDataProps) {
    try {
      setIsLoading(true)
      await signIn(username, password)
      
  } catch (error) {
      const isAppError = error instanceof AppError;

      const title = 'Não foi possível entrar. Tente novamente'

      setIsLoading(false)
      
      toast.show({
          title,
          placement: 'top',
          bgColor: "red.500",
      })
  } finally {
      setIsLoading(false)
  }
  };
  
  return (
    <VStack flex={1}>
      <Stack minH="350px" pt="130px" backgroundColor="green.900">
        <Flex position={"absolute"} right={0} mt="50px" mr="28px">
          <Text 
            fontFamily={"Poppins-Regular"} 
            fontSize={"18px"} 
            color="white"
          >
            CFR-PTN
          </Text>
        </Flex>
        <Flex w="250px" ml="28px">
          <Text 
            fontFamily={"Poppins-Bold"} 
            fontSize={"24px"} 
            color="white"
          >
            Casa Familia Rural Tancredo Neves
          </Text>
        </Flex>
      </Stack>
      <Center>
        <Box
          h="100%"
          w="343px"
          bg="white"
          borderColor="#E6E6F0"
          borderWidth={1}
          mt="-150px"
          position={"relative"}
          borderRadius="7px"
        >
          <Center>
            <Flex mt="30px">
              <Heading fontSize={24} fontFamily={"Poppins-SemiBold"}>
                Faça Login
              </Heading>
            </Flex>
            <Flex mt="60px">
              <Controller
                control={control}
                name="username"
                rules={{
                  required: "Informe o seu usuario",
                }}
                render={({ field: { onChange } }) => (
                  <>
                    <Text
                      fontSize={16}
                      fontFamily={"Achivo-Regular"}
                      color="gray.100"
                    >
                      Usuario
                    </Text>
                    <Input
                      placeholder="Nome do usuario"
                      fontSize={16}
                      onChangeText={onChange}
                      borderColor="black"
                      color="black"
                      w="311px"
                      h="50px"
                    />
                  </>
                )}
              />
            </Flex>
            <Flex mt="20px">
              <Controller
                control={control}
                name="password"
                rules={{ required: "Informe a senha" }}
                render={({ field: { onChange } }) => (
                  <>
                    <Text
                      fontSize={16}
                      fontFamily={"Achivo-Regular"}
                      color="gray.100"
                    >
                      Senha
                    </Text>
                    <Input
                      type={passwordShown ? "text" : "password"}
                      placeholder="*********"
                      onChangeText={onChange}
                      errorMessage={errors.password?.message}
                      borderColor="black"
                      color="black"
                      w="311px"
                      h="50px"
                      onSubmitEditing={handleSubmit(handleSignIn)}
                      returnKeyType="send"
                    />
                    <Button
                      position={"absolute"}
                      onPress={togglePasswordVisiblity}
                      right={0}
                      top={6}
                      background="transparent"
                    >
                      <MaterialIcons
                        name="visibility-off"
                        size={28}
                        color={passwordShown ? "#7C7C8A" : "#333"}
                      />
                    </Button>
                  </>
                )}
              />
            </Flex>
            <Flex mt="30px">
              <Button
                w="311px"
                h="51px"
                fontFamily={"Poppins-Medium"}
                bgColor="orange.400"
                borderRadius={"7px"}
                onPress={handleSubmit(handleSignIn)}
                isLoading={isLoading}
              >
                Entrar
              </Button>
            </Flex>
          </Center>
        </Box>
      </Center>
    </VStack>
  );
}
