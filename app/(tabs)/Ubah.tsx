import React, { useState, useEffect } from "react";
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
  const [id, setCarId] = useState<string>("");

  // Fungsi untuk mengubah data mobil berdasarkan ID
  const handleUpdateCar = () => {
    const updatedCar = {
      merk,
      model,
      tahun,
      tipe,
      transmisi,
      harga: parseInt(harga), // Pastikan harga dikonversi ke angka
    };

    axios
      .put(
        `https://671641c033bc2bfe40bd1f2a.mockapi.io/spek_mobil/${id}`,
        updatedCar
      )
      .then((response) => {
        console.log("Car updated successfully:", response.data);
        alert("Data mobil berhasil diubah!");
        // Reset input setelah berhasil diubah
        setMerk("");
        setModel("");
        setTipe("");
        setTahun("");
        setTransmisi("");
        setCarId(""); // Reset ID mobil
      })
      .catch((error) => {
        console.error("Error updating car:", error);
        alert("Gagal mengubah data mobil.");
      });
  };

  // Fungsi untuk mengambil data mobil berdasarkan ID (untuk editing)
  useEffect(() => {
    if (id) {
      axios
        .get(`https://671641c033bc2bfe40bd1f2a.mockapi.io/spek_mobil/${id}`)
        .then((response) => {
          const car = response.data;
          setMerk(car.merk);
          setModel(car.model);
          setTipe(car.tipe);
          setTahun(car.tahun);
          setTransmisi(car.transmisi);
          setHarga(car.harga.toString());
        })
        .catch((error) => {
          console.error("Error fetching car data:", error);
        });
    }
  }, [id]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Edit Data Mobil</Text>

        <Text style={styles.label}>ID Mobil:</Text>
        <TextInput
          value={id}
          onChangeText={(text) => setCarId(text)}
          style={styles.input}
          placeholder="Masukkan ID Mobil"
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

        <Button title="Ubah Data Mobil" onPress={handleUpdateCar} />
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
