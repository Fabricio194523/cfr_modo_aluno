import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ListFollow } from '../screens/ListFollow'
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { useState } from 'react';
import { Box, VStack, Text, Divider, Pressable, HStack, Icon, Button } from 'native-base';
import { Entypo, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Details from '@screens/Details';

const Drawer = createDrawerNavigator()

type AppRoutes = {
  listFollow: undefined,
  Drawer: undefined,
  details: { detailsId: string },
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

function CustomDrawerContent() {
  const [loading, setLoading] =  useState(false)
  
    return (
      <DrawerContentScrollView>
        <VStack space="6" my="2" mx="1" px="23">
          <Box>
            <Text bold color="gray.700">
              Aluno
            </Text>
            <Text fontSize="14" mt="0" color="gray.500" fontWeight="500">
              Aluno@gmail.com
            </Text>
          </Box>
          <VStack divider={<Divider />} space="4">
            <VStack space="3">
                <Pressable
                  w="250"
                  px="5"
                  py="3"
                  rounded="md"
                  bg="#EB8F05"
                >
                  <HStack space="7" alignItems="center">
                    <Icon
                      color="#FFF"
                      size="5"
                      as={<MaterialIcons name="logout" size={24} color="#EB8F05" />}
                    />
                    <Text
                      // fontFamily={"Poppins-SemiBold"}
                      color="#FFF"
                    >
                      Logout
                    </Text>
                  </HStack>
                </Pressable>
            </VStack>
          </VStack>
        </VStack>
      </DrawerContentScrollView>
    );
  }

  function DrawerNavigation() {
  
    return (
      <Box flex={1} >
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent />}
          screenOptions={{
            headerTintColor: "#fff",
            headerTransparent: true,
            drawerStyle: {
              width: 300,
            },
            headerStyle: {
              backgroundColor: "#03A14A",
            },
          }}
        >
          <Drawer.Screen name="listFollow" component={ListFollow} options={({ navigation }) => ({
            title: "",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.openDrawer()}>
                <Entypo name="menu" size={24} color="white" style={{ marginLeft: 28, marginTop: 28 }}  />
              </TouchableOpacity>)
          })} 
        />
        </Drawer.Navigator>
      </Box>
    )
  }

export function AppRoutes() {
    return (
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen
          name="Drawer"
          component={DrawerNavigation}
        />
        <Screen
          name="listFollow"
          component={ListFollow}
        />
        <Screen
          name="details"
          component={Details}
        />
      </Navigator>
    )
}