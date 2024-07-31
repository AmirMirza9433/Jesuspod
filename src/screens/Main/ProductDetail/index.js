import { useIsFocused } from "@react-navigation/native";
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
import { updateCollection } from "../../../Firebase";
import { images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import { Fonts } from "../../../utils/fonts";
import Icons from "../../../components/Icons";

const ProductDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const channel = route?.params?.item;
  const channelId = channel?._id;
  const token = useSelector((state) => state.authConfig.token);
  const userData = useSelector((state) => state.user.users);
  const recentMusic = useSelector((state) => state.recent.recentMusic);
  const [loading, setLoading] = useState(false);
  const [podcasts, setPodcasts] = useState([]);
  const isfocused = useIsFocused();

  const [downloadLoading, setDownloadLoading] = useState(
    podcasts.map(() => false)
  ); // Initialize loading state for each podcast item
  const [sDownload, setSDownload] = useState(podcasts.map(() => false));

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
        // Update the sDownload state based on liked podcasts
        const newSDownload = podcasts.map((podcast) =>
          userMusics.some((music) => music.title[0] === podcast.title[0])
        );

        setSDownload(newSDownload);

        return userData; // Return user data for further processing
      } else {
        console.log("User document not found");
        return null; // Handle case where user document doesn't exist
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null; // Handle error scenario
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

  // useEffect(() => {
  //   getUserData();
  // }, []);

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
    const { config, fs } = RNFetchBlob;
    const downloads = fs.dirs.DownloadDir + "/jesusDownload";

    // Check if directory exists
    const exists = await fs.exists(downloads);
    if (!exists) {
      await fs.mkdir(downloads);
    }

    return config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: `${downloads}/${item?.title[0]}.mp3`,
      },
    }).fetch("GET", item?.enclosure[0].$.url);
  };

  const onLike = async (ItemData, index) => {
    // Set the loading state for the specific item
    setDownloadLoading((prevLoading) => {
      const newLoading = [...prevLoading];
      newLoading[index] = true;
      return newLoading;
    });

    try {
      // Fetch user document from Firestore
      const userDocRef = firestore().collection("users").doc(userData?.userId);
      const userDoc = await userDocRef.get();

      if (userDoc.exists) {
        const userData = userDoc.data();
        const musics = userData.musics || [];
        downloadData(ItemData);

        // Check if ItemData's title is already in the musics array
        const alreadyLiked = musics.some(
          (item) => item.title === ItemData.title
        );

        if (!alreadyLiked) {
          // If not already liked, add it to musics array with additional data
          musics.push({ ...ItemData, imageUrl: channel.imageUrl });

          // Update Firestore document with the updated musics array
          await userDocRef.update({
            musics: musics,
          });
          // downloadData();

          console.log("Item liked and updated in Firestore");

          // Update the local state to reflect the like status
          setSDownload((prevSDownload) => {
            const updatedSDownload = [...prevSDownload];
            updatedSDownload[index] = true;
            return updatedSDownload;
          });
        } else {
          console.log("Item is already liked, no update needed");
        }
      } else {
        console.log("User document not found");
      }
    } catch (error) {
      console.error("Error liking item:", error);
    } finally {
      // Reset the loading state for the specific item
      setDownloadLoading((prevLoading) => {
        const newLoading = [...prevLoading];
        newLoading[index] = false;
        return newLoading;
      });
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
                  </TouchableOpacity>
                  <CustomButton
                    onPress={() => downloadData(item)}
                    // onPress={() => {
                    //   if (!sDownload[index]) {
                    //     onLike(item, index);
                    //   }
                    // }}
                    loading={downloadLoading[index]}
                    icon={true}
                    iconfamily={"MaterialCommunityIcons"}
                    iconname={
                      sDownload[index]
                        ? "check-circle-outline"
                        : "download-circle-outline"
                    }
                    iconFontSize={25}
                    iconColor={COLORS.black}
                    backgroundColor={"transparent"}
                    width={100}
                    indicatorcolor={true}
                  />
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
9;
