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
    Avanza: ["1.5 G", "Veloz", "1.3 G", "1.3 E", "1.5 E"],
    Vios: ["limo", "G"],
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
      //Perhitungan berdasarkan transmisi khusus untuk Avanza
      if (model === "Avanza") {
        // Perhitungan Transmisi
        const tahunNumber = parseInt(tahun); // Mengonversi tahun ke angka sekali saja untuk efisiensi
        if (transmisi === "Matic" && tahunNumber <= 2010) {
          finalHarga -= 5000000;
          console.log("Diskon transmisi matic untuk mobil <= 2010: -5.000.000");
        } else if (transmisi === "Matic" && tahunNumber >= 2019) {
          finalHarga += 5000000;
          console.log(
            "Tambahan transmisi matic untuk mobil >= 2019: +5.000.000"
          );
        }
        // Perhitungan Tipe Avanza
        if (tipe === "1.5 G") {
          finalHarga += 0;
          console.log("Tipe 1.5 G diterapkan: +0");
        }
        if (tipe === "Veloz") {
          finalHarga += 10000000;
          console.log("Tipe Veloz diterapkan: +10.000.000");
        }
        if (tipe === "1.3 G") {
          finalHarga -= 2000000;
          console.log("Tipe 1.3 G diterapkan: -2.000.000");
        }
        if (tipe === "1.3 E") {
          finalHarga -= 10000000;
          console.log(" Tipe 1.3 Editerapkan: -10.000.000");
        }
        if (tipe === "1.5 E") {
          finalHarga -= 5000000;
          console.log(" Tipe 1.5 E diterapkan: -5.000.000");
        }
        // Perhitungan Warna Avanza
        if (warna === "Putih") {
          finalHarga += 2000000;
          console.log("warna putih diterapkan: +2.000.000");
        } else if (warna === "Silver") {
          finalHarga -= 2000000;
          console.log("warna silver diterapkan: -2.000.000");
        } else if (warna === "Lainnya") {
          finalHarga -= 5000000;
          console.log("warna kuning diterapkan: -5.000.000");
        } else {
          finalHarga += 0; //defallt warna hitam
          console.log("default hitam");
        }
        // Perhitungan Km Avanza
        const massaMobil = 2024 - parseInt(tahun); // Ubah tahun ke tipe number
        const kmLimit = massaMobil * 5000;

        if (inputKilometers > kmLimit) {
          finalHarga -= 5000000; // Diskon Rp. 5.000.000 jika kilometer melebihi batas
        }
      }

      if (model === "Vios") {
        // Perhitungan Tranmisi
        const tahunNumber = parseInt(tahun); // Mengonversi tahun ke angka sekali saja untuk efisiensi
        if (transmisi === "Matic" && tahunNumber <= 2010) {
          finalHarga -= 2000000;
          console.log("Diskon transmisi matic untuk mobil <= 2010: -2.000.000");
        } else if (transmisi === "Matic" && tahunNumber >= 2019) {
          finalHarga += 3000000;
          console.log(
            "Tambahan transmisi matic untuk mobil >= 2019: +3.000.000"
          );
        }
        // Perhitungan Tipe
        if (tipe === "limo") {
          finalHarga -= 20000000;
          console.log("Tipe limo diterapkan: -20 JUTA");
        }
        if (tipe === "G") {
          finalHarga += 0;
          console.log("Tipe G diterapkan: +0");
        }
        // Perhitungan Warna
        if (warna === "Putih") {
          finalHarga += 2000000;
          console.log("warna putih diterapkan: +2.000.000");
        } else if (warna === "Silver") {
          finalHarga -= 2000000;
          console.log("warna silver diterapkan: -2.000.000");
        } else if (warna === "Lainnya") {
          finalHarga -= 5000000;
          console.log("warna lainnya diterapkan: -5.000.000");
        } else {
          finalHarga += 0; //defallt warna hitam
          console.log("default hitam");
        }
        // Perhitungan Km Vios
        const massaMobil = 2024 - parseInt(tahun); // Ubah tahun ke tipe number
        const kmLimit = massaMobil * 7000;

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
        <Text style={styles.header}>Toyota</Text>

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
          <Picker.Item label="Avanza" value="Avanza" />
          <Picker.Item label="Vios" value="Vios" />
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
                  if (tipe === "veloz") {
                    if (model === "Avanza" && parseInt(car.tahun) >= 2015) {
                      return car.model === model;
                    }
                    return false;
                  }
                  if (tipe === "limo") {
                    if (
                      model === "Vios" &&
                      parseInt(car.tahun) >= 2015 &&
                      parseInt(car.tahun) <= 2020
                    ) {
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
          <Picker.Item label="lainnya" value="Lainnya" />
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
