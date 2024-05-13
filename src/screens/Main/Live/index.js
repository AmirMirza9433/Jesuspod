import { FlatList, StyleSheet, View } from "react-native";
import React from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import Card from "../../../components/Card";

import { COLORS } from "../../../utils/COLORS";
import { Fonts } from "../../../utils/fonts";
const Live = () => {
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <Header
          hideBackArrow
          title="Live Podcast"
          subTitle={"Experience Real-Time Podcasting"}
          onSettingPress={false}
          searchIcon
          profile
        />
      )}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <CustomText
          label={"Ongoing Live"}
          color={COLORS.black}
          fontFamily={Fonts.bold}
          fontSize={16}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CustomText
            label={"See All"}
            color={COLORS.primaryColor}
            fontFamily={Fonts.bold}
            fontSize={16}
          />

          <Icons
            family={"Feather"}
            name={"chevron-right"}
            color={COLORS.primaryColor}
            size={20}
          />
        </View>
      </View>
      <FlatList
        data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <Card
            title={"EPS 25 | Night of Terror"}
            des={"Nightmare Stories"}
            author={"by Trio of Norman"}
            time={"10 Mins"}
            imageHeight={180}
            width={190}
            marginRight={(2 % index) + 1 !== 0 ? 20 : 0}
            live
          />
        )}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <CustomText
          label="Coming Soon"
          color={COLORS.black}
          fontFamily={Fonts.bold}
          fontSize={16}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CustomText
            label={"See All"}
            color={COLORS.primaryColor}
            fontFamily={Fonts.bold}
            fontSize={16}
          />

          <Icons
            family={"Feather"}
            name={"chevron-right"}
            color={COLORS.primaryColor}
            size={20}
          />
        </View>
      </View>

      <FlatList
        data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <Card
            flex="row"
            align="center"
            title="EPS 5 | Future Innovations"
            des="TechTalk Live  by Tech Pioneers"
            author="Live Apr 4th - 10:00 AM"
            imageHeight={80}
            imageWith={80}
            gap={10}
            width="100%"
          />
        )}
      />
    </ScreenWrapper>
  );
};

export default Live;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: COLORS.white,
    borderRadius: 100,
    alignSelf: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "98%",
    // borderBottomColor: COLORS.lightGray,
    // borderBottomWidth: 1,
  },
});
