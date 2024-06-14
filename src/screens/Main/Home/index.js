import { FlatList, RefreshControl, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ScreenWrapper from "../../../components/ScreenWrapper";
import SearchInput from "../../../components/SearchInput";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import Card from "../../../components/Card";
import Tab from "../../../components/Tab";

import Swiper from "./molecules/Swiper";

import { COLORS } from "../../../utils/COLORS";
import { getAllDocs } from "../../../Firebase";
import { Fonts } from "../../../utils/fonts";

const Home = ({ navigation }) => {
  const userData = useSelector((state) => state.user.users);
  const recentMusic = useSelector((state) => state.recent.recentMusic);

  const [loading, setLoading] = useState(false);
  const [channels, setChannels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [tab, setTab] = useState("For you");

  const getChannels = async () => {
    setLoading(true);
    try {
      const res = await getAllDocs("chanals");
      setChannels(res?.[0]?.podcasts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("=========error:", error);
    }
  };

  useEffect(() => {
    getChannels();
  }, []);

  const filteredChannels = channels.filter((channel) =>
    channel.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <SearchInput
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}
    >
      <Tab
        array={["For you", "Podcast", "Radio"]}
        value={tab}
        setVale={setTab}
        paddingHorizontal={20}
      />

      <Swiper
        array={recentMusic?.length ? recentMusic : channels?.slice(0, 5)}
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
          data={filteredChannels}
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
          data={filteredChannels}
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
