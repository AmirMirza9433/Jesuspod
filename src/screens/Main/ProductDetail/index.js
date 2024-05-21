import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { parseString } from "react-native-xml2js";
import RNFetchBlob from "rn-fetch-blob";
import Share from "react-native-share";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import {
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Text,
} from "react-native";

import ScreenWrapper from "../../../components/ScreenWrapper";
import BackHeader from "../../../components/BackHeader";
import CustomText from "../../../components/CustomText";
import Icons from "../../../components/Icons";

import { setRecentMusic } from "../../../store/reducer/recentSlice";
import { images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import { Fonts } from "../../../utils/fonts";
import MenuOptios from "../../../components/Menu";
import HTMLView from "react-native-htmlview";

const ProductDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const channel = route?.params?.item;
  const recentMusic = useSelector((state) => state.recent.recentMusic);

  const [loading, setLoading] = useState(false);
  const [podcasts, setPodcasts] = useState([]);

  const get = async () => {
    setLoading(true);
    const response = await axios.get(channel?.url);
    try {
      const xmlData = response.data;
      parseString(xmlData, (err, res) => {
        setPodcasts(res.rss.channel[0].item);
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.error("Error fetching data:", errror);
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

  useEffect(() => {
    get();
  }, [channel?.url]);
  const createRecent = (newData) => {
    let myArray = [];
    if (Array.isArray(recentMusic)) {
      myArray = [...recentMusic];
    }
    const res = [{ channel, item: newData }, ...myArray];
    dispatch(setRecentMusic(res.slice(0, 4)));
  };
  return (
    <ScreenWrapper
      scrollEnabled
      statusBarColor="transparent"
      transclucent
      paddingHorizontal={0.1}
      headerUnScrollable={() => (
        <View style={{ position: "absolute", zIndex: 999, top: 20 }}>
          <BackHeader color={COLORS.white} />
        </View>
      )}
    >
      <ImageBackground
        resizeMode="cover"
        source={{ uri: channel.image }}
        style={styles.headerImage}
      >
        <ImageBackground
          resizeMode="cover"
          source={images.gradient}
          style={styles.headerContent}
        >
          <CustomText
            label={channel?.title || ""}
            fontFamily={Fonts.bold}
            fontSize={22}
            color={COLORS.white}
            marginBottom={10}
            marginTop={20}
          />
          <CustomText
            label={`${podcasts?.length || 0} Episodes`}
            fontFamily={Fonts.semiBold}
            color={COLORS.white}
          />
          {/* <View style={styles.row}>
            {[
              `${podcasts?.length || 0} Episodes`,
              "True Crime",
              "120K Listening",
            ].map((item, i) => (
              <React.Fragment key={item}>
                <CustomText
                  label={item}
                  fontFamily={Fonts.semiBold}
                  color={COLORS.white}
                />
                {i == 2 ? null : (
                  <CustomText
                    label=" • "
                    fontFamily={Fonts.semiBold}
                    color={COLORS.gray}
                  />
                )}
              </React.Fragment>
            ))}
          </View> */}
          {/* <View style={[styles.row, { marginVertical: 15 }]}>
            <View style={styles.profile} />
            <CustomText
              label="True Crime Chronicles"
              fontFamily={Fonts.semiBold}
              color={COLORS.white}
              marginLeft={15}
            />
          </View> */}
        </ImageBackground>
      </ImageBackground>

      {/* <View
        style={[styles.row, { padding: 20, justifyContent: "space-between" }]}
      >
        <CustomButton
          title="Play All Episode"
          width="55%"
          alignSelf="start"
          height={50}
          icon
          iconColor={COLORS.white}
          iconfamily={"Feather"}
          iconname={"play-circle"}
          iconGap={10}
          iconFontSize={20}
          btnFont={Fonts.semiBold}
          fontSize={14}
        />
        <View style={{ alignItems: "center" }}>
          <Icons
            onPress={() => setFav(!isFav)}
            family="AntDesign"
            name={isFav ? "heart" : "hearto"}
            color={isFav ? COLORS.red : COLORS.gray}
            size={24}
          />
          <CustomText
            label="Favorite"
            fontSize={12}
            fontFamily={Fonts.semiBold}
            marginTop={5}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Icons
            onPress={() => ToastMessage("Downloading...")}
            family="Feather"
            name="download"
            color={COLORS.gray}
            size={24}
          />
          <CustomText
            label="Download"
            fontSize={12}
            fontFamily={Fonts.semiBold}
            marginTop={5}
          />
        </View>
      </View> */}
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <CustomText
          label="Episodes"
          fontFamily={Fonts.bold}
          fontSize={22}
          color={COLORS.primaryColor}
        />
      </View>
      <View style={styles.listContainer}>
        <ScrollView
          horizontal
          contentContainerStyle={{ width: "100%" }}
          scrollEnabled={false}
        >
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={get}
                colors={[COLORS.primaryColor]}
              />
            }
            data={podcasts}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <View style={styles.mapListContainer}>
                <CustomText
                  label={item?.title}
                  fontFamily={Fonts.bold}
                  fontSize={18}
                />
                {/* <HTMLView value={item?.description} stylesheet={styles} /> */}

                <CustomText
                  label={item?.description}
                  color={COLORS.gray}
                  numberOfLines={3}
                />
                {/* <CustomText
                  label={`Episode ${item?.["itunes:episode"]}`}
                  fontFamily={Fonts.semiBold}
                  marginBottom={10}
                /> */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
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

                    {/* <Icons
                      family="Entypo"
                      name="dots-three-horizontal"
                      size={22}
                      color={COLORS.primaryColor}
                    /> */}
                  </View>
                </View>
              </View>
            )}
          />
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  p1: {
    color: COLORS.gray,
    fontFamily: Fonts.bold,
    fontSize: 10,
    padding: 0.1,
    margin: 0.1,
  },
  h1: {
    color: COLORS.gray,
    fontFamily: Fonts.regular,
    fontSize: 20,
    padding: 0.1,
    margin: 0.1,
  },
  h: {
    color: COLORS.gray,
    fontFamily: Fonts.regular,
    fontSize: 20,
    padding: 0.1,
    margin: 0.1,
  },

  a: {
    color: COLORS.gray,
    fontFamily: Fonts.regular,
    fontSize: 20,
    padding: 0.1,
    margin: 0.1,
  },

  userImage: {
    backgroundColor: COLORS.gray,
    borderRadius: 100,
    width: "100%",
    height: "100%",
  },
  editContainer: {
    width: 32,
    height: 32,
    borderRadius: 100,
    backgroundColor: COLORS.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    bottom: 5,
    right: -5,
    position: "absolute",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 10,
    marginBottom: 10,
  },
  itemIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginRight: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerImage: {
    width: "100%",
    height: 400,
    backgroundColor: COLORS.gray,
    justifyContent: "flex-end",
  },
  headerContent: {
    padding: 15,
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: COLORS.gray,
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
});
