import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const CarImg = () => {
  return (
    <View style={styles.cardContiner}>
      <Image
        style={styles.carImg}
        source={require("../resources/images/car.png")}
      />
    </View>
  );
};

export default CarImg;

const styles = StyleSheet.create({
  cardContiner: {
    borderColor: "#141B41",
    padding: 10,
    width: 400,
    backgroundColor: "#141B41",
    
  },

  carImg: {
    width: 150,
    height: 110,
    marginLeft: 94,
  },
});
