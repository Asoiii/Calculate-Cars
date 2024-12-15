import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../config/colors";
import SPACING from "../../config/SPACING";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const avatar = require("../../assets/avatar/avator.jpg");

const gradient: [string, string] = [colors["dark-gray"], colors.black];

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
        <ScrollView contentContainerStyle={{ padding: SPACING }}>
          {/* Header */}
          <View style={styles.header}>
            <LinearGradient
              style={styles.iconContainer}
              colors={[colors.light, colors["dark-gray"]]}
            >
              <TouchableOpacity style={styles.iconButton}>
                <MaterialCommunityIcons
                  name="dots-horizontal"
                  color={colors.light}
                  size={SPACING * 2}
                />
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              style={styles.iconContainer}
              colors={[colors.light, colors["dark-gray"]]}
            >
              <TouchableOpacity style={styles.iconButton}>
                <Image source={avatar} style={styles.avatar} />
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Search Bar */}
          {/* <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor={colors.light}
            />
            <Ionicons
              style={styles.searchIcon}
              size={SPACING * 2.5}
              color={colors.light}
              name="search"
            />
          </View> */}

          {/* Toyota Card */}
          <TouchableOpacity onPress={() => navigation.navigate("Toyota")}>
            <LinearGradient colors={gradient} style={styles.card}>
              <View style={styles.cardTextContainer}>
                <Text style={styles.discountText}>Toyota</Text>
                <Text style={styles.titleText}>Calculate Price</Text>
                <Text style={styles.descriptionText}>
                  Dapatkan Harga Ambilan Mu Terbaik Untuk Membeli Mobil
                </Text>
              </View>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.carImage}
                  source={require("../../assets/toyota2.jpg")}
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Suzuki Card */}
          <TouchableOpacity onPress={() => navigation.navigate("Suzuki")}>
            <LinearGradient colors={gradient} style={styles.card}>
              <View style={styles.cardTextContainer}>
                <Text style={styles.discountText}>Suzuki</Text>
                <Text style={styles.titleText}>Calculate Price</Text>
                <Text style={styles.descriptionText}>
                  Dapatkan Harga Ambilan Mu Terbaik Untuk Membeli Mobil
                </Text>
              </View>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.carImage}
                  source={require("../../assets/suzuki.png")}
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Honda Card */}
          <TouchableOpacity onPress={() => navigation.navigate("Honda")}>
            <LinearGradient colors={gradient} style={styles.card}>
              <View style={styles.cardTextContainer}>
                <Text style={styles.discountText}>Honda</Text>
                <Text style={styles.titleText}>Calculate Price</Text>
                <Text style={styles.descriptionText}>
                  Dapatkan Harga Ambilan Mu Terbaik Untuk Membeli Mobil
                </Text>
              </View>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.carImage}
                  source={require("../../assets/honda.jpg")}
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Mazda Card */}
          <TouchableOpacity onPress={() => navigation.navigate("Mazda")}>
            <LinearGradient colors={gradient} style={styles.card}>
              <View style={styles.cardTextContainer}>
                <Text style={styles.discountText}>Mazda</Text>
                <Text style={styles.titleText}>Calculate Price</Text>
                <Text style={styles.descriptionText}>
                  Dapatkan Harga Ambilan Mu Terbaik Untuk Membeli Mobil
                </Text>
              </View>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.carImage}
                  source={require("../../assets/mazda.jpg")}
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Custom")}>
            <LinearGradient colors={gradient} style={styles.card}>
              <View style={styles.cardTextContainer}>
                <Text style={styles.discountText}>Custom</Text>
                <Text style={styles.titleText}>Calculate Price</Text>
                <Text style={styles.descriptionText}>
                  Mari Buat Harga Ambilan Mu Sendiri
                </Text>
              </View>
              <View style={styles.iconContainerlogo}>
                <Ionicons
                  name="person"
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

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING * 2,
  },
  iconContainer: {
    height: SPACING * 4,
    width: SPACING * 4,
    borderRadius: SPACING * 2,
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: {
    height: SPACING * 3,
    width: SPACING * 3,
    backgroundColor: colors.black,
    borderRadius: SPACING * 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    height: "100%",
    width: "100%",
    borderRadius: SPACING * 2,
  },
  searchContainer: {
    position: "relative",
    marginVertical: SPACING * 3,
    justifyContent: "center",
  },
  searchInput: {
    backgroundColor: colors["dark-gray"],
    padding: SPACING * 1.5,
    borderRadius: SPACING * 2,
    color: colors.light,
    fontSize: SPACING * 2,
    paddingLeft: SPACING * 4,
  },
  searchIcon: {
    position: "absolute",
    left: SPACING,
  },
  card: {
    padding: SPACING * 2,
    height: 140,
    borderRadius: SPACING * 2,
    flexDirection: "row",
    marginTop: 50,
  },
  cardTextContainer: {
    maxWidth: "50%",
  },
  discountText: {
    color: colors.light,
    fontSize: SPACING * 2,
    fontWeight: "800",
    marginBottom: SPACING,
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
  imageContainer: {
    width: "50%",
    position: "relative",
  },
  carImage: {
    width: "100%",
    height: 100,
  },
  iconContainerlogo: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
});
