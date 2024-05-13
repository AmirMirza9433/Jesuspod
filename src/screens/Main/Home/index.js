import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { parseString } from "react-native-xml2js";
import { useSelector } from "react-redux";
import axios from "axios";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import SearchInput from "../../../components/SearchInput";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import Card from "../../../components/Card";

import { COLORS } from "../../../utils/COLORS";
import { Fonts } from "../../../utils/fonts";

const Home = ({ navigation }) => {
  const userData = useSelector((state) => state.user.users);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const urls = [
          "https://feed.podbean.com/allnationschurchdublin/feed.xml",
          "https://anchor.fm/s/682886c/podcast/rss",
          // "https://feeds.buzzsprout.com/121969.rss",
          "https://mercyculture.podbean.com/feed.xml",
          "https://freshstartaz.podbean.com/feed.xml",
          "https://feeds.transistor.fm/redemption-to-the-nations-church",
        ];

        const responses = await Promise.all(urls.map((url) => axios.get(url)));

        const channelsData = await Promise.all(
          responses.map((response) => {
            const xmlData = response.data;
            return new Promise((resolve, reject) => {
              parseString(xmlData, (err, res) => {
                if (err) {
                  reject(err);
                } else {
                  resolve({
                    image:
                      res?.rss?.channel?.[0]?.["itunes:image"]?.[0]?.$.href,
                    items: res?.rss?.channel?.[0]?.item,
                    title: res?.rss?.channel?.[0]?.title,
                  });
                }
              });
            });
          })
        );

        setChannels(channelsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPodcasts();
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
        data={channels}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <Card
            imageHeight={183}
            width="100%"
            image={item.image}
            item={item.items}
            // heading={item?.title}
            title={item.title}
            // des={item?.description}
            // author={item?.["itunes:author"]}
            // time={item?.["itunes:duration"]}
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
