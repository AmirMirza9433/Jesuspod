import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";

import CustomText from "./CustomText";
import Icons from "./Icons";

import { COLORS } from "../utils/COLORS";
import { Fonts } from "../utils/fonts";
import { Image } from "react-native";
import { images } from "../assets/images";
import ImageFast from "./ImageFast";

const Header = ({
  title,
  notiIcon,
  searchIcon,
  subTitle,
  onPress,
  onSettingPress,
  userProfile,
}) => {
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
          gap: 10,
          alignItems: "center",
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
        <Icons
          family={"MaterialCommunityIcons"}
          name={"bell-badge-outline"}
          size={30}
          color={COLORS.primaryColor}
        />
      ) : null}
      {searchIcon ? (
        <Icons
          family="Feather"
          name="search"
          size={25}
          color={COLORS.darkGray}
        />
      ) : null}
      {onSettingPress ? (
        <TouchableOpacity onPress={onSettingPress} activeOpacity={0.6}>
          <Image source={images.setting} style={styles.icon} />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

export default Header;

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
    // backgroundColor: COLORS.gray,
  },
  icon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
});
