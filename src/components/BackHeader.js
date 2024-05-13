import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

import CustomText from "./CustomText";
import Icons from "./Icons";

import { images } from "../assets/images";
import { COLORS } from "../utils/COLORS";
import { Fonts } from "../utils/fonts";

const BackHeader = ({
  title,
  onSettingPress,
  onBackPress,
  onDotPress,
  onSharePress,
  style,
  color,
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.mainContainer, style]}>
      <Icons
        family="Ionicons"
        name="arrow-back"
        size={25}
        color={color || COLORS.black}
        onPress={onBackPress ? onBackPress : () => navigation.goBack()}
      />
      <CustomText
        label={title}
        fontSize={18}
        fontFamily={Fonts.semiBold}
        color={color || COLORS.black}
      />

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {onSettingPress ? (
          <TouchableOpacity onPress={onSettingPress} activeOpacity={0.6}>
            <Image
              source={images.setting}
              style={[styles.icon, { tintColor: color || COLORS.black }]}
            />
          </TouchableOpacity>
        ) : null}
        {onSharePress ? (
          <Icons
            family="Feather"
            name="share-2"
            size={22}
            color={color || COLORS.black}
            onPress={onSharePress}
            style={{ marginRight: 15 }}
          />
        ) : null}
        {onDotPress ? (
          <TouchableOpacity onPress={onDotPress} activeOpacity={0.6}>
            <Image
              source={images.more}
              style={[styles.icon, { tintColor: color || COLORS.black }]}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    padding: 10,
    paddingBottom: 15,
    marginLeft: "2.5%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  profile: {
    height: 56,
    width: 56,
    borderRadius: 100,
    backgroundColor: COLORS.gray,
  },
  icon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
});
