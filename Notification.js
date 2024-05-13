import { StyleSheet, View, Image, Dimensions } from "react-native";
import React from "react";

import CustomText from "./src/components/CustomText";

import { COLORS } from "./src/utils/COLORS";
import { images } from "./src/assets/images";
import { Fonts } from "./src/utils/fonts";

const { width, height } = Dimensions.get("window");

const Notification = ({ title, desc, isVisible }) => {
  return (
    <>
      {isVisible ? (
        <View style={styles.mainContainer}>
          <View style={styles.Container}>
            <Image source={images.appIcon} style={styles.appIcon} />
            <View style={{ width: "82%" }}>
              <CustomText
                label={title}
                fontFamily={Fonts.semiBold}
                fontSize={18}
                numberOfLines={1}
                marginBottom={5}
              />
              <CustomText
                label={desc}
                fontFamily={Fonts.medium}
                numberOfLines={1}
              />
            </View>
          </View>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    position: "absolute",
    top: 0,
    zIndex: 9999,
    width,
    height: height / 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  Container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
    elevation: 2,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  appIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    resizeMode: "contain",
  },
});

export default Notification;
