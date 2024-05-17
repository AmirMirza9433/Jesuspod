import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";

import CustomText from "./CustomText";
import ImageFast from "./ImageFast";

import { images } from "../assets/images";
import { COLORS } from "../utils/COLORS";
import { Fonts } from "../utils/fonts";

const Header = ({ title, subTitle, onPress, userProfile, notiIcon }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      disabled={!onPress}
      style={styles.mainContainer}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        {userProfile ? (
          <ImageFast
            style={styles.profile}
            source={userProfile ? { uri: userProfile } : images.placeholder}
          />
        ) : null}
        <View>
          <CustomText
            label={title}
            fontSize={18}
            fontFamily={Fonts.semiBold}
            color={COLORS.black}
          />
          <CustomText
            label={subTitle}
            fontSize={14}
            fontFamily={Fonts.regular}
            color={COLORS.gray}
          />
        </View>
      </View>
      {notiIcon ? (
        <ImageFast
          style={styles.icn}
          resizeMode={"contain"}
          source={images.notifications}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  profile: {
    height: 56,
    width: 56,
    borderRadius: 100,
  },
  icon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
  icn: {
    height: 25,
    width: 25,
  },
});
