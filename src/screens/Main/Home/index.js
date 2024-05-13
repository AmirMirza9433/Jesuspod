import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { parseString } from "react-native-xml2js";
import { useSelector } from "react-redux";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import SearchInput from "../../../components/SearchInput";
import CustomText from "../../../components/CustomText";
import Category from "../../../components/Category";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import Card from "../../../components/Card";

import { COLORS } from "../../../utils/COLORS";
import { Fonts } from "../../../utils/fonts";
import axios from "axios";

const Home = ({ navigation }) => {
  const userData = useSelector((state) => state.user.users);
  const [postcatData, setPodcastData] = useState([]);
  const [postCastImage, setPostCastImage] = useState("");
  const status = [
    {
      id: "all",
      name: "For You",
    },
    {
      id: "pending",
      name: "Podcast",
    },
    {
      id: "accepted",
      name: "Radio",
    },
  ];

  const [selectedStatus, setSelectedStatus] = useState("all");

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };

  useEffect(() => {
    axios
      .get("https://feed.podbean.com/allnationschurchdublin/feed.xml")
      .then((response) => {
        const xmlData = response.data;

        parseString(xmlData, (err, res) => {
          setPodcastData(res.rss.channel[0].item);
          setPostCastImage(res.rss.channel[0]["itunes:image"][0].$.href);
          // [0].enclosure[0].$.url;
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <ScreenWrapper
      scrollEnabled
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
      {/* <ScrollView>
        {postcatData.map((item, index) => (
          <View key={index}>
            <Text>{item?.["itunes:author"]}</Text>
          </View>
        ))}
      </ScrollView> */}

      <View style={styles.header}>
        {status.map((item, index) => (
          <Category
            key={index}
            name={item.name}
            selected={selectedStatus === item.id}
            onSelect={() => handleStatusSelect(item.id)}
          />
        ))}
      </View>
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
          />
        </View>
        <View style={styles.topImage} />
      </View>
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
        data={postcatData}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <Card
            imageHeight={183}
            width={190}
            image={postCastImage}
            heading={item?.title}
            title={`EPS ${item?.["itunes:episode"]} | Podcast  `}
            des={item?.description}
            author={item?.["itunes:author"]}
            time={item?.["itunes:duration"]}
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
          label="New Release"
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
        horizontal
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <Card
            imageHeight={183}
            width={190}
            heading={"Thriller & Horror"}
            title={"EPS 25 | Night of Terror"}
            des={"Nightmare Stories"}
            author={"by Trio of Norman"}
            time={"10 Mins"}
          />
        )}
      />
    </ScreenWrapper>
  );
};

export default Home;

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
    width: "90%",
  },

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
