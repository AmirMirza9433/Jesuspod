import { View, StyleSheet, Image, Dimensions } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useState } from "react";
import TrackPlayer, {
  usePlaybackState,
  useProgress,
  State,
} from "react-native-track-player";

import CustomText from "./CustomText";
import Icons from "./Icons";

import { COLORS } from "../utils/COLORS";
import { Fonts } from "../utils/fonts";

const { width } = Dimensions.get("screen");

const BottomPlayer = ({ currentTrack }) => {
  const playbackState = usePlaybackState();
  const { position, duration } = useProgress();
  const validDuration = isNaN(duration) || duration <= 0 ? 1 : duration;
  const [isPlaying, setIsPlaying] = useState(playbackState === State.Playing);

  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seekTo = async (value) => {
    await TrackPlayer.seekTo(value[0]);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.row}>
        <Image source={{ uri: currentTrack?.artwork }} style={styles.image} />
        <CustomText
          label={currentTrack?.title}
          fontFamily={Fonts.bold}
          fontSize={18}
          numberOfLines={1}
          width={200}
        />
        <Icons
          family="AntDesign"
          name={isPlaying ? "pausecircle" : "play"}
          size={40}
          color={COLORS.primaryColor}
          onPress={togglePlayback}
        />
      </View>
      <View style={styles.sliderContainer}>
        <MultiSlider
          values={[position]}
          onValuesChangeFinish={seekTo}
          min={0}
          max={validDuration}
          step={1}
          markerStyle={styles.markerStyle}
          pressedMarkerStyle={styles.pressedMarkerStyle}
          selectedStyle={styles.selectedStyle}
          trackStyle={styles.trackStyle}
          sliderLength={width - 60}
        />
      </View>
    </View>
  );
};

export default BottomPlayer;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
    position: "absolute",
    bottom: 70,
    width: width - 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    border: COLORS.gray,
    borderRadius: 10,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width - 50,
    marginBottom: -10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  sliderContainer: {
    width: width - 50,
    alignItems: "center",
    marginBottom: -8,
  },
  selectedStyle: {
    backgroundColor: COLORS.primaryColor,
    height: 6,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  trackStyle: {
    backgroundColor: COLORS.gray,
    height: 6,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
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
});
