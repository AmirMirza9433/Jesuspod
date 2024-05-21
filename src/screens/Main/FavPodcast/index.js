import { useDispatch, useSelector } from "react-redux";
import React from "react";
import RNFetchBlob from "rn-fetch-blob";
import {
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
} from "react-native";

import ScreenWrapper from "../../../components/ScreenWrapper";
import BackHeader from "../../../components/BackHeader";
import CustomText from "../../../components/CustomText";
import MenuOptios from "../../../components/Menu";
import Icons from "../../../components/Icons";

import { setRecentMusic } from "../../../store/reducer/recentSlice";
import { COLORS } from "../../../utils/COLORS";
import { Fonts } from "../../../utils/fonts";

const FavPodcast = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const channel = route?.params?.item;
  const recentMusic = useSelector((state) => state.recent.recentMusic);
  const userData = useSelector((state) => state.user.users);

  const loading = false;

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
  return (
    <ScreenWrapper
      scrollEnabled
      statusBarColor="transparent"
      transclucent
      paddingHorizontal={0.1}
      headerUnScrollable={() => (
        <View style={{ paddingVertical: 10 }}>
          <BackHeader title="Favorite Podcast" />
        </View>
      )}
    >
      <ScrollView
        horizontal
        contentContainerStyle={{ width: "100%" }}
        scrollEnabled={false}
      >
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {}}
              colors={[COLORS.primaryColor]}
            />
          }
          data={userData?.musics}
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
              <CustomText
                label={item?.description}
                color={COLORS.gray}
                numberOfLines={2}
              />
              <View style={styles.row}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    createRecent(item);
                    navigation.navigate("PlayerScreen", { item, channel });
                  }}
                  style={styles.playContainer}
                >
                  <Icons
                    family="AntDesign"
                    name="caretright"
                    size={22}
                    color={COLORS.primaryColor}
                  />
                  <CustomText
                    label={item?.["itunes:duration"]}
                    fontFamily={Fonts.semiBold}
                    marginTop={4}
                    marginLeft={5}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <TouchableOpacity
                    style={styles.downloadsIcon}
                    onPress={() => download(item)}
                  >
                    <Icons
                      family="Ionicons"
                      name="arrow-down-circle"
                      size={22}
                      color={COLORS.primaryColor}
                    />
                  </TouchableOpacity>
                  <MenuOptios ItemData={item} chanalData={channel} />
                </View>
              </View>
            </View>
          )}
        />
      </ScrollView>
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
