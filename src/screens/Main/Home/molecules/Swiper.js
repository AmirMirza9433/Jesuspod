import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  FlatList,
  View,
} from "react-native";

import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";

import { images } from "../../../../assets/images";
import { COLORS } from "../../../../utils/COLORS";
import { Fonts } from "../../../../utils/fonts";

const Swiper = ({ array, onPress, isPlayer }) => {
  const navigation = useNavigation();
  return (
    <FlatList
      data={array}
      showsHorizontalScrollIndicator={false}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={
            onPress
              ? onPress
              : () =>
                  navigation.navigate(
                    isPlayer ? "PlayerScreen" : "ProductDetail",
                    { item }
                  )
          }
          style={{ position: "relative" }}
        >
          <ImageFast
            resizeMode="cover"
            style={styles.thumb}
            source={{ uri: item?.channel?.imageUrl || item?.imageUrl }}
          />

          <ImageBackground
            resizeMode="cover"
            imageStyle={{ borderRadius: 16 }}
            source={images.gradient}
            style={styles.headerContent}
          >
            <View>
              <CustomText
                label={item?.channel?.title || item?.title}
                fontFamily={Fonts.bold}
                numberOfLines={2}
                color={COLORS.white}
              />
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
  },
});
