import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { Flex, Stack, Text, VStack, ScrollView, Image, useToast } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";


import { api } from "@services/api";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Ionicons } from '@expo/vector-icons'

import Seta from "@assets/seta.svg";
import Loading from "@components/Loading";
import { UserPhoto } from "@components/UserPhoto";

import React from "react";
import Galleryadd from "@assets/galleryadd.svg";

type RouteParamsProps = {
    detailsId: string;
}

export interface AcompanhamentoData {
    id: string,
    aluno: {
        first_name: string,
        last_name: string,
        imagem: string,
        turma: {
            nome: string,
        }
    },
    imagem: string,
    educador: {
        email: string,
    }
    data: string,
    situacao_produtiva: string,
    situacao_pedagogica: string,
    situacao_familiar: string,
    comunidade: string,
    recomendacao: string,
    ativo: boolean,
    // Dados offline
    _raw: {
        //Sync status
        _status: string
    }
    imageStudent: string,
    nome: string,
}

export default function Details() {
    
    const [details, setDetails] = useState<AcompanhamentoData>({} as AcompanhamentoData)

    const navigation = useNavigation<AppNavigatorRoutesProps>()

    const [loading, setLoadging] = useState(true)
    const toast = useToast()
    const route = useRoute()

    const { detailsId } = route.params as RouteParamsProps

    function handleGoBack() {
        navigation.goBack()
    }

    async function fetchDetails() {
        setLoadging(true)
        try {
            const response = await api.get(`/empresarial/api/acompanhamento/${detailsId}`)
            setDetails(response.data)
            if (response) {
                setLoadging(false)
            }

        } catch (error) {
            const title = 'Não foi possível carregar os detalhes do acompanhamento. Tente novamente'

            toast.show({
                title,
                placement: 'top',
                bgColor: "red.500",
            })
        }
    }

    useEffect(() => {
        fetchDetails()
    }, [detailsId])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {loading ? <Loading /> : (
                <VStack flex={1}>
                    <Stack
                        h="350px"
                        pt="80px"
                        backgroundColor="#016C31"
                    >
                        <Flex ml={"25px"} mt="-5px">
                            <Seta onPress={handleGoBack} />
                        </Flex>
                    </Stack>
                    <ScrollView mt="-210px" mx="auto">
                        <Stack
                            px="16px"
                            w="343px"
                            h="100%"
                            flex={1}
                            backgroundColor={"white"}
                            position={"relative"}
                            zIndex={9999}
                            borderRadius="7px"
                            borderColor="#E6E6F0"
                            borderWidth={1}
                        >
                            <Flex mt="30px" display="flex" flexDirection={"row"} justifyContent={"space-between"}>
                                <Flex>
                                    <Text fontSize={24} color="#333">Detalhes</Text>
                                </Flex>
                            </Flex>
                            <Flex
                                mt="20px"
                                ml="4px"
                                flexDirection={"row"}
                                justifyContent={"space-between"}
                                borderBottomColor="#363B57"
                                borderBottomWidth={0.6}
                            >
                                <Flex>
                                    <Text fontSize={14} color="#333">Aluno :</Text>
                                </Flex>
                                <Flex mb="5px">
                                    <Text fontSize={14} color="#333">{details.aluno.first_name + " " + details.aluno.last_name}</Text>
                                </Flex>
                            </Flex>
                            <Flex
                                mt="20px"
                                ml="4px"
                                flexDirection={"row"}
                                justifyContent={"space-between"}
                                borderBottomColor="#363B57"
                                borderBottomWidth={0.6}
                            >
                                <Flex>
                                    <Text fontSize={14} color="#333">Monitor :</Text>
                                </Flex>
                                <Flex mb="5px">
                                    <Text fontSize={14} color="#333">{details.educador.email}</Text>
                                </Flex>
                            </Flex>
                            <Flex
                                mt="20px"
                                ml="4px"
                                flexDirection={"row"}
                                justifyContent={"space-between"}
                                borderBottomColor="#363B57"
                                borderBottomWidth={0.6}
                            >
                                <Flex>
                                    <Text fontSize={14} color="#333">Comunidade :</Text>
                                </Flex>
                                <Flex mb="5px">
                                    <Text fontSize={14} color="#333">{details.comunidade}</Text>
                                </Flex>
                            </Flex>
                            <Flex
                                mt="20px"
                                mx="4px"
                                justifyContent={"space-between"}
                                borderBottomColor="#363B57"
                                borderBottomWidth={0.6}
                            >
                                <Flex>
                                    <Text fontSize={14} color="#333">Situação produtiva :</Text>
                                </Flex>
                                <Flex mb="5px" mt="10px">
                                    <Text fontSize={14} color="#333">
                                        {details.situacao_produtiva.length > 0 ? (details.situacao_produtiva) : 
                                            "Não aferido"
                                        }
                                    </Text>
                                </Flex>
                            </Flex>
                            <Flex
                                mt="20px"
                                mx="4px"
                                justifyContent={"space-between"}
                                borderBottomColor="#363B57"
                                borderBottomWidth={0.6}
                            >
                                <Flex>
                                    <Text fontSize={14} color="#333">Situação Pedagogica :</Text>
                                </Flex>
                                <Flex my="0px">
                                    <Text fontSize={14} color="#333">
                                        {details.situacao_pedagogica.length > 0 ? details.situacao_pedagogica : 
                                            "Não aferido"
                                        }
                                    </Text>
                                </Flex>
                            </Flex>
                            <Flex
                                mt="20px"
                                mx="4px"
                                justifyContent={"space-between"}
                                borderBottomColor="#363B57"
                                borderBottomWidth={0.6}
                            >
                                <Flex>
                                    <Text fontSize={14} color="#333">Situação Familiar :</Text>
                                </Flex>
                                <Flex my="10px">
                                    <Text fontSize={14} color="#333">
                                        {details.situacao_familiar.length > 0 ? details.situacao_familiar :
                                            "Não aferido"
                                        }
                                    </Text>
                                </Flex>
                            </Flex>
                            <Flex
                                mt="20px"
                                mx="4px"
                                justifyContent={"space-between"}
                                borderBottomColor="#363B57"
                                borderBottomWidth={0.6}
                            >
                                <Flex>
                                    <Text fontSize={14} color="#333">Recomendações :</Text>
                                </Flex>
                                <Flex my="10px">
                                    <Text fontSize={14} color="#333">
                                        {details.recomendacao}
                                    </Text>
                                </Flex>
                            </Flex>
                            <Flex
                                mt="20px"
                                mx="4px"
                                justifyContent={"space-between"}
                            >
                                <Flex>
                                    <Text fontSize={14} color="#333">Imagem :</Text>
                                </Flex>
                                <Flex my="10px">
                                {!details.imagem && !details.aluno.imagem ? (
                                <Flex mx="auto">
                                    <Galleryadd width={50} height={50} />
                                </Flex>
                            ) : (
                                <Image
                                    source={{
                                        uri: details.imagem || details.aluno.imagem,
                                    }}
                                    alt=""
                                    w="310"
                                    h="155"
                                    resizeMode="contain"
                                />
                            )}
                                </Flex>
                            </Flex>
                        </Stack>
                    </ScrollView>
                </VStack>
            )}
        </SafeAreaView>
    )
}