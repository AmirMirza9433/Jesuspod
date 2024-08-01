import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

import CustomText from "./CustomText";
import ImageFast from "./ImageFast";
import Icons from "./Icons";

import { images } from "../assets/images";
import { COLORS } from "../utils/COLORS";
import { Fonts } from "../utils/fonts";

const Card = ({
  imageHeight,
  imageWith = "100%",
  title,
  image = "",
  heading,
  des,
  author,
  time,
  marginRight,
  live,
  flex,
  align,
  gap,
  width = "48%",
  onPress,
  item,
  textWidth,
  justifyContent,
  decNumLine = 1,
  marginLeft,
  typeofPod,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={
        onPress ? onPress : () => navigation.navigate("ProductDetail", { item })
      }
      style={[
        styles.container,
        {
          marginRight: marginRight || 0,
          marginLeft: marginLeft || 0,
          flexDirection: flex,
          alignItems: align,
          gap: gap,
          width,
          justifyContent,
        },
      ]}
    >
      <ImageFast
        resizeMode="contain"
        style={[styles.thumb, { height: imageHeight, width: imageWith }]}
        source={!image ? images.appLogo : { uri: image }}
      />
      {live ? (
        <View style={styles.livePod}>
          <Icons
            family={"Entypo"}
            name={"dot-single"}
            color={COLORS.white}
            size={20}
          />
          <CustomText
            label={"Live"}
            fontFamily={Fonts.semiBold}
            fontSize={14}
            color={COLORS.white}
          />
        </View>
      ) : (
        <View style={styles.length}>
          <CustomText
            label={time}
            fontFamily={Fonts.semiBold}
            fontSize={12}
            color={COLORS.white}
          />
        </View>
      )}
      <View style={{ width: textWidth }}>
        {heading ? (
          <CustomText
            label={heading}
            fontFamily={Fonts.semiBold}
            fontSize={12}
            numberOfLines={1}
            color={COLORS.primaryColor}
            marginTop={5}
            marginLeft={2}
          />
        ) : null}

        {typeofPod ? (
          <CustomText
            label={typeofPod}
            fontFamily={Fonts.semiBold}
            fontSize={12}
            numberOfLines={1}
            color={COLORS.primaryColor}
            marginTop={5}
            marginLeft={2}
          />
        ) : null}

        {title ? (
          <CustomText
            label={title}
            fontFamily={Fonts.bold}
            fontSize={14}
            color={COLORS.black}
            marginTop={5}
            numberOfLines={1}
            marginLeft={2}
          />
        ) : null}

        {des ? (
          <CustomText
            label={des}
            fontFamily={Fonts.semiBold}
            fontSize={12}
            numberOfLines={decNumLine}
            color={COLORS.gray}
            marginTop={5}
            marginLeft={2}
          />
        ) : null}
        {author ? (
          <CustomText
            label={author}
            fontFamily={Fonts.medium}
            fontSize={12}
            color={COLORS.black}
            marginTop={5}
            marginLeft={2}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
export default Card;
const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    width: "100%",
  },
  thumb: {
    backgroundColor: COLORS.gray,
    borderRadius: 16,
  },
  length: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  livePod: {
    position: "absolute",
    right: 10,
    top: 10,
    flexDirection: "row",
    borderRadius: 8,
    alignItems: "center",
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: COLORS.primaryColor,
  },
});
