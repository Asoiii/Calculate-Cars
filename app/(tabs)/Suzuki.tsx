import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

type Car = {
  id: string;
  merk: string;
  model: string;
  tahun: string;
  harga: number;
};

const CarPriceCalculator = () => {
  const [merk, setMerk] = useState<string>("");
  const [tipe, setTipe] = useState<string>("");
  const [tahun, setTahun] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [transmisi, setTransmisi] = useState("");
  const [warna, setWarna] = useState<string>("");
  const [harga, setHarga] = useState<number | string | null>(null);
  const [carData, setCarData] = useState<Car[]>([]);
  const [inputKilometers, setInputKilometers] = useState(0);

  const tipeOptions: { [key: string]: string[] } = {
    Ertiga: ["GA", "GL", "GX"],
    Ignis: ["GX", "GL"],
    // Tambahkan model lain dan tipe terkait di sini
  };

  useEffect(() => {
    axios
      .get("https://671641c033bc2bfe40bd1f2a.mockapi.io/spek_mobil")
      .then((response) => setCarData(response.data))
      .catch((error) => console.error("Error fetching car data:", error));
  }, []);

  const handleCalculatePrice = () => {
    const selectedCar = carData.find(
      (car) => car.model === model && car.tahun === tahun
    );

    if (selectedCar) {
      let finalHarga = selectedCar.harga;
      console.log(model);
      console.log(tipeOptions);
      if (model === "Ertiga") {
        // Perhitungan Tipe Ertiga
        if (tipe === "GA") {
          finalHarga += 0;
          console.log("Tipe GA diterapkan: +0");
        }
        if (tipe === "GL") {
          finalHarga += 10000000;
        }
        console.log("Tipe GL diterapkan");
        if (tipe === "GX") {
          finalHarga += 20000000;
          console.log("Tipe GX diterapkan");
        }

        // Perhitungan Transmisi
        const tahunNumber = parseInt(tahun); // Mengonversi tahun ke angka sekali saja untuk efisiensi
        if (transmisi === "Matic" && tahunNumber < 2016) {
          finalHarga -= 5000000;
          console.log("Diskon transmisi matic untuk mobil <= 2010: -5.000.000");
        } else if (transmisi === "Matic" && tahunNumber >= 2016) {
          finalHarga += 5000000;
          console.log(
            "Tambahan transmisi matic untuk mobil >= 2019: +5.000.000"
          );
        }

        // Perhitungan Warna Ertiga
        if (warna === "Putih") {
          finalHarga += 2000000;
          console.log("warna putih diterapkan: +2.000.000");
        } else if (warna === "Silver") {
          finalHarga -= 2000000;
          console.log("warna silver diterapkan: -2.000.000");
        } else if (warna === "merah") {
          finalHarga -= 5000000;
          console.log("warna merah diterapkan: -5.000.000");
        } else if (warna === "biru") {
          finalHarga -= 5000000;
          console.log("warna biru diterapkan: -5.000.000");
        } else if (warna === "kuning") {
          finalHarga -= 5000000;
          console.log("warna kuning diterapkan: -5.000.000");
        } else if (warna === "Lainnya") {
          finalHarga -= 5000000;
          console.log("warna kuning diterapkan: -5.000.000");
        } else {
          finalHarga += 0; //defallt warna hitam
          console.log("default hitam");
        }
        // Perhitungan Km Ertiga
        const massaMobil = 2024 - parseInt(tahun); // Ubah tahun ke tipe number
        const kmLimit = massaMobil * 5000;

        if (inputKilometers > kmLimit) {
          finalHarga -= 5000000; // Diskon Rp. 5.000.000 jika kilometer melebihi batas
        }
      }

      if (model === "Ignis") {
        // Perhitungan Tranmisi
        const tahunNumber = parseInt(tahun); // Mengonversi tahun ke angka sekali saja untuk efisiensi
        if (transmisi === "manual" && tahunNumber) {
          finalHarga += 0;
          console.log("Diskon transmisi matic untuk mobil <= 2010: -5.000.000");
        } else if (transmisi === "Matic" && tahunNumber) {
          finalHarga += 6000000;
          console.log(
            "Tambahan transmisi matic untuk mobil >= 2019: +5.000.000"
          );
        }
        // Perhitungan Tipe Ignis
        if (tipe === "GX") {
          finalHarga += 0;
          console.log("Tipe GX");
        }
        if (tipe === "GL") {
          finalHarga -= 10000000;
          console.log("Tipe GL");
        }

        // Perhitungan Warna Ignis
        if (warna === "Putih") {
          finalHarga += 2000000;
          console.log("warna putih diterapkan: +2.000.000");
        } else if (warna === "Silver") {
          finalHarga -= 2000000;
          console.log("warna silver diterapkan: -2.000.000");
        } else if (warna === "merah") {
          finalHarga -= 5000000;
          console.log("warna merah diterapkan: -5.000.000");
        } else if (warna === "biru") {
          finalHarga -= 5000000;
          console.log("warna biru diterapkan: -5.000.000");
        } else if (warna === "kuning") {
          finalHarga -= 5000000;
          console.log("warna kuning diterapkan: -5.000.000");
        } else if (warna === "Lainnya") {
          finalHarga -= 5000000;
          console.log("warna kuning diterapkan: -5.000.000");
        } else {
          finalHarga += 0; //defallt warna hitam
          console.log("default hitam");
        }
        // Perhitungan Km Ignis
        const massaMobil = 2024 - parseInt(tahun); // Ubah tahun ke tipe number
        const kmLimit = massaMobil * 7000;
        console.log(kmLimit);
        if (inputKilometers > kmLimit) {
          finalHarga -= 5000000; // Diskon Rp. 5.000.000 jika kilometer melebihi batas
        }
      }
      setHarga(finalHarga);
    } else {
      setHarga("Data tidak tersedia");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Suzuki</Text>

        <Text style={styles.label}>Pilih Model:</Text>
        <Picker
          selectedValue={model}
          onValueChange={(itemValue) => {
            setModel(itemValue);
            setTipe("");
          }}
          style={styles.picker}
          dropdownIconColor="#FFF"
        >
          <Picker.Item label="Pilih Model" value="" />
          <Picker.Item label="Ertiga" value="Ertiga" />
          <Picker.Item label="Ignis" value="Ignis" />
        </Picker>

        <Text style={styles.label}>Pilih Tipe:</Text>
        <Picker
          selectedValue={tipe}
          onValueChange={(itemValue) => setTipe(itemValue)}
          enabled={!!model} // Aktifkan hanya jika model dipilih
          style={styles.picker}
        >
          <Picker.Item label="Pilih Tipe" value="" />
          {model && tipeOptions[model]?.length > 0 ? (
            tipeOptions[model].map((tipeOption) => (
              <Picker.Item
                key={tipeOption}
                label={tipeOption}
                value={tipeOption}
              />
            ))
          ) : (
            <Picker.Item label="Tidak ada tipe tersedia" value="" />
          )}
        </Picker>

        <Text style={styles.label}>Pilih Tahun:</Text>
        <Picker
          selectedValue={tahun}
          onValueChange={(itemValue) => setTahun(itemValue)}
          style={styles.picker}
          dropdownIconColor="#FFF"
        >
          <Picker.Item label="Pilih Tahun" value="" />
          {[
            ...new Set(
              carData
                .filter((car) => {
                  // Filter berdasarkan model dan tipe "GX" hanya berlaku pada model tertentu
                  if (tipe === "GX") {
                    // Tentukan batas tahun berdasarkan model yang dipilih
                    if (model === "Ignis" && parseInt(car.tahun) <= 2020) {
                      return car.model === model;
                    }
                    if (model === "Ertiga" && parseInt(car.tahun) <= 2021) {
                      return car.model === model;
                    }
                    return false; // Jika model bukan Ignis atau Ertiga saat tipe GX dipilih
                  }
                  if (tipe === "GL") {
                    // Tentukan batas tahun berdasarkan model yang dipilih
                    if (model === "Ignis" && parseInt(car.tahun) <= 2021) {
                      return car.model === model;
                    }
                    return false; // Jika model bukan Ignis atau Ertiga saat tipe GX dipilih
                  }
                  // Jika tipe bukan GX, tampilkan semua tahun sesuai model
                  return car.model === model;
                })
                .map((car) => car.tahun) // Ambil hanya properti tahun
            ),
          ]
            .sort((a, b) => parseInt(a) - parseInt(b)) // Urutkan tahun secara ascending
            .map((uniqueTahun) => (
              <Picker.Item
                key={uniqueTahun}
                label={uniqueTahun}
                value={uniqueTahun}
              />
            ))}
        </Picker>

        <Text style={styles.label}>Pilih Transmisi:</Text>
        <Picker
          selectedValue={transmisi}
          onValueChange={(itemValue) => setTransmisi(itemValue)}
          style={styles.picker}
          dropdownIconColor="#FFF"
        >
          <Picker.Item label="Pilih Transmisi" value="" />
          <Picker.Item label="Manual" value="Manual" />
          <Picker.Item label="Matic" value="Matic" />
        </Picker>

        <Text style={styles.label}>Pilih Warna:</Text>
        <Picker
          selectedValue={warna}
          onValueChange={(itemValue) => setWarna(itemValue)}
          style={styles.picker}
          dropdownIconColor="#FFF"
        >
          <Picker.Item label="Pilih Warna" value="" />
          <Picker.Item label="Hitam" value="hitam" />
          <Picker.Item label="Putih" value="Putih" />
          <Picker.Item label="Silver" value="Silver" />
          <Picker.Item label="Lainnya" value="Lainnya" />
        </Picker>

        <Text style={styles.label}>Masukkan Kilometer:</Text>
        <TextInput
          value={inputKilometers.toString()}
          onChangeText={(text) => setInputKilometers(parseInt(text) || 0)}
          keyboardType="numeric"
          style={styles.input}
          placeholder="Kilometer"
          placeholderTextColor="#999"
        />

        <Button title="Hitung Harga" onPress={handleCalculatePrice} />

        {harga !== null && (
          <Text style={styles.resultText}>
            Harga:{" "}
            {typeof harga === "string" ? harga : `Rp ${harga.toLocaleString()}`}
          </Text>
        )}
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
  picker: {
    height: 50,
    marginBottom: 20,
    color: "#FFF",
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
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
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#FFF",
  },
  scrollContainer: {
    padding: 20,
  },
});

export default CarPriceCalculator;
