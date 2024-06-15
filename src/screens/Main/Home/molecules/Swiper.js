import {
  Animated,
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { COLORS } from "../../../../utils/COLORS";
import TopCart from "./TopCart";
import ScreenWrapper from "../../../../components/ScreenWrapper";
import ImageFast from "../../../../components/ImageFast";
import { Fonts } from "../../../../utils/fonts";
import { images } from "../../../../assets/images";
import CustomText from "../../../../components/CustomText";
import { TouchableOpacity } from "react-native";
import Icons from "../../../../components/Icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const Swiper = ({ array, onPress }) => {
  console.log("====================================");
  console.log(array);
  console.log("====================================");
  const navigation = useNavigation();

  const formatTime = (timeStr) => {
    const timestamp = timeStr[0];

    const parts = timestamp.split(":").map(Number);
    let formattedTime = "";

    if (parts.length === 1) {
      // Only seconds
      formattedTime = `${parts[0]}s`;
    } else if (parts.length === 2) {
      // Minutes and seconds
      formattedTime = `${parts[0]}m `;
    } else if (parts.length === 3) {
      // Hours, minutes, and seconds
      formattedTime = `${parts[0]}h ${parts[1]}m `;
    }

    return formattedTime;
  };
  // const flatListRef = useRef();
  // const [currentIndex, setCurrentIndex] = useState(0);
  // useEffect(() => {
  //   flatListRef.current.scrollToIndex({ animated: true, index: currentIndex });
  // }, [currentIndex]);
  return (
    <FlatList
      data={array}
      showsHorizontalScrollIndicator={false}
      horizontal
      renderItem={({ item, index }) => (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={
            onPress
              ? () => navigation.navigate("ProductDetail", { item })
              : null
          }
          style={{ position: "relative" }}
        >
          <ImageFast
            resizeMode="cover"
            style={styles.thumb}
            source={{
              uri:
                item?.channel?.image ||
                item?.image ||
                item?.channel?.imageUrl ||
                item?.imageUrl,
            }}
          />

          <ImageBackground
            resizeMode="cover"
            imageStyle={{ borderRadius: 16 }}
            source={images.gradient}
            style={styles.headerContent}
          >
            <View>
              <CustomText
                label={
                  item?.item?.["itunes:title"] ||
                  item?.item?.title ||
                  item.title
                }
                fontFamily={Fonts.bold}
                numberOfLines={2}
                color={COLORS.white}
              />
              {item?.item?.["itunes:duration"] ? (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    navigation.navigate("PlayerScreen", {
                      item: item?.item,
                      channel: item?.channel,
                    });
                  }}
                  style={styles.playContainer}
                >
                  <Icons
                    family="AntDesign"
                    name="caretright"
                    size={22}
                    color={COLORS.primaryColor}
                  />
                  <CustomText
                    label={
                      item?.item?.["itunes:duration"]
                        ? formatTime(item?.item?.["itunes:duration"])
                        : item?.item?.["itunes:duration"] ||
                          item?.["itunes:duration"]
                    }
                    fontFamily={Fonts.semiBold}
                    marginTop={5}
                    marginLeft={5}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </ImageBackground>
        </TouchableOpacity>
      )}
    />
  );
};

export default Swiper;

const styles = StyleSheet.create({
  thumb: {
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    height: 300,
    width: 250,
    marginRight: 15,
  },
  playContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gray,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 100,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  headerContent: {
    padding: 15,
    position: "absolute",
    bottom: 0,
    width: 250,

    // left: 10,
  },
});
