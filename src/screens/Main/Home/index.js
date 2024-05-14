import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import SearchInput from "../../../components/SearchInput";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import Card from "../../../components/Card";

import { COLORS } from "../../../utils/COLORS";
import { getAllDocs } from "../../../Firebase";
import { Fonts } from "../../../utils/fonts";

const Home = ({ navigation }) => {
  const userData = useSelector((state) => state.user.users);
  const [loading, setLoading] = useState(false);
  const [channels, setChannels] = useState([]);
  const getChannels = async () => {
    setLoading(true);
    try {
      const res = await getAllDocs("channels");
      setChannels(res?.[0]?.channels);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("=========error:", error);
    }
  };
  useEffect(() => {
    getChannels();
  }, []);

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Header
          onPress={() => navigation.navigate("Profile")}
          hideBackArrowr
          userProfile={userData?.userImage}
          title={userData?.userName}
          subTitle="Enjoy your favorite podcast!"
          onSettingPress={false}
          notiIcon
        />
      )}
    >
      <SearchInput placeholder="Search" />

      {/* <View style={styles.topChart}>
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
          />
        </View>
        <View style={styles.topImage} />
      </View> */}
      <CustomText
        label="Recommended for You"
        color={COLORS.black}
        fontFamily={Fonts.bold}
        fontSize={16}
      />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getChannels}
            colors={[COLORS.primaryColor]}
          />
        }
        data={channels}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Card
            imageHeight={183}
            width="100%"
            image={item.image}
            item={item}
            title={item.title}
          />
        )}
      />
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  topChart: {
    backgroundColor: COLORS.orange,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    overflow: "hidden",
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
