import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import RNFetchBlob from "rn-fetch-blob";
import {
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
} from "react-native";
import firestore from "@react-native-firebase/firestore";

import ScreenWrapper from "../../../components/ScreenWrapper";
import BackHeader from "../../../components/BackHeader";
import CustomText from "../../../components/CustomText";
import MenuOptios from "../../../components/Menu";
import Icons from "../../../components/Icons";

import { setRecentMusic } from "../../../store/reducer/recentSlice";
import { COLORS } from "../../../utils/COLORS";
import { Fonts } from "../../../utils/fonts";
import { useState } from "react";
import Card from "../../../components/Card";

const FavPodcast = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const channel = route?.params?.item;
  const recentMusic = useSelector((state) => state.recent.recentMusic);
  const userData = useSelector((state) => state.user.users);
  const [PodcastData, setPodcastData] = useState([]);
  const [loading, setloading] = useState(false);
  const getUserData = async () => {
    setloading(true);
    try {
      const userDocRef = firestore().collection("users").doc(userData?.userId);
      const userDoc = await userDocRef.get();

      if (userDoc.exists) {
        const userData = userDoc.data();
        setPodcastData(userData);
        setloading(false);

        return userData; // Return user data for further processing
      } else {
        console.log("User document not found");
        setloading(false);

        return null; // Handle case where user document doesn't exist
      }
    } catch (error) {
      setloading(false);

      console.error("Error fetching user data:", error);
      return null; // Handle error scenario
    }
  };

  const download = (data) => {
    const { config, fs } = RNFetchBlob;
    const downloads = fs.dirs.DownloadDir;
    return config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: downloads + "/" + data?.title[0] + ".png",
      },
    }).fetch("GET", data?.enclosure[0].$.url);
  };

  const createRecent = (newData) => {
    let myArray = [];
    if (Array.isArray(recentMusic)) {
      myArray = [...recentMusic];
    }
    const res = [{ channel, item: newData }, ...myArray];
    dispatch(setRecentMusic(res.slice(0, 4)));
  };

  const changedata = (timestamp) => {
    const date = new Date(timestamp);
    const dayMonth = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    });

    return dayMonth;
  };
  useEffect(() => {
    getUserData();
  }, [""]);

  return (
    <ScreenWrapper
      scrollEnabled
      statusBarColor="transparent"
      transclucent
      // paddingHorizontal={0.1}
      headerUnScrollable={() => (
        <View style={{ paddingVertical: 10 }}>
          <BackHeader title="Downloads" />
        </View>
      )}
    >
      {/* <FlatList
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {}}
              colors={[COLORS.primaryColor]}
            />
          }
          data={PodcastData?.musics}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <View style={styles.mapListContainer}>
              <CustomText
                label={changedata(item?.pubDate)}
                fontFamily={Fonts.regular}
                fontSize={15}
                marginBottom={10}
              />
              <CustomText
                label={item?.title}
                fontFamily={Fonts.bold}
                fontSize={18}
              />

             
            </View>
          )}
        /> */}

      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getUserData}
            colors={[COLORS.primaryColor]}
          />
        }
        data={PodcastData?.musics}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <Card
            imageHeight={180}
            marginRight={(2 % index) + 1 !== 0 ? "4%" : 0}
            image={item.imageUrl}
            item={item}
            title={item.title}
            onPress={() => navigation.navigate("PlayerScreen", { item: item })}
          />
        )}
      />
    </ScreenWrapper>
  );
};

export default FavPodcast;

const styles = StyleSheet.create({
  headerImage: {
    width: "100%",
    height: 400,
    backgroundColor: COLORS.gray,
    justifyContent: "flex-end",
  },
  headerContent: {
    padding: 15,
  },
  listContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.gray,
  },
  playContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gray,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 100,
    alignSelf: "flex-start",
  },
  mapListContainer: {
    borderBottomWidth: 0.6,
    borderBottomColor: COLORS.gray,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
});
