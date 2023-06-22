import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Box, Flex, Text } from "native-base";

export default function RenderFollow({ dataOnline }: any) {
    const navigation = useNavigation<AppNavigatorRoutesProps>()

    function handleOpenFollowDetails(detailsId: string) {
        navigation.navigate("details", { detailsId })
    }

    return (
        <Box 
            position={"relative"} 
            display="flex" 
            flexDirection={"column"} 
            h="129"
            w="100%"
            borderBottomWidth={1}
            borderBottomColor="#E6E6F0" 
        >
            <Flex position={"absolute"} bottom={0} right={0} mb="24px">
                <Text mr="19px" ml="auto" fontSize={14} color="#000">{dataOnline.data}</Text>
            </Flex>
            <Flex flexDirection={"row"} mt="24px" ml="24px">
                <Flex>
                    <Flex flexDirection="row">
                        <Text onPress={() => handleOpenFollowDetails(dataOnline.id)} mr="10px" fontSize={16}>
                            Monitor: {dataOnline._raw?._status == "created" ? dataOnline.nome :
                                dataOnline.educador?.first_name + " " + dataOnline.educador?.last_name}
                        </Text>
                        {/* {data._raw?._status == 'created' ? (<AntDesign name="check" size={12} color="#8C8C8C" />) :
                                    (<Ionicons name="checkmark-done" size={12} color="#EB8F05" />)} */}
                    </Flex>
                </Flex>
            </Flex>
            {/* <Flex position={"absolute"} right={0} bottom={0}>
                        <Text mr="19px" ml="auto">{data.data}</Text>
                    </Flex> */}
        </Box>
    )
}