import { useIsFocused } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  FlatList,
  View,
} from "react-native";

import ScreenWrapper from "../../../components/ScreenWrapper";
import SearchInput from "../../../components/SearchInput";
import CustomText from "../../../components/CustomText";
import ImageFast from "../../../components/ImageFast";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import Card from "../../../components/Card";

import Swiper from "./molecules/Swiper";

import { COLORS } from "../../../utils/COLORS";
import { getAllDocs } from "../../../Firebase";
import { Fonts } from "../../../utils/fonts";
import { images } from "../../../assets/images";

const Home = ({ navigation }) => {
  const isFocused = useIsFocused();
  const userData = useSelector((state) => state.user.users);
  const recentMusic = useSelector((state) => state.recent.recentMusic);
  const isPlayer = useSelector((state) => state.player.isPlayer);

  const [loading, setLoading] = useState(false);
  const [channels, setChannels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [RcomendedMusic, setRcomendedMusic] = useState([]);

  const getAllStarredMusic = async () => {
    try {
      const snapshot = await firestore().collection("stared").get();
      const starredMusic = snapshot.docs.map((doc) => doc.data());
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

  return (
    <>
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
        <View style={{ marginBottom: 100 }}>
          <Swiper
            isPlayer={recentMusic?.length}
            array={recentMusic?.length ? recentMusic : channels?.slice(0, 5)}
          />

          <TouchableOpacity
            style={styles.radio}
            onPress={() => navigation.navigate("RadioPlayer")}
          >
            <ImageFast
              source={images.radio}
              style={{ width: "100%", height: "100%", position: "absolute" }}
              resizeMode={"cover"}
            />
            <CustomText
              label={"Radio"}
              color={COLORS.white}
              fontFamily={Fonts.bold}
              marginLeft={30}
              fontSize={25}
            />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
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
        </View>
      </ScreenWrapper>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  radio: {
    height: 120,
    overflow: "hidden",
    borderRadius: 10,
    marginTop: 10,
    flexDirection: "column",
    justifyContent: "center",
  },
});
