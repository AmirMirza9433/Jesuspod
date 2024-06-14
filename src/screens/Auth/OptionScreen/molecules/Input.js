import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";

import { COLORS } from "../../../../utils/COLORS";
import { Fonts } from "../../../../utils/fonts";

const CustomInput = ({
  value,
  onChangeText,
  error,
  email,
  name,
  pass,
  editable,
}) => {
  const [hidePass, setHidePass] = useState(pass);
  return (
    <>
      <View
        style={[
          styles.mainContainer,
          {
            borderColor: error ? COLORS.red : COLORS.input,
            marginBottom: error ? 5 : 20,
          },
        ]}
      >
        <Icons
          family={email || name ? "Feather" : "MaterialCommunityIcons"}
          name={email ? "mail" : name ? "user" : "lock-outline"}
          size={22}
          color={error ? COLORS.red : COLORS.darkGray}
        />

        <View style={{ flex: 1 }}>
          <CustomText
            label={email ? "Email" : name ? "User Name" : "Password"}
            fontFamily={Fonts.bold}
            color={COLORS.primaryColor}
            marginLeft={20}
            marginBottom={-3}
          />
          <TextInput
            placeholder={email ? "john@gmail.com" : name ? "John" : "********"}
            style={styles.input}
            secureTextEntry={hidePass}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor={COLORS.gray}
            autoCapitalize={email && "none"}
            editable={!editable}
          />
        </View>

        {pass ? (
          <Icons
            onPress={() => setHidePass(!hidePass)}
            family="Entypo"
            name={!hidePass ? "eye" : "eye-with-line"}
            size={22}
          />
        ) : null}
      </View>
      {error && (
        <CustomText
          label={error}
          color={COLORS.red}
          marginBottom={20}
          marginLeft={10}
        />
      )}
    </>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.input,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    borderWidth: 1,
    height: 81,
    width: "100%",
  },
  input: {
    padding: 0,
    margin: 0,
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: COLORS.black,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    height: "50%",
  },
  leftIcon: {
    width: 17,
    height: 17,
    resizeMode: "contain",
  },
  eye: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});
