import { Flex, Spinner, Stack } from "native-base";
import { SafeAreaView } from 'react-native'

interface LoadingListProps {
    previous: boolean
}

export function LoadingList({ previous }: LoadingListProps) {
    return (
        <SafeAreaView>
            <Stack
                w="343px"
                h="97.5%"
                backgroundColor={"white"}
                // mt={"-320px"}
                mt={previous ? 6 : 6}
                mx="auto"
                position={"relative"}
                zIndex={8999}
                borderRadius="7px"
                borderColor="#E6E6F0"
                borderWidth={1}
                overflow="hidden"
            >
                <Flex my="250">
                  <Spinner color="green.500" />
                </Flex>
            </Stack>
        </SafeAreaView>
    )
}