import { TouchableOpacity, ActivityIndicator, View } from "react-native";
import React from "react";

import CustomText from "./CustomText";
import Icons from "./Icons";

import { COLORS } from "../utils/COLORS";
import { Fonts } from "../utils/fonts";

const CustomButton = ({
  onPress,
  title,
  disabled,
  loading,
  customStyle,
  customText,
  marginBottom,
  marginTop,
  backgroundColor,
  color,
  width = "100%",
  height = 53,
  borderRadius = 50,
  justifyContent = "center",
  alignItems = "center",
  flexDirection = "row",
  alignSelf = "center",
  fontSize,
  indicatorcolor,
  borderWidth,
  borderColor,
  iconname,
  iconfamily,
  iconColor,
  icon,
  iconGap,
  iconFontSize,
  btnFont,
}) => {
  return (
    <TouchableOpacity
      disabled={loading || disabled}
      activeOpacity={0.6}
      style={[
        {
          backgroundColor: disabled
            ? COLORS.gray
            : backgroundColor
            ? backgroundColor
            : COLORS.primaryColor,
          marginTop,
          marginBottom,
          width,
          height,
          borderRadius,
          flexDirection,
          alignItems,
          justifyContent,
          alignSelf,
          borderWidth,
          borderColor,
        },
        customStyle,
      ]}
      onPress={onPress}
    >
      {loading && (
        <ActivityIndicator
          size={25}
          color={indicatorcolor ? COLORS.primaryColor : COLORS.white}
        />
      )}
      {!loading && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: iconGap || 5,
          }}
        >
          {icon ? (
            <View
              style={{
                backgroundColor: "transparent",
                height: 25,
                width: 25,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icons
                family={iconfamily}
                name={iconname}
                color={iconColor}
                size={iconFontSize}
              />
            </View>
          ) : null}

          <CustomText
            textStyle={customText}
            label={title}
            color={color ? color : COLORS.white}
            fontFamily={btnFont || Fonts.semiBold}
            fontSize={fontSize || 16}
            lineHeight={22}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
