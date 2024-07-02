import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import CustomText from "./CustomText";
import ImageFast from "./ImageFast";

import { COLORS } from "../utils/COLORS";
import { Fonts } from "../utils/fonts";
import { View } from "react-native";

const CatCard = ({ title, onPress, backgroundImage }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.container}
    >
      <ImageFast source={backgroundImage} style={styles.image} />
      <View style={styles.overlay} />

      <CustomText
        label={title}
        fontFamily={Fonts.bold}
        color={COLORS.white}
        fontSize={18}
        marginBottom={10}
        marginLeft={10}
      />
    </TouchableOpacity>
  );
};
export default CatCard;
const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    width: "47%",
    height: 100,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    overlayColor: "black", // Adjust the alpha (last value) for darkness intensity
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Adjust opacity as needed
  },
});
