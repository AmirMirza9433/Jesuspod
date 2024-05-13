import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import CustomText from "./CustomText";

import { COLORS } from "../utils/COLORS";
import { Fonts } from "../utils/fonts";

const Category = ({ name, selected, onSelect }) => {
  const handlePress = () => {
    onSelect && onSelect(name);
  };
  return (
    <TouchableOpacity
      style={{
        borderBottomColor: selected ? COLORS.primaryColor : "transparent",
        borderBottomWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
        flexDirection: "row",
        display: "flex",
        width: "auto",
        paddingBottom: 10,
      }}
      onPress={handlePress}
    >
      <CustomText
        label={name}
        color={selected ? COLORS.primaryColor : COLORS.black}
        fontSize={16}
        lineHeight={20}
        fontFamily={Fonts.semiBold}
        textStyle={""}
      />
    </TouchableOpacity>
  );
};

export default Category;

const styles = StyleSheet.create({});
