import React from "react";
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../config/colors";
import SPACING from "../../config/SPACING";
import { Ionicons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type CustomScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Custom"
>;

const gradient: [string, string] = [colors["dark-gray"], colors.black];

const Custom = () => {
  const navigation = useNavigation<CustomScreenNavigationProp>();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
        <ScrollView contentContainerStyle={{ padding: SPACING }}>
          {/* Hapus Data */}
          <TouchableOpacity onPress={() => navigation.navigate("Hapus")}>
            <LinearGradient colors={gradient} style={styles.card}>
              <View style={styles.cardTextContainer}>
                <Text style={styles.titleText}>Lihat Dan Hapus Data</Text>
                <Text style={styles.descriptionText}>
                  Anda Bisa Mendelete Data Harga Mobil mu sesuai keinginan mu
                </Text>
              </View>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="trash"
                  size={SPACING * 5}
                  color={colors.light}
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>
          {/* Tambah Data */}
          <TouchableOpacity onPress={() => navigation.navigate("Tambah")}>
            <LinearGradient colors={gradient} style={styles.card}>
              <View style={styles.cardTextContainer}>
                <Text style={styles.titleText}>Menambah Data</Text>
                <Text style={styles.descriptionText}>
                  Anda Bisa menambah Data Harga Mobil mu sesuai keinginan mu
                </Text>
              </View>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="add-circle"
                  size={SPACING * 5}
                  color={colors.light}
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Ubah Data */}
          <TouchableOpacity onPress={() => navigation.navigate("Ubah")}>
            <LinearGradient colors={gradient} style={styles.card}>
              <View style={styles.cardTextContainer}>
                <Text style={styles.titleText}>Ubah Data</Text>
                <Text style={styles.descriptionText}>
                  Anda Bisa mengubah Data Harga Mobil mu sesuai keinginan mu
                </Text>
              </View>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="create"
                  size={SPACING * 5}
                  color={colors.light}
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Custom;

const styles = StyleSheet.create({
  card: {
    padding: SPACING * 2,
    height: 140,
    borderRadius: SPACING * 2,
    flexDirection: "row",
    marginTop: 100,
  },
  cardTextContainer: {
    maxWidth: "50%",
  },
  titleText: {
    color: colors.light,
    fontSize: SPACING * 2,
    fontWeight: "700",
    marginBottom: SPACING,
  },
  descriptionText: {
    color: colors.light,
  },
  iconContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
});
