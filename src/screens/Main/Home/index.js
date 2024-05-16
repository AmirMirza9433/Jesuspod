import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
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
import TopCart from "./molecules/TopCart";
import Tab from "../../../components/Tab";

const Home = ({ navigation }) => {
  const userData = useSelector((state) => state.user.users);
  const [loading, setLoading] = useState(false);
  const [channels, setChannels] = useState([]);
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
  useEffect(() => {
    getChannels();
  }, []);

  return (
    <ScreenWrapper
      paddingHorizontal={0.1}
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
      <TopCart />
      <View>
        <FlatList
          horizontal
          contentContainerStyle={{ paddingHorizontal: 15 }}
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
