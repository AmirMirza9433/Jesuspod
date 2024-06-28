import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { parseString } from "react-native-xml2js";
import axios from "axios";
import firestore from "@react-native-firebase/firestore";
import RNFetchBlob from "rn-fetch-blob";

import {
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
} from "react-native";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import BackHeader from "../../../components/BackHeader";
import CustomText from "../../../components/CustomText";
import ImageFast from "../../../components/ImageFast";

import { setRecentMusic } from "../../../store/reducer/recentSlice";
import { updateCollection } from "../../../Firebase";
import { images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import { Fonts } from "../../../utils/fonts";
import Icons from "../../../components/Icons";
import { ToastMessage } from "../../../utils/ToastMessage";

const ProductDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const channel = route?.params?.item;
  const channelId = channel?._id;
  const token = useSelector((state) => state.authConfig.token);
  const userData = useSelector((state) => state.user.users);
  const recentMusic = useSelector((state) => state.recent.recentMusic);
  const [loading, setLoading] = useState(false);
  const [podcasts, setPodcasts] = useState([]);

  const [DownloadLoading, setDownloadLoading] = useState(false);

  const [subButton, setSubButton] = useState(
    channel?.sub?.filter((item) => item == token)?.length
  );

  const [donloadbtn, setDownloadbtn] = useState(
    channel?.download?.filter((item) => item == token)?.length
  );
  const [subLoading, setSubLoading] = useState(false);

  const get = async () => {
    setLoading(true);
    const response = await axios.get(channel?.url || channel?.channel?.url);
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

  const changedata = (timestamp) => {
    const date = new Date(timestamp);
    const dayMonth = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    });

    return dayMonth;
  };

  useEffect(() => {
    get();
  }, [channel?.url || channel?.channel?.url]);

  const createRecent = (newData) => {
    let myArray = [];
    if (Array.isArray(recentMusic)) {
      myArray = [...recentMusic];
    }
    const res = [{ channel, item: newData }, ...myArray];
    dispatch(setRecentMusic(res.slice(0, 4)));
  };

  const onSubscribe = async () => {
    setSubLoading(true);
    let finalArray;
    if (channel?.sub?.filter((item) => item == token)?.length) {
      finalArray = channel?.sub?.filter((item) => item !== token);
    } else {
      finalArray = [...channel?.sub, token];
    }

    try {
      // Fetch the document ID based on _id
      const querySnapshot = await firestore()
        .collection("Newchannels")
        .where("_id", "==", channel._id)
        .get();

      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;

        const res = await updateCollection("Newchannels", docId, {
          ...channel,
          sub: finalArray,
        });
        console.log("===============res", res);
      } else {
        console.log("No document found with the given _id");
      }

      setSubLoading(false);
    } catch (error) {
      setSubLoading(false);
      console.log("==============error", error);
    }
  };

  const downloadData = (item, index) => {
    const { config, fs } = RNFetchBlob;
    const downloads = fs.dirs.DownloadDir;
    return config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: downloads + "/" + item?.title[0] + ".mp3",
      },
    }).fetch("GET", item?.enclosure[0].$.url);
  };

  const onLike = async (ItemData) => {
    try {
      // Fetch user document from Firestore
      const userDocRef = firestore().collection("users").doc(userData?.userId);
      const userDoc = await userDocRef.get();

      if (userDoc.exists) {
        const userData = userDoc.data();
        const musics = userData.musics || [];

        // Check if ItemData's title is already in the musics array
        const alreadyLiked = musics.some(
          (item) => item.title[0] === ItemData.title[0]
        );

        if (!alreadyLiked) {
          // If not already liked, add it to musics array with additional data
          musics.push({ ...ItemData, imageUrl: channel.imageUrl });

          // Update Firestore document with the updated musics array
          await userDocRef.update({
            musics: musics,
          });

          console.log("Item liked and updated in Firestore");
        } else {
          console.log("Item is already liked, no update needed");
        }
      } else {
        console.log("User document not found");
      }
    } catch (error) {
      console.error("Error liking item:", error);
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled
      statusBarColor="transparent"
      transclucent
      paddingHorizontal={0.1}
      headerUnScrollable={() => (
        <View
          style={{
            position: "absolute",
            zIndex: 999,
            top: 20,
          }}
        >
          <BackHeader color={COLORS.white} />
        </View>
      )}
    >
      <ImageBackground
        resizeMode="cover"
        source={images.gradient}
        style={styles.headerContent}
      >
        <ImageFast
          source={{ uri: channel?.imageUrl || channel?.channel?.imageUrl }}
          style={styles.headerContent1}
          resizeMode="contain"
        />
        <View style={{ width: "100%" }}>
          <CustomText
            label={channel?.title || channel?.channel?.title}
            fontFamily={Fonts.bold}
            fontSize={22}
            color={COLORS.white}
            textAlign="center"
            marginTop={20}
          />
        </View>
      </ImageBackground>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CustomText
          label={`${podcasts?.length || 0} Episodes`}
          fontFamily={Fonts.bold}
          fontSize={18}
          color={COLORS.primaryColor}
        />
        <CustomButton
          title={subButton ? "Unsubscribe" : "Subscribe"}
          backgroundColor={COLORS.primaryColor}
          color={COLORS.white}
          loading={subLoading}
          onPress={() => {
            setSubButton(!subButton);
            onSubscribe();
          }}
          fontFamily={Fonts.bold}
          width={130}
          height={40}
        />
      </View>
      <View style={styles.listContainer}>
        <ScrollView
          horizontal
          contentContainerStyle={{ width: "100%" }}
          scrollEnabled={false}
        >
          {loading ? (
            <View
              style={{ justifyContent: "center", width: "100%", marginTop: 20 }}
            >
              <ActivityIndicator color={COLORS.primaryColor} size={50} />
            </View>
          ) : (
            <FlatList
              data={podcasts}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, i) => i.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.mapListContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      createRecent(item);
                      navigation.navigate("PlayerScreen", { item, channel });
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <CustomText
                        label={changedata(item?.pubDate)}
                        fontFamily={Fonts.regular}
                        fontSize={15}
                        marginBottom={10}
                        width={40}
                        textAlign={"center"}
                      />
                      <CustomText
                        label={item?.title}
                        fontFamily={Fonts.medium}
                        fontSize={16}
                        marginLeft={5}
                        width={250}
                        numberOfLines={1}
                      />
                    </View>
                    {/* <View
                      style={{
                        paddingHorizontal: 15,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    > */}

                    {/* </View> */}
                    {/* <RenderHTML
                  contentWidth={3000}
                  source={{ html: `<div>${item?.description || ""}</div>` }}
                  tagsStyles={tagsStyles}
                /> */}

                    {/* <View style={styles.row}>
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
                </View> */}
                  </TouchableOpacity>

                  <CustomButton
                    onPress={() => {
                      onLike(item, index);
                    }}
                    loading={DownloadLoading}
                    icon={true}
                    iconfamily={"MaterialCommunityIcons"}
                    iconname={
                      donloadbtn
                        ? "check-circle-outline"
                        : "download-circle-outline"
                    }
                    iconFontSize={25}
                    iconColor={COLORS.black}
                    backgroundColor={"transparent"}
                    width={100}
                    indicatorcolor={true}
                  />
                  {/* <TouchableOpacity onPress={() => onDownload(item)}>
                    <Icons
                      family="MaterialCommunityIcons"
                      name="download-circle-outline"
                      size={30}
                      color={COLORS.primaryColor}
                      marginLeft={10}
                    />
                  </TouchableOpacity> */}
                </View>
              )}
            />
          )}
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
    marginTop: 10,
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
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
});
