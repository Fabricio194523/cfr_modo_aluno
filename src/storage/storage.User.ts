import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserDTO } from "src/dTos/UserDTO";
import { USER_STORAGE } from "./storageconfig";

export async function storageUserSave(username: string) {
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(username))
}

export async function storageUserGet() {
    const storage: any = await AsyncStorage.getItem(USER_STORAGE)

    const user = storage ? JSON.parse(storage) : {}

    return user
}

export async function storageUserRemove() {
  await AsyncStorage.removeItem(USER_STORAGE)
}