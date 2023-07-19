import { useEffect, useState } from "react";
import { FlatList, RefreshControl, SafeAreaView } from "react-native";
import { Box, Flex, Select, Stack, Text, View, VStack } from "native-base";

import { AntDesign } from '@expo/vector-icons'
import { api } from "../services/api";
import RenderFollow from "@components/RenderFollow";
import { LoadingList } from "@components/LoadingList";
import { AcompanhamentoData } from "./Details";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function ListFollow() {
    const [follow, setFollow] = useState([])
    const [followLoading, setFollowLoading] = useState(true)

    const [monitor, setMonitor] = useState("Filtrar por nome do monitor")
    const [searchResults, setSearchResults] = useState([])

    const monitorNameList = follow.map((monitor: AcompanhamentoData) => monitor.educador.first_name + " " + monitor.educador.last_name)
    const uniqueMonitorNameList = [...Array.from(new Set(monitorNameList))]

    async function fetchFollow() {
        setFollowLoading(true)
        const studentID = await AsyncStorage.getItem("alunoID")
        await api.get(`/empresarial/api/acompanhamentosTotais/?id=&turma=&aluno=${studentID}&educador=`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
        })
            .then(response => {
                setFollow(response.data)
                setSearchResults(response.data)
                setFollowLoading(false)
            }).catch(err => {
                setFollowLoading(false)
                console.log(err)
            })
    }

    useEffect(() => {
        if (monitor === "Filtrar por nome do monitor" || monitor === "Todos") {
            setSearchResults(follow)
        } else {
            setSearchResults((c) => (c = follow.filter((studentList: AcompanhamentoData) => {
                return studentList.educador?.first_name.includes(monitor.split(' ')[0])
            })))
        }

    }, [monitor])

    useEffect(() => {
        fetchFollow()
    }, [])
    
    return (
        <VStack flex={1}>
            <Flex
                minH="503"
                w="100%"
                bgColor="#016C31"
                position={"absolute"}
            />
            <Stack pt="130">
                <Flex w="250px" ml="28">
                    <Text
                        fontFamily={"Poppins-Bold"}
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
                                fontFamily={"Poppins-Regular"}
                                alignItems={"center"}
                                backgroundColor="#fff"
                                borderRadius="7"
                                display={"flex"}
                                flexDirection="row"
                                justifyContent={"space-between"}
                                dropdownIcon={<Flex mr="26">
                                    <AntDesign name="search1" size={24} color="#8F90A6" />
                                </Flex>}
                                placeholder={monitor}
                                onValueChange={setMonitor}
                                defaultValue={monitor}
                            >
                                <Select.Item value="Todos" label="Todos"/>
                                {uniqueMonitorNameList.map((nameMonitor) => {
                                    return(
                                        <Select.Item value={nameMonitor} label={nameMonitor} key={nameMonitor} />
                                    )
                                })}
                            </Select>
                        </SafeAreaView>
                    </Flex>
                </Flex>
                {followLoading ? <LoadingList previous={true} /> : (
                <SafeAreaView>
                    <Stack
                        w="343"
                        h="82%"
                        // maxH="82%"
                        pb="1"
                        mt="25"
                        backgroundColor={"white"}
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
                                data={searchResults}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item: AcompanhamentoData) => item.id}
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
                                    h="100%"
                                >
                                    <Flex flexDirection={"row"} mt="131px" ml="20px">
                                        <Text
                                            fontSize={24}
                                            fontFamily={"Poppins-SemiBold"}
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
            </Stack>
        </VStack>
    )
}