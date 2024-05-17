import { StyleSheet, View } from "react-native";
import React from "react";

import CustomButton from "../../../../components/CustomButton";
import CustomText from "../../../../components/CustomText";

import { COLORS } from "../../../../utils/COLORS";
import { Fonts } from "../../../../utils/fonts";
import { useNavigation } from "@react-navigation/native";

const TopCart = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.topChart}>
      <View>
        <CustomText
          label={"Top Chart of the Week"}
          color={COLORS.primaryColor}
          fontFamily={Fonts.bold}
          fontSize={16}
        />
        <CustomText
          label={"True Crime Chronicles"}
          color={COLORS.black}
          fontFamily={Fonts.bold}
          fontSize={16}
          marginTop={15}
        />

        <View
          style={{
            flexDirection: "row",
            gap: 10,
            marginTop: 5,
            alignItems: "center",
          }}
        >
          <CustomText
            label={"by Detective Joan"}
            color={COLORS.gray}
            fontFamily={Fonts.bold}
            fontSize={12}
          />

          <CustomText
            label={"120K Listening"}
            color={COLORS.gray}
            fontFamily={Fonts.bold}
            fontSize={12}
          />
        </View>
        <CustomButton
          title="Play Now"
          width="50%"
          alignSelf="start"
          height={34}
          icon
          iconColor={COLORS.white}
          iconfamily="Feather"
          iconname="play-circle"
          iconGap={10}
          marginTop={15}
          iconFontSize={20}
          btnFont={Fonts.regular}
          fontSize={12}
          onPress={() =>
            navigation.navigate("PlayerScreen", {
              item: item?.item,
              channel: item?.channel,
            })
          }
        />
      </View>
      <View style={styles.topImage} />
    </View>
  );
};

export default TopCart;

const styles = StyleSheet.create({
  topChart: {
    backgroundColor: COLORS.orange,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    overflow: "hidden",
    marginBottom: 20,
    width: "90%",
    alignSelf: "center",
  },
  topImage: {
    height: 125,
    width: 150,
    backgroundColor: COLORS.gray,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    right: -30,
  },
});
