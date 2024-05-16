import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import Video from "react-native-video";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomText from "../../../components/CustomText";
import BackHeader from "../../../components/BackHeader";
import ImageFast from "../../../components/ImageFast";
import Icons from "../../../components/Icons";

import { deleteSingleDoc, saveDoc } from "../../../Firebase";
import { COLORS } from "../../../utils/COLORS";
import { Fonts } from "../../../utils/fonts";

const PlayerScreen = ({ route }) => {
  const item = route.params?.item;
  console.log("==============", item?.guid?.[0]?._);
  const channel = route.params?.channel;
  const ref = useRef(null);
  const [percentage, setPercentage] = useState(0);
  const [onProgress, setOnProgress] = useState({});
  const [pause, setPause] = useState(true);
  const [musicTime, setMusicTime] = useState("00:00");
  const [durationTimeShow, setDurationTimeShow] = useState("00:00");
  const [loading, setLoading] = useState(true);
  const [isLike, setLike] = useState(false);

  const convertSecond = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    return (
      (h >= 1 ? `${h}:` : "") +
      (m < 10 ? `0${m}:` : `${m}:`) +
      (s < 10 ? `0${s}` : s)
    );
  };

  const skipForward = () => {
    ref?.current?.seek(onProgress.currentTime + 10);
  };

  const skipBackward = () => {
    ref?.current?.seek(Math.max(0, onProgress.currentTime - 10));
  };
  const onFav = async () => {
    try {
      let res;
      if (!isLike) {
        res = await saveDoc(
          item?.guid?.[0]?._,
          JSON.stringify(item),
          "Favorite"
        );
      } else {
        res = await deleteSingleDoc("Favorite", item?.guid?.[0]?._);
      }
      console.log("================res", res);
    } catch (error) {
      console.log("==========error", error);
    }
    saveDoc;
  };
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <BackHeader
          title="Now Playing"
          onHeartPress={() => {
            setLike(!isLike);
            // onFav();
          }}
          isHeart={isLike}
        />
      )}
    >
      <View style={styles.mainContainer}>
        <View style={[styles.headerImage]}>
          <ImageFast
            source={{ uri: channel?.image }}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
            loading={loading}
          />
          <Video
            source={{ uri: item?.enclosure[0].$.url }}
            style={{ flex: 1 }}
            resizeMode="cover"
            ref={ref}
            audioOnly
            paused={pause}
            onProgress={(v) => {
              setOnProgress(v);
              setPercentage(v?.currentTime);
              setMusicTime(convertSecond(v?.currentTime));
              setDurationTimeShow(convertSecond(v?.seekableDuration));
            }}
            onLoad={() => setLoading(false)}
          />
        </View>

        <CustomText
          label={`EPS ${item?.["itunes:episode"]} | ${item?.title}`}
          fontFamily={Fonts.bold}
          fontSize={20}
          textAlign="center"
          marginTop={20}
        />
        <View style={styles.row}>
          {["True Crime Chronicles", "by True Crime Chronicles"].map(
            (item, i) => (
              <React.Fragment key={item}>
                <CustomText
                  label={item}
                  fontFamily={Fonts.semiBold}
                  fontSize={13}
                />
                {i == 1 ? null : (
                  <CustomText
                    label=" • "
                    fontFamily={Fonts.semiBold}
                    color={COLORS.primaryColor}
                  />
                )}
              </React.Fragment>
            )
          )}
        </View>
        <View style={styles.sliderContainer}>
          <CustomText label={musicTime} fontFamily={Fonts.semiBold} />
          <MultiSlider
            onValuesChangeFinish={([val]) => {
              ref?.current?.seek(val);
            }}
            values={[parseInt(percentage)]}
            markerStyle={styles.markerStyle}
            pressedMarkerStyle={styles.pressedMarkerStyle}
            selectedStyle={styles.selectedStyle}
            trackStyle={{
              backgroundColor: COLORS.gray,
              height: 6,
              borderTopRightRadius: 100,
              borderBottomRightRadius: 100,
            }}
            sliderLength={210}
            min={0}
            max={onProgress?.seekableDuration}
            step={1}
          />
          <CustomText label={durationTimeShow} fontFamily={Fonts.semiBold} />
        </View>
        <View style={styles.row}>
          <Icons family="Feather" name="repeat" size={32} color={COLORS.gray} />
          <Icons
            family="MaterialIcons"
            name="replay-10"
            size={32}
            color={COLORS.black}
            onPress={skipBackward}
          />
          <Icons
            family="AntDesign"
            name={pause ? "play" : "pausecircle"}
            size={60}
            onPress={() => setPause(!pause)}
            color={COLORS.primaryColor}
          />
          <Icons
            family="MaterialIcons"
            name="forward-10"
            size={32}
            color={COLORS.black}
            onPress={skipForward}
          />
          <Icons
            family="Feather"
            name="shuffle"
            size={32}
            color={COLORS.gray}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  sliderContainer: {
    width: "100%",
    height: 55,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.primaryColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  headerImage: {
    width: "100%",
    height: 350,
    backgroundColor: COLORS.gray,
    borderRadius: 20,
    overflow: "hidden",
  },
  markerStyle: {
    backgroundColor: COLORS.primaryColor,
    width: 12,
    borderRadius: 100,
    height: 12,
    marginBottom: -7,
  },
  pressedMarkerStyle: {
    backgroundColor: COLORS.primaryColor,
    width: 12,
    borderRadius: 100,
    height: 12,
  },
  selectedStyle: {
    backgroundColor: COLORS.primaryColor,
    height: 6,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
});
