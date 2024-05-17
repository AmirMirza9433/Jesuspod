import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

import CustomText from "./CustomText";
import Icons from "./Icons";

import { COLORS } from "../utils/COLORS";
import { Fonts } from "../utils/fonts";

const BackHeader = ({
  title,
  onBackPress,
  onHeartPress,
  onSharePress,
  color,
  isHeart = false,
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.mainContainer]}>
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

        {onHeartPress ? (
          <Icons
            family="AntDesign"
            name={isHeart ? "heart" : "hearto"}
            size={22}
            color={color ? color : isHeart ? COLORS.red : COLORS.black}
            onPress={onHeartPress}
            style={{ marginRight: 15 }}
          />
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
