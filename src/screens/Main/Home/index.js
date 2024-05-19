import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import SearchInput from "../../../components/SearchInput";
import Header from "../../../components/Header";
import Card from "../../../components/Card";
import Tab from "../../../components/Tab";

import Swiper from "./molecules/Swiper";

import { COLORS } from "../../../utils/COLORS";
import { getAllDocs } from "../../../Firebase";
import CustomText from "../../../components/CustomText";
import { Fonts } from "../../../utils/fonts";
import Icons from "../../../components/Icons";

const Home = ({ navigation }) => {
  const userData = useSelector((state) => state.user.users);
  const recenctMusic = useSelector((state) => state.recent.recenctMusic);

  const [loading, setLoading] = useState(false);
  const [channels, setChannels] = useState([]);
  const [random5, setrandom5] = useState([]);

  const [tab, setTab] = useState("For you");
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

  const randomdata = async () => {
    try {
      const res = await getAllDocs("channels");
      const data = res?.[0]?.channels;
      if (data) {
        const randomChannels = getRandomChannels(data);
        setrandom5(randomChannels);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("=========error:", error);
    }
  };

  const getRandomChannels = (channels) => {
    // Shuffle the array and pick the first 5
    return channels.sort(() => 0.5 - Math.random()).slice(0, 5);
  };

  useEffect(() => {
    getChannels();
    randomdata();
  }, []);

  return (
    <ScreenWrapper
      scrollEnabled
      paddingHorizontal={15}
      headerUnScrollable={() => (
        <View style={{ padding: 20 }}>
          <Header
            onPress={() => navigation.navigate("Profile")}
            hideBackArrowr
            userProfile={userData?.userImage}
            title={userData?.userName}
            subTitle="Enjoy your favorite podcast!"
            notiIcon
          />
          <SearchInput placeholder="Search" />
        </View>
      )}
    >
      <Tab
        array={["For you", "Podcast", "Radio"]}
        value={tab}
        setVale={setTab}
        paddingHorizontal={20}
      />
      {recenctMusic?.length ? (
        <View>
          <Swiper array={recenctMusic} />
        </View>
      ) : (
        <View>
          <Swiper array={random5} onPress={true} />
        </View>
      )}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <CustomText
          label={"Recommended for You"}
          color={COLORS.black}
          fontFamily={Fonts.bold}
          fontSize={16}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <CustomText
            label={"See All"}
            color={COLORS.primaryColor}
            fontFamily={Fonts.bold}
            fontSize={16}
            onPress={() => navigation.navigate("SeeAll")}
          />

          <Icons
            family={"Feather"}
            name={"chevron-right"}
            color={COLORS.primaryColor}
            size={20}
          />
        </View>
      </View>

      <View>
        <FlatList
          horizontal
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={getChannels}
              colors={[COLORS.primaryColor]}
            />
          }
          data={channels}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item, index }) => (
            <Card
              imageHeight={183}
              width={183}
              image={item.image}
              marginRight={10}
              item={item}
              title={item.title}
            />
          )}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItem: "center",
          justifyContent: "space-between",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <CustomText
          label={"New Release"}
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
            onPress={() => navigation.navigate("SeeAll")}
          />

          <Icons
            family={"Feather"}
            name={"chevron-right"}
            color={COLORS.primaryColor}
            size={20}
          />
        </View>
      </View>

      <View>
        <FlatList
          horizontal
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={getChannels}
              colors={[COLORS.primaryColor]}
            />
          }
          data={channels}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item, index }) => (
            <Card
              imageHeight={183}
              width={183}
              image={item.image}
              marginRight={10}
              item={item}
              title={item.title}
            />
          )}
        />
      </View>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
