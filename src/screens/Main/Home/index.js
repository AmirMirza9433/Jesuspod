import { FlatList, RefreshControl, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ScreenWrapper from "../../../components/ScreenWrapper";
import SearchInput from "../../../components/SearchInput";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import Card from "../../../components/Card";

import Swiper from "./molecules/Swiper";

import { COLORS } from "../../../utils/COLORS";
import { getAllDocs } from "../../../Firebase";
import { Fonts } from "../../../utils/fonts";

const Home = ({ navigation }) => {
  const isFocused = useIsFocused();
  const userData = useSelector((state) => state.user.users);
  const recentMusic = useSelector((state) => state.recent.recentMusic);
  const isPlayer = useSelector((state) => state.player.isPlayer);
  console.log(isPlayer);

  const [loading, setLoading] = useState(false);
  const [channels, setChannels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [RcomendedMusic, setRcomendedMusic] = useState([]);

  const getAllStarredMusic = async () => {
    try {
      const snapshot = await firestore().collection("stared").get();
      const starredMusic = snapshot.docs.map((doc) => doc.data());
      console.log(starredMusic[0]?.Staredmusic[0]?.title);
      setRcomendedMusic(starredMusic);
      return starredMusic;
    } catch (error) {
      console.error("Error fetching starred music:", error);
      return [];
    }
  };

  useEffect(() => {
    getAllStarredMusic();
  }, [isFocused]);

  // const addKeyToFirestore = async (id, key, value) => {
  //   try {
  //     const res = await firestore()
  //       .collection("Newchannels")
  //       .doc(id)
  //       .set({ [key]: value }, { merge: true });
  //     console.log(res);
  //   } catch (error) {
  //     console.error("Error adding key: ", error);
  //   }
  // };
  const getChannels = async () => {
    setLoading(true);
    try {
      const res = await getAllDocs("Newchannels");
      setChannels(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("=========error:", error);
    }
  };

  useEffect(() => {
    getChannels();
  }, [isFocused]);

  const filteredChannels = channels.filter((channel) =>
    channel.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const dattRetune = (data) => {
    console.log(data);
  };

  return (
    <>
      <ScreenWrapper
        scrollEnabled
        paddingBottom={isPlayer ? 85 : 0}
        paddingHorizontal={15}
        headerUnScrollable={() => (
          <View style={{ padding: 20 }}>
            <Header
              onPress={() => navigation.navigate("Profile")}
              hideBackArrowr
              userProfile={userData?.userImage}
              title={userData?.userName}
              subTitle="Faith comes by hearing"
              notiIcon
            />
            <SearchInput
              onPress={() => navigation.navigate("SeeAll")}
              placeholder="Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        )}
      >
        <Swiper
          isPlayer={recentMusic?.length}
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
            label="Recommended for You"
            color={COLORS.black}
            fontFamily={Fonts.bold}
            fontSize={16}
          />
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
            data={RcomendedMusic}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <Card
                imageHeight={183}
                width={183}
                image={item?.imageUrl}
                marginRight={10}
                item={item}
                onPress={() =>
                  navigation.navigate("PlayerScreen", {
                    item: item?.Staredmusic[0],
                    channel: item?.imageUrl,
                  })
                }
                title={item?.Staredmusic[0]?.title}
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
            label="Just Added"
            color={COLORS.black}
            fontFamily={Fonts.bold}
            fontSize={16}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CustomText
              label="See All"
              color={COLORS.primaryColor}
              fontFamily={Fonts.bold}
              fontSize={16}
              onPress={() => navigation.navigate("SeeAll")}
            />

            <Icons
              family="Feather"
              name="chevron-right"
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
            renderItem={({ item }) => (
              <Card
                imageHeight={183}
                width={183}
                image={item?.imageUrl}
                marginRight={10}
                item={item}
                title={item?.title}
              />
            )}
          />
        </View>
      </ScreenWrapper>
    </>
  );
};

export default Home;
