import { Dimensions, Image, StyleSheet, View } from "react-native";
import React from "react";

import CustomText from "./CustomText";

import { noDataFound } from "../assets/images/noShow.png";
import { Fonts } from "../utils/fonts";

const NoDataFound = ({ title, marginTop }) => {
  return (
    <View style={styles.mainContainer}>
      <Image
        style={[styles.image, { marginTop: marginTop || 100 }]}
        source={require("../assets/images/noShow.png")}
      />
      <CustomText
        label={title || "No Data Found"}
        fontFamily={Fonts.bold}
        fontSize={18}
        textAlign="center"
        marginTop={10}
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
    width: Dimensions.get("window").width - 10,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: "contain",
  },
});
