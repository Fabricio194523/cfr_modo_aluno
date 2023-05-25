import { useEffect, useState } from "react";
import { FlatList, RefreshControl, SafeAreaView, StyleSheet } from "react-native";
import { Box, Flex, Select, Stack, Text, View, VStack } from "native-base";

import { AntDesign } from '@expo/vector-icons'
import { api } from "../services/api";
import Loading from "@components/Loading";
import RenderFollow from "@components/RenderFollow";


export function ListFollow() {
    const [follow, setFollow] = useState([])
    const [followLoading, setFollowLoading] = useState(false)

    async function fetchFollow() {
        setFollowLoading(true)
        api.get(`/empresarial/api/acompanhamento/?id=&turma=&aluno=&educador=387`)
            .then(response => {
                setFollow(response.data)
                setFollowLoading(false)
            })
    }

    useEffect(() => {
        fetchFollow()
    }, [])

    return (
        <VStack flex={1}>
            <Stack minH="503px" w="100%" pt="110px" mb="30px" backgroundColor="#03A14A">
                <Flex w="250px" ml="28">
                    <Text
                        // fontFamily={"Poppins-Bold"}
                        fontSize={"24px"}
                        color="white"
                    >
                        Acompanhamentos Anteriores
                    </Text>
                </Flex>
                <Flex w="343" h="51" mt="20px" position={"relative"} mx="auto">
                    <Flex mt="-10px">
                        <SafeAreaView>
                            <Select
                                w="343"
                                h="51"
                                pl="17"
                                pr="26"
                                fontSize={14}
                                // fontFamily={"Poppins-Regular"}
                                alignItems={"center"}
                                backgroundColor="#fff"
                                borderRadius="7"
                                display={"flex"}
                                flexDirection="row"
                                justifyContent={"space-between"}
                                dropdownIcon={<Flex mr="26">
                                    <AntDesign name="search1" size={24} color="#8F90A6" />
                                </Flex>}
                                placeholder="student"
                                defaultValue="student"
                            >
                                <Select.Item value={"Todos"} label="Todos" />
                            </Select>
                        </SafeAreaView>
                    </Flex>
                </Flex>
            </Stack>
            {followLoading ? <Loading /> : (
                <SafeAreaView>
                    <Stack
                        w="343"
                        h="97.5%"
                        pb="1"
                        backgroundColor={"white"}
                        mt={"-250px"}
                        mx="auto"
                        position={"relative"}
                        zIndex={8999}
                        borderRadius="7px"
                        borderColor="#E6E6F0"
                        borderWidth={1}
                        overflow="hidden"
                    >
                        {follow.length > 0 ? (
                            <FlatList
                                data={follow}
                                keyExtractor={(item: any) => item.id}
                                renderItem={({ item }) => (<RenderFollow dataOnline={item} />)}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={followLoading}
                                        onRefresh={fetchFollow}
                                        tintColor={"#333"}
                                        colors={['#333']}
                                    />
                                }
                            />
                        ) : (
                            <View mx="auto">
                                <Box
                                    position={"relative"}
                                    display="flex"
                                    flexDirection={"column"}
                                    w="100%"
                                >
                                    <Flex flexDirection={"row"} mt="131px" ml="20px">
                                        <Text
                                            fontSize={24}
                                            // fontFamily={"Poppins-SemiBold"}
                                            color="#000"
                                        >
                                            Nenhum acompanhamento anterior.
                                        </Text>
                                    </Flex>
                                </Box>
                            </View>
                        )}
                    </Stack>
                </SafeAreaView>
            )}
        </VStack>
    )
}