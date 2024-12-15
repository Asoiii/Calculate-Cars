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
    City: ["E", "S"],
    Brio: ["RS", "Satya E Cvt", "Satya E", "Satya S"],
    // Tambahkan model lain dan tipe terkait di sini
  };
  useEffect(() => {
    axios
      .get("https://671641c033bc2bfe40bd1f2a.mockapi.io/Honda")
      .then((response) => setCarData(response.data))
      .catch((error) => console.error("Error fetching car data:", error));
  }, []);

  const handleCalculatePrice = () => {
    const selectedCar = carData.find(
      (car) => car.model === model && car.tahun === tahun
    );

    if (selectedCar) {
      let finalHarga = selectedCar.harga;

      //Perhitungan berdasarkan transmisi khusus untuk Avanza
      if (model === "City") {
        const tahunNumber = parseInt(tahun); // Mengonversi tahun ke angka sekali saja untuk efisiensi
        if (transmisi === "Matic" && tahunNumber) {
          finalHarga += 0;
          console.log("Diskon transmisi matic untuk mobil <= 2010: -5.000.000");
        } else if (
          transmisi === "manual" &&
          tahunNumber >= 2011 &&
          tahunNumber <= 2024
        ) {
          finalHarga -= 9000000; // Mengurangi 9 juta untuk transmisi manual dari tahun 2011-2024
          console.log(
            "Diskon transmisi manual untuk mobil 2011-2024: -9.000.000"
          );
        }
      }
      if (model === "Brio") {
        const tahunNumber = parseInt(tahun); // Mengonversi tahun ke angka sekali saja untuk efisiensi
        if (transmisi === "Manual" && tahunNumber) {
          finalHarga += 0;
          console.log("Diskon transmisi matic untuk mobil <= 2010: -5.000.000");
        } else if (transmisi === "Matic" && tahunNumber) {
          finalHarga += 5000000;
          console.log(
            "Tambahan transmisi matic untuk mobil >= 2019: +5.000.000"
          );
        }
      }

      if (model === "City") {
        if (tipe === "E") {
          finalHarga += 0;
          console.log("Tipe E diterapkan: +0");
        }
        if (tipe === "S") {
          const tahunNumber = parseInt(tahun); // Mengonversi tahun ke angka sekali saja untuk efisiensi
          if (tahunNumber >= 2010 && tahunNumber <= 2016) {
            finalHarga -= 27000000; // Mengurangi 27 juta jika tahun 2010-2016
            console.log(
              "Tipe S diterapkan untuk mobil tahun 2010-2016: -27.000.000"
            );
          } else {
            console.log(
              "Tipe S diterapkan, tetapi tidak ada pengurangan untuk tahun selain 2010-2016"
            );
          }
        }
      }

      // perhitungan tipe
      if (model === "Brio") {
        if (tipe === "RS") {
          finalHarga += 0;
          console.log("Tipe RS");
        }
        if (tipe === "Satya E Cvt") {
          finalHarga -= 15000000;
          console.log("Tipe Satya E Cvt");
        }
        if (tipe === "Satya E") {
          finalHarga -= 25000000;
          console.log("Tipe Satya E ");
        }
        if (tipe === "Satya S") {
          finalHarga -= 50000000;
          console.log("Tipe Satya S");
        }
      }

      // Perhitungan berdasarkan kilometer
      const massaMobil = 2024 - parseInt(tahun); // Ubah tahun ke tipe number
      const kmLimit = massaMobil * 5000;

      if (inputKilometers > kmLimit) {
        finalHarga -= 10000000; // Diskon Rp. 5.000.000 jika kilometer melebihi batas
      }

      // Perhitungan berdasarkan warna
      if (warna === "Putih") {
        finalHarga += 0;
        console.log("warna putih diterapkan: 0");
      } else if (warna === "Hitam") {
        finalHarga -= 0;
        console.log("warna silver diterapkan: -2.000.000");
      } else if (warna === "Lainnya") {
        finalHarga -= 10000000;
        console.log("warna kuning diterapkan: -5.000.000");
      } else {
        finalHarga += 0; //defallt warna hitam
        console.log("default hitam");
      }

      setHarga(finalHarga);
    } else {
      setHarga("Data tidak tersedia");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Honda</Text>

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
          <Picker.Item label="City" value="City" />
          <Picker.Item label="Brio" value="Brio" />
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
                  if (tipe === "Satya E Cvt") {
                    if (model === "Brio" && parseInt(car.tahun) >= 2016) {
                      return car.model === model;
                    }
                    return false;
                  }
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
