import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import RenderHTML from "react-native-render-html";
import { parseString } from "react-native-xml2js";
import RNFetchBlob from "rn-fetch-blob";
import axios from "axios";
import {
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
} from "react-native";
import Share from "react-native-share";

import ScreenWrapper from "../../../components/ScreenWrapper";
import BackHeader from "../../../components/BackHeader";
import CustomText from "../../../components/CustomText";
import MenuOptios from "../../../components/Menu";
import Icons from "../../../components/Icons";

import { setRecentMusic } from "../../../store/reducer/recentSlice";
import { images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import { Fonts } from "../../../utils/fonts";
import ImageFast from "../../../components/ImageFast";
import CustomModal from "../../../components/CustomModal";
import EpisodeModal from "../../../components/EpisodeModal";

const ProductDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const channel = route?.params?.item;
  const recentMusic = useSelector((state) => state.recent.recentMusic);
  const token = useSelector((state) => state.authConfig.token);
  const userData = useSelector((state) => state.user.users);
  const [episodemodal, setepisodemodal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [podcasts, setPodcasts] = useState([]);
  const [EpisodeDAta, setEpisodeDAta] = useState("");

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

  const ondataShare = (item) => {
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch("GET", channel.image)
      .then((resp) => {
        return resp.readFile("base64");
      })
      .then((base64Data) => {
        const imageUrl = "data:image/png;base64," + base64Data;
        const shareImage = {
          title: item.title[0].trim(),
          message: item?.enclosure[0].$.url,
          url: imageUrl,
        };
        Share.open(shareImage)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            err && console.log(err);
          });
        if (imagePath) {
          return RNFetchBlob.fs.unlink(imagePath);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onLike = async (item) => {
    let finalArray;
    if (
      userData?.musics?.filter((item) => item?.title?.[0] == item?.title?.[0])
        ?.length
    ) {
      finalArray = userData?.musics?.filter(
        (item) => item?.title?.[0] != item?.title?.[0]
      );
    } else {
      finalArray = [...userData?.musics, item];
    }
    try {
      const res = await updateCollection("users", token, {
        ...userData,
        musics: finalArray,
      });
      dispatch(
        setUser({
          ...userData,
          musics: finalArray,
        })
      );
    } catch (error) {
      console.log("==============error", error?.response?.data);
    }
  };

  const downloaddata = (data) => {
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

  const changedata = (timestamp) => {
    const date = new Date(timestamp);
    const dayMonth = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    });

    return dayMonth;
  };

  const formatTime = (timeStr) => {
    const timestamp = timeStr[0];

    const parts = timestamp.split(":").map(Number);
    let formattedTime = "";

    if (parts.length === 1) {
      // Only seconds
      formattedTime = `${parts[0]}s`;
    } else if (parts.length === 2) {
      // Minutes and seconds
      formattedTime = `${parts[0]}m `;
    } else if (parts.length === 3) {
      // Hours, minutes, and seconds
      formattedTime = `${parts[0]}h ${parts[1]}m `;
    }

    return formattedTime;
  };

  const openEpisoseModal = (item) => {
    setepisodemodal(true);
    setEpisodeDAta(item);
  };

  const handlePlay = (item) => {
    setepisodemodal(false);
    createRecent(item);
    navigation.navigate("PlayerScreen", { item, channel });
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

  const tagsStyles = {
    div: {
      color: "black",
      maxHeight: 190, // Assuming each line is approximately 20px in height
      overflow: "hidden",
      margin: 0,
      padding: 0,
    },

    img: {
      display: "none",
    },
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
      <EpisodeModal
        isVisible={episodemodal}
        chanalImage={channel?.image || channel?.imageUrl}
        episodeData={EpisodeDAta}
        onDisable={() => setepisodemodal(false)}
        onplay={handlePlay}
      />
      {/* <ImageBackground
        resizeMode="cover"
        source={{ uri: channel.image || channel.imageUrl }}
        style={styles.headerImage}
      > */}
      <ImageBackground
        resizeMode="cover"
        source={images.gradient}
        style={styles.headerContent}
      >
        <ImageFast
          source={{ uri: channel?.image || channel?.imageUrl }}
          style={styles.headerContent1}
          resizeMode={"contain"}
        />

        <View style={{ width: "100%" }}>
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
        </View>
        {/* </ImageBackground> */}
      </ImageBackground>
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
                <RenderHTML
                  contentWidth={3000}
                  source={{ html: `<div>${item?.description || ""}</div>` }}
                  tagsStyles={tagsStyles}
                />

                <View style={styles.row}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      openEpisoseModal(item);
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
                      label={formatTime(item?.["itunes:duration"])}
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
                      onPress={() => downloaddata(item)}
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
      </View>
    </ScreenWrapper>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  headerImage: {
    width: "100%",
    backgroundColor: COLORS.gray,
    justifyContent: "flex-end",
  },

  headerContent1: {
    height: 250,
    width: 250,
  },
  headerContent: {
    padding: 15,
    height: 400,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
