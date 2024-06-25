import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import Icons from "./Icons";

import { COLORS } from "../utils/COLORS";
import { Fonts } from "../utils/fonts";

const SearchInput = ({ placeholder, value, onChangeText, onPress }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <TouchableOpacity
      onPress={onPress ? onPress : null}
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
        placeholderTextColor={COLORS.black}
      />
    </TouchableOpacity>
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
