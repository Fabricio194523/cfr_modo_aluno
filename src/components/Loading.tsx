import { Spinner, Center } from "native-base";

export default function Loading() {
    return (
        <Center flex={1} bg="#016c31">
            <Spinner color="#fff" />
        </Center>
    )
}