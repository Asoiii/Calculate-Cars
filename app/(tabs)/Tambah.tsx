import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import axios from "axios";

const CarPriceCalculator = () => {
  const [merk, setMerk] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [tipe, setTipe] = useState<string>("");
  const [transmisi, setTransmisi] = useState<string>("");
  const [tahun, setTahun] = useState<string>("");
  const [harga, setHarga] = useState<string>("");

  // Fungsi untuk menambahkan data mobil baru
  const handleAddCar = () => {
    const newCar = {
      merk,
      model,
      tahun,
      tipe,
      transmisi,
      harga: parseInt(harga), // Pastikan harga dikonversi ke angka
    };

    axios
      .post("https://671641c033bc2bfe40bd1f2a.mockapi.io/spek_mobil", newCar)
      .then((response) => {
        console.log("Car added successfully:", response.data);
        alert("Data mobil berhasil ditambahkan!");
        // Reset input setelah berhasil ditambahkan
        setMerk("");
        setModel("");
        setTipe("");
        setTahun("");
        setTransmisi("");
        setHarga("");
      })
      .catch((error) => {
        console.error("Error adding car:", error);
        alert("Gagal menambahkan data mobil.");
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Tambah Data Mobil</Text>

        <Text style={styles.label}>Merk:</Text>
        <TextInput
          value={merk}
          onChangeText={(text) => setMerk(text)}
          style={styles.input}
          placeholder="Masukkan Merk"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Model:</Text>
        <TextInput
          value={model}
          onChangeText={(text) => setModel(text)}
          style={styles.input}
          placeholder="Masukkan Model"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Tipe: </Text>
        <TextInput
          value={tipe}
          onChangeText={(text) => setTipe(text)}
          style={styles.input}
          placeholder="Masukkan Tipe"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Tahun:</Text>
        <TextInput
          value={tahun}
          onChangeText={(text) => setTahun(text)}
          keyboardType="numeric"
          style={styles.input}
          placeholder="Masukkan Tahun"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Transmisi:</Text>
        <TextInput
          value={transmisi}
          onChangeText={(text) => setTransmisi(text)}
          style={styles.input}
          placeholder="Masukkan Trasmisi"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Harga:</Text>
        <TextInput
          value={harga}
          onChangeText={(text) => setHarga(text)}
          keyboardType="numeric"
          style={styles.input}
          placeholder="Masukkan Harga"
          placeholderTextColor="#999"
        />

        <Button title="Tambah Data Mobil" onPress={handleAddCar} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#121212",
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#FFF",
  },
  label: {
    color: "#FFF",
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    backgroundColor: "#1E1E1E",
    color: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 20,
  },
  scrollContainer: {
    padding: 20,
  },
});

export default CarPriceCalculator;
