import React, { useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Kiutsodata } from "./Kiutsodata";

const TeamKiutso = () => {
  const [selectedArray, setSelectedArray] = useState("array1");

  const handleArrayChange = (value) => {
    setSelectedArray(value);
  };

  const arrayToDisplay = Kiutsodata[selectedArray];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KIUTSO LEADERS</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, selectedArray === "array1" && styles.selectedButton]} onPress={() => handleArrayChange("array1")}>
          <Text style={[styles.buttonText, selectedArray === "array1" && styles.selectedButtonText]}>2022/2023</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, selectedArray === "array2" && styles.selectedButton]} onPress={() => handleArrayChange("array2")}>
          <Text style={[styles.buttonText, selectedArray === "array2" && styles.selectedButtonText]}>2021/2022</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.cardContainer}>
        {arrayToDisplay.map((item) => (
          <View key={item.phone} style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.position}>{item.position}</Text>
            <Text style={styles.phone}>{item.phone}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
    height: "100%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  button: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ccc",
  },
  selectedButton: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
  },
  selectedButtonText: {
    color: "white",
  },
  cardContainer: {
    flex: 1,
    width: "100%",
  },
  card: {
    flexDirection: "column",
    alignItems: "center",
    margin: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    width: "90%",
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  
  

  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  position: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color:"#4CAF50",
  },
  phone: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default TeamKiutso;
