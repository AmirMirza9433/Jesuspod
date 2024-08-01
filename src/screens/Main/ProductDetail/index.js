import { useDispatch, useSelector } from "react-redux";
import firestore from "@react-native-firebase/firestore";
import React, { useEffect, useState } from "react";
import { parseString } from "react-native-xml2js";
import RNFetchBlob from "rn-fetch-blob";
import axios from "axios";
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
import { ToastMessage } from "../../../utils/ToastMessage";
import { updateCollection } from "../../../Firebase";
import { images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import { Fonts } from "../../../utils/fonts";
import Icons from "../../../components/Icons";

const ProductDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const channel = route?.params?.item;
  const token = useSelector((state) => state.authConfig.token);
  const userData = useSelector((state) => state.user.users);
  const recentMusic = useSelector((state) => state.recent.recentMusic);

  const [loading, setLoading] = useState(false);
  const [podcasts, setPodcasts] = useState([]);
  const [downloadLoading, setDownloadLoading] = useState(null);
  const [subButton, setSubButton] = useState(
    channel?.sub?.filter((item) => item == token)?.length
  );
  const [subLoading, setSubLoading] = useState(false);
  const get = async () => {
    setLoading(true);
    // const response = await axios.get(channel?.url || channel?.channel?.url);
    const response = await axios.get(channel?.url || channel?.channel?.url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "application/xml",
      },
    });

    try {
      const xmlData = response.data;
      parseString(xmlData, (err, res) => {
        setPodcasts(res.rss.channel[0].item);
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (podcasts.length > 0) {
      getUserData();
    }
  }, [podcasts]);
  const getUserData = async () => {
    try {
      const userDocRef = firestore().collection("users").doc(userData?.userId);
      const userDoc = await userDocRef.get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        const userMusics = userData?.musics || [];
        const newSDownload = podcasts.map((podcast) =>
          userMusics.some((music) => music.title[0] === podcast.title[0])
        );
        return userData;
      } else {
        console.log("User document not found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
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
      } else {
        console.log("No document found with the given _id");
      }

      setSubLoading(false);
    } catch (error) {
      setSubLoading(false);
      console.log("==============error", error);
    }
  };
  const downloadData = async (item) => {
    try {
      const { title, enclosure } = item;
      const fileName = `${title[0]}.mp3`;
      const { config, fs } = RNFetchBlob;
      const downloads = fs.dirs.DownloadDir + "/jesusDownload";
      const filePath = `${downloads}/${fileName}`;
      const fileExists = await fs.exists(filePath);
      if (fileExists) {
        ToastMessage("File Already Downloaded");
        return;
      }
      setDownloadLoading(title[0]);
      ToastMessage("Downloading...");
      const dirExists = await fs.exists(downloads);
      if (!dirExists) {
        await fs.mkdir(downloads);
      }
      await config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: filePath,
        },
      }).fetch("GET", enclosure[0].$.url);
      ToastMessage("Download Complete!");
      setDownloadLoading(null);
    } catch (error) {
      ToastMessage("Download Complete!");
      setDownloadLoading(null);
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
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    createRecent(item);
                    navigation.navigate("PlayerScreen", { item, channel });
                  }}
                  style={styles.mapListContainer}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "90%",
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
                  {downloadLoading == item?.title[0] ? (
                    <ActivityIndicator size={28} color={COLORS.primaryColor} />
                  ) : (
                    <Icons
                      family="MaterialCommunityIcons"
                      name="download-circle-outline"
                      size={25}
                      color={COLORS.black}
                      onPress={() => downloadData(item)}
                    />
                  )}
                </TouchableOpacity>
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
9;
