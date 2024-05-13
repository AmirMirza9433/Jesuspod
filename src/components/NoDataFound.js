import { Dimensions, Image, StyleSheet, View } from "react-native";
import React from "react";

import CustomText from "./CustomText";

import { noDataFound } from "../assets/images/pngs";
import Fonts from "../utils/fonts";

const NoDataFound = ({ title, marginTop }) => {
  return (
    <View style={styles.mainContainer}>
      <Image
        style={[styles.image, { marginTop: marginTop || 100 }]}
        source={noDataFound}
      />
      <CustomText
        label={title || "noDataFound"}
        fontFamily={Fonts.medium}
        fontSize={18}
        textAlign="center"
        marginTop={5}
      />
    </View>
  );
};

export default NoDataFound;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 400,
    width: Dimensions.get("window").width - 40,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: "contain",
  },
});
