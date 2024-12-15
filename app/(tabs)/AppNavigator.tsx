// AppNavigator.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./index"; // Pastikan path sesuai dengan file HomeScreen
import ToyotaScreen from "./Toyota";
import SuzukiScreen from "./Suzuki";
import HondaScreen from "./Honda";
import MazdaScreen from "./Mazda";
import CustomScreen from "./Custom";
import HapusScreen from "./Hapus";
import TambahScreen from "./Tambah";
import UbahScreen from "./Ubah";

export type RootStackParamList = {
  Home: undefined;
  Toyota: undefined;
  Suzuki: undefined;
  Honda: undefined;
  Mazda: undefined;
  Custom: undefined;
  Tambah: undefined;
  Ubah: undefined;
  Hapus: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Toyota" component={ToyotaScreen} />
        <Stack.Screen name="Suzuki" component={SuzukiScreen} />
        <Stack.Screen name="Honda" component={HondaScreen} />
        <Stack.Screen name="Mazda" component={MazdaScreen} />
        <Stack.Screen name="Custom" component={CustomScreen} />
        <Stack.Screen name="Tambah" component={TambahScreen} />
        <Stack.Screen name="Ubah" component={UbahScreen} />
        <Stack.Screen name="Hapus" component={HapusScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
