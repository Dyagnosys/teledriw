import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function PredictionList({ predictions = [] }) {

  return (
    <View style={styles.container}>
      {predictions.map((p, i) => (

        <Text style={styles.text} key={`item-${i}`}>
          <Text style={{ fontWeight: "bold" }}> {p.className}</Text>
          -

          <Text style={{ color: 'red' }}> Probabilidade: {parseFloat((p.probability) * 100).toFixed(2) + "%"}</Text>
        </Text>
      ))}
    </View>
  );
}

const margin = 34;

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    position: "absolute",
    bottom: 80,
    left: margin,
    right: margin,

    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
  },
  text: {
    paddingVertical: 2,
    fontSize: 20,
  },
});
