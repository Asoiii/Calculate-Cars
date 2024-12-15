import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import axios from "axios";

const DeleteCarData = () => {
  const [cars, setCars] = useState<any[]>([]);

  // Fungsi untuk mengambil data mobil dari API
  const fetchCars = () => {
    axios
      .get("https://671641c033bc2bfe40bd1f2a.mockapi.io/spek_mobil")
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
        Alert.alert("Error", "Gagal mengambil data mobil.");
      });
  };

  // Fungsi untuk menghapus data mobil berdasarkan ID
  const handleDeleteCar = (id: string) => {
    axios
      .delete(`https://671641c033bc2bfe40bd1f2a.mockapi.io/spek_mobil/${id}`)
      .then(() => {
        Alert.alert("Success", "Data mobil berhasil dihapus!");
        // Update data setelah menghapus
        setCars(cars.filter((car) => car.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting car:", error);
        Alert.alert("Error", "Gagal menghapus data mobil.");
      });
  };

  // Mengambil data mobil saat komponen pertama kali dimuat
  useEffect(() => {
    fetchCars();
  }, []);

  // Render data mobil dalam bentuk Card
  const renderCarItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardId}>ID: {item.id}</Text>
        <Text style={styles.cardTitle}>
          {item.merk} - {item.model}
        </Text>
        <Text style={styles.cardText}>Tahun: {item.tahun}</Text>
        <Text style={styles.cardText}>
          Harga: Rp {item.harga.toLocaleString()}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => handleDeleteCar(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>Hapus</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Data Mobil</Text>
        <FlatList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={renderCarItem}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFF",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardContent: {
    flex: 1,
  },
  cardId: {
    color: "#FFF",
    fontSize: 12,
    marginBottom: 5,
  },
  cardTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardText: {
    color: "#FFF",
    fontSize: 14,
    marginVertical: 2,
  },
  deleteButton: {
    backgroundColor: "#D32F2F",
    borderRadius: 5,
    padding: 8,
  },
  deleteButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  scrollContainer: {
    padding: 20,
  },
});

export default DeleteCarData;
