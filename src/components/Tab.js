import { StyleSheet, View } from "react-native";
import React from "react";

import CustomText from "./CustomText";

import { COLORS } from "../utils/COLORS";
import { Fonts } from "../utils/fonts";

const Tab = ({ array, value, setVale, paddingHorizontal }) => {
  return (
    <View style={[styles.mainContainer, { paddingHorizontal }]}>
      {array.map((item) => (
        <View
          key={item}
          style={
            value == item
              ? { borderBottomWidth: 2, borderBottomColor: COLORS.primaryColor }
              : { borderBottomWidth: 2, borderBottomColor: "transparent" }
          }
        >
          <CustomText
            label={item}
            color={value == item ? COLORS.primaryColor : COLORS.black}
            fontSize={16}
            fontFamily={Fonts.semiBold}
            marginBottom={10}
            onPress={() => setVale(item)}
          />
        </View>
      ))}
    </View>
  );
};

export default Tab;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
});
