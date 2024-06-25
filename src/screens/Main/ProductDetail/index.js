import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { parseString } from "react-native-xml2js";
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

const ProductDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const channel = route?.params?.item;
  const token = useSelector((state) => state.authConfig.token);
  const userData = useSelector((state) => state.user.users);
  const recentMusic = useSelector((state) => state.recent.recentMusic);
  const [loading, setLoading] = useState(false);
  const [podcasts, setPodcasts] = useState([]);
  const channelId = channel?._id ? channel?._id : channel?.channel?._id;
  const channelData = channel?._id ? channel : channel?.channel;
  const [subButton, setSubButton] = useState(
    channelData?.sub?.filter((item) => item == token)?.length
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
    if (channelData?.sub?.filter((item) => item == token)?.length) {
      finalArray = channelData?.sub?.filter((item) => item !== token);
    } else {
      finalArray = [...channelData?.sub, token];
    }
    try {
      const res = await updateCollection("Newchannels", channelId, {
        ...channelData,
        sub: finalArray,
      });
      console.log("===============res", res);
      setSubLoading(false);
    } catch (error) {
      setSubLoading(false);
      console.log("==============error", error?.response?.data);
    }
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
                  style={styles.mapListContainer}
                  onPress={() => {
                    createRecent(item);
                    navigation.navigate("PlayerScreen", { item, channel });
                  }}
                >
                  <View style={{ width: 30 }}>
                    <CustomText
                      label={changedata(item?.pubDate)}
                      fontFamily={Fonts.regular}
                      fontSize={15}
                      marginBottom={10}
                      textAlign={"center"}
                    />
                  </View>
                  <View style={{ paddingHorizontal: 15 }}>
                    <CustomText
                      label={item?.title}
                      fontFamily={Fonts.medium}
                      fontSize={16}
                      marginLeft={5}
                      numberOfLines={2}
                    />
                  </View>
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
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
});
