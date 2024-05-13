import { StyleSheet, TextInput, View, Image } from "react-native";
import React, { useState } from "react";

import Icons from "./Icons";

import { images } from "../assets/images";
import { COLORS } from "../utils/COLORS";
import { Fonts } from "../utils/fonts";

const SearchInput = ({ placeholder, value, onChangeText }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View
      style={[
        styles.mainContainer,
        {
          borderColor: isFocused ? COLORS.primaryColor : COLORS.lightGray,
        },
      ]}
    >
      <Icons family="Feather" name="search" size={20} color={COLORS.darkGray} />

      <TextInput
        placeholder={placeholder}
        style={[styles.input]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={COLORS.darkGray}
      />
      <Image
        source={images.filter}
        style={{
          width: 24,
          height: 24,
          resizeMode: "contain",
          marginLeft: -10,
        }}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.lightGray,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    borderWidth: 1,
    marginBottom: 20,
    height: 55,
    width: "100%",
    borderRadius: 16,
    marginTop: 10,
  },
  input: {
    height: "100%",
    padding: 0,
    margin: 0,
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: COLORS.black,
    width: "90%",
    paddingHorizontal: 10,
  },
});
