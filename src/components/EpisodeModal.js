import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import React, { useEffect, useState } from "react";
import { COLORS } from "../utils/COLORS";
import Icons from "./Icons";
import ImageFast from "./ImageFast";
import { images } from "../assets/images";
import CustomText from "./CustomText";
import { Fonts } from "../utils/fonts";

const EpisodeModal = ({
  isVisible,
  transparent = true,
  onDisable,
  backdropOpacity,
  mainMargin,
  marginTop,
  marginBottom,
  marginVertical,
  marginHorizontal,
  borderRadius,
  overflow,
  children,
  chanalImage,
  episodeData,
  onplay,
}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  console.log(episodeData);
  const changedata = (timestamp) => {
    const date = new Date(timestamp);
    const dayMonth = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    });

    return dayMonth;
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      transparent={transparent}
      onBackdropPress={onDisable}
      onBackButtonPress={onDisable}
      onDismiss={onDisable}
      backdropOpacity={backdropOpacity}
      style={[
        {
          margin: mainMargin,
          marginTop,
          marginBottom,
          marginVertical,
          marginHorizontal,
          borderRadius,
          overflow,
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.mainContainer,
          { justifyContent: isKeyboardVisible ? "flex-start" : "flex-end" },
        ]}
        activeOpacity={1}
      >
        <View style={styles.container} activeOpacity={1}>
          <TouchableOpacity onPress={onDisable} style={styles.cross}>
            <Icons
              family={"Entypo"}
              name={"circle-with-cross"}
              size={25}
              color={COLORS.primaryColor}
            />
          </TouchableOpacity>
          <ImageBackground
            resizeMode="cover"
            source={images.gradient}
            style={styles.headerContent}
          >
            <ImageFast
              source={{ uri: chanalImage }}
              style={styles.headerContent1}
              resizeMode={"contain"}
            />

            <TouchableOpacity onPress={() => onplay(episodeData)}>
              <Icons
                family={"AntDesign"}
                name={"play"}
                size={40}
                marginTop={20}
                color={COLORS.primaryColor}
              />
            </TouchableOpacity>

            <CustomText
              label={changedata(episodeData?.pubDate)}
              fontFamily={Fonts.regular}
              fontSize={15}
              marginTop={10}
              color={COLORS.white}
              marginBottom={10}
            />
            <CustomText
              label={episodeData?.title}
              fontFamily={Fonts.bold}
              color={COLORS.white}
              fontSize={18}
            />
          </ImageBackground>

          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default EpisodeModal;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.white,
    position: "absolute",
    bottom: 0,
    height: 500,
    borderRadius: 20,
  },
  container: {
    width: "100%",
    height: 500,
  },
  cross: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    position: "absolute",
    top: 0,
    zIndex: 9999999,
  },
  headerContent1: {
    height: 200,
    width: 200,
  },
  headerContent: {
    height: 500,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
