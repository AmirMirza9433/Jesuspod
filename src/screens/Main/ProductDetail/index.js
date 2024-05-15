import React, { useEffect, useState } from "react";
import { parseString } from "react-native-xml2js";
import axios from "axios";
import {
  ImageBackground,
  RefreshControl,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
  View,
} from "react-native";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import BackHeader from "../../../components/BackHeader";
import CustomText from "../../../components/CustomText";
import Category from "../../../components/Category";
import Icons from "../../../components/Icons";
import Card from "../../../components/Card";

import { ToastMessage } from "../../../utils/ToastMessage";
import { images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import { Fonts } from "../../../utils/fonts";

const { width } = Dimensions.get("window");

const ProductDetail = ({ navigation, route }) => {
  const channel = route?.params?.item;
  const [isFav, setFav] = useState(false);
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

      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    get();
  }, [channel?.url]);
  return (
    <ScreenWrapper
      scrollEnabled
      statusBarColor="transparent"
      transclucent
      paddingHorizontal={0.1}
      headerUnScrollable={() => (
        <BackHeader
          color={COLORS.white}
          style={{ position: "absolute", zIndex: 999, top: 20 }}
          onSharePress={() => {}}
        />
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
      <View
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
      </View>
      <View style={styles.listContainer}>
        <ScrollView horizontal scrollEnabled={false}>
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
            renderItem={({ item, index }) => (
              <Card
                onPress={() =>
                  navigation.navigate("PlayerScreen", { item, channel })
                }
                flex="row"
                align="center"
                title={item?.title}
                decNumLine={2}
                des={item?.description}
                author={`Episode ${item?.["itunes:episode"]}`}
                imageHeight={80}
                imageWith={80}
                gap={10}
                width={width - 40}
                textWidth="75%"
                justifyContent="space-between"
              />
            )}
          />
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
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
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
});
