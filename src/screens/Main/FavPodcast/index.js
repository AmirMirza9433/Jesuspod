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
  Modal,
  Text,
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
import { images } from "../../../assets/images";
import ImageFast from "../../../components/ImageFast";
import CustomButton from "../../../components/CustomButton";
import NoDataFound from "../../../components/NoDataFound";

const FavPodcast = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const channel = route?.params?.item;
  const recentMusic = useSelector((state) => state.recent.recentMusic);
  const userData = useSelector((state) => state.user.users);
  const [PodcastData, setPodcastData] = useState([]);
  const [loading, setloading] = useState(false);
  const [DownloadLoading, setDownloadLoading] = useState(false);
  const [deletmodalOpenClose, setdeletmodalOpenClose] = useState(false);
  const [btnloading, setbtnloading] = useState(false);
  const [delteMusic, setdelteMusic] = useState("");
  const [deletLodinh, setdeletLodinh] = useState(false);

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

  const deleteAllMusic = async () => {
    setdeletLodinh(true); // Set loading state

    try {
      const userDocRef = firestore().collection("users").doc(userData?.userId);
      const userDoc = await userDocRef.get();

      if (userDoc.exists) {
        const userData = userDoc.data();
        const musics = userData.musics || [];

        await userDocRef.update({
          musics: [],
        });

        console.log("Item unliked and updated in Firestore");
        setdeletLodinh(false);
        getUserData(); // Update local data if needed
        setdeletmodalOpenClose(false); // Close modal or update local state
      } else {
        console.log("Item is not liked, no update needed");
        setdeletLodinh(false);
      }
    } catch (error) {
      console.error("Error unliking item:", error);
      setdeletLodinh(false);
    } finally {
      setdeletLodinh(false); // Ensure loading state is reset
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

  const openDeleteModal = (item) => {
    setdelteMusic(item);
    setdeletmodalOpenClose(true);
  };

  const onUnlike = async () => {
    setbtnloading(true); // Set loading state

    try {
      const userDocRef = firestore().collection("users").doc(userData?.userId);
      const userDoc = await userDocRef.get();

      if (userDoc.exists) {
        const userData = userDoc.data();
        const musics = userData.musics || [];

        const alreadyLikedIndex = musics.findIndex(
          (item) => item.title[0] === delteMusic?.title[0] // Corrected typo
        );

        if (alreadyLikedIndex !== -1) {
          musics.splice(alreadyLikedIndex, 1); // Remove item from array

          await userDocRef.update({
            musics: musics,
          });

          console.log("Item unliked and updated in Firestore");
          setbtnloading(false);
          getUserData(); // Update local data if needed
          setdeletmodalOpenClose(false); // Close modal or update local state
        } else {
          console.log("Item is not liked, no update needed");
          setbtnloading(false);
        }
      } else {
        console.log("User document not found");
        setbtnloading(false);
      }
    } catch (error) {
      console.error("Error unliking item:", error);
      setbtnloading(false);
    } finally {
      setbtnloading(false); // Ensure loading state is reset
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled
      statusBarColor="transparent"
      transclucent
      paddingHorizontal={0.1}
      headerUnScrollable={() => (
        <View style={{ paddingVertical: 10 }}>
          <BackHeader title="Downloads" />
        </View>
      )}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={deletmodalOpenClose}
        onRequestClose={() => {
          setdeletmodalOpenClose(!deletmodalOpenClose);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={[
                {
                  fontSize: 15,
                  textAlign: "center",
                  fontFamily: Fonts.bold,
                  color: COLORS.black,
                },
              ]}
            >
              Are You Sure You want to delete this Podcast from your's
              downloads?
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 20,
                marginTop: 20,
              }}
            >
              <CustomButton
                backgroundColor={COLORS.primaryColor}
                title={"Yes"}
                color={COLORS.white}
                width={100}
                height={40}
                onPress={onUnlike}
                loading={btnloading}
              />

              <TouchableOpacity onPress={() => setdeletmodalOpenClose(false)}>
                <View
                  style={[
                    {
                      height: 40,
                      paddingHorizontal: 10,
                      width: 100,
                      borderColor: COLORS.black,
                      borderWidth: 1,
                      borderRadius: 20,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  ]}
                >
                  <Text
                    style={[
                      {
                        fontSize: 15,
                        color: COLORS.black,
                        fontFamily: Fonts.bold,
                      },
                    ]}
                  >
                    No
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingHorizontal: 15,
        }}
      >
        {PodcastData?.musics?.length > 0 ? (
          <CustomButton
            loading={deletLodinh}
            title={"Delete All"}
            width={70}
            height={30}
            fontSize={12}
            onPress={deleteAllMusic}
            fontFamily={Fonts.bold}
          />
        ) : null}
      </View>

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
          ListEmptyComponent={() => (
            <NoDataFound title="No Download Available" />
          )}
          data={PodcastData?.musics}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PlayerScreen", {
                  item,
                  chanal: item?.imageUrl,
                })
              }
              style={styles.mapListContainer}
            >
              <ImageFast
                resizeMode="contain"
                style={[
                  styles.thumb,
                  { height: 50, width: 50, borderRadius: 8 },
                ]}
                source={
                  !item?.imageUrl ? images.appLogo : { uri: item?.imageUrl }
                }
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginLeft: 20,
                  width: "80%",
                }}
              >
                <CustomText
                  label={item?.title}
                  fontFamily={Fonts.bold}
                  fontSize={18}
                  numberOfLines={1}
                  width={250}
                />

                <View style={styles.row}>
                  <TouchableOpacity
                    style={styles.downloadsIcon}
                    onPress={() => openDeleteModal(item)}
                  >
                    <Icons
                      family="MaterialCommunityIcons"
                      name="delete"
                      size={18}
                      color={COLORS.white}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },

  downloadsIcon: {
    backgroundColor: COLORS.primaryColor,
    borderRadius: 50,
    width: 25,
    height: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: 300,

    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
