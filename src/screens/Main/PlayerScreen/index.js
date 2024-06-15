import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import TrackPlayer, {
  usePlaybackState,
  useProgress,
  Capability,
  RepeatMode,
  State,
} from "react-native-track-player";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomText from "../../../components/CustomText";
import BackHeader from "../../../components/BackHeader";
import ImageFast from "../../../components/ImageFast";
import Icons from "../../../components/Icons";

import { COLORS } from "../../../utils/COLORS";
import { Fonts } from "../../../utils/fonts";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setPlayer } from "../../../store/reducer/PlayerSlice";

const PlayerScreen = ({ route }) => {
  const item = route.params?.item;
  console.log("userDAta ===============", item);
  const channel = route.params?.channel;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const playbackState = usePlaybackState();
  const { position, duration } = useProgress();
  const [isPlaying, setIsPlaying] = useState(playbackState === State.Playing);
  const validDuration = isNaN(duration) || duration <= 0 ? 1 : duration;

  useEffect(() => {
    dispatch(setPlayer(false));
    return () => {
      console.log("DetailsScreen is unfocused, state is true");
      dispatch(setPlayer(true));
    };
  }, [isFocused]);

  useEffect(() => {
    setupTrack();
  }, []);

  const setupTrack = async () => {
    let isSetup = false;
    try {
      await TrackPlayer.getCurrentTrack();
      await TrackPlayer.stop();
      await TrackPlayer.reset();
      isSetup = true;
      await TrackPlayer.add({
        id: item?.guid[0]._,
        url: item?.enclosure[0].$.url,
        title: item?.title,
        artist: channel?.title,
        artwork: channel?.image || channel?.imageUrl || item?.imageUrl,
      });
      setLoading(false);
    } catch {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        stopWithApp: true,
        // android: {
        //   // This is the default behavior
        //   appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
        // },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo,
          Capability.Stop,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
        notificationCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo,
          Capability.Stop,
        ],
      });
      await TrackPlayer.add({
        id: item.guid[0]._,
        url: item.enclosure[0].$.url,
        title: item.title,
        artist: channel.title,
        artwork: channel.image,
      });
      await TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setLoading(false);
      isSetup = true;
    } finally {
      return isSetup;
    }
  };

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
    TrackPlayer.seekTo(position + 10);
  };

  const skipBackward = () => {
    TrackPlayer.seekTo(Math.max(0, position - 10));
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <BackHeader
          title="Now Playing"
          isMenu={true}
          ItemData={item}
          chanalData={channel}
        />
      )}
    >
      <View style={styles.mainContainer}>
        <View style={styles.headerImage}>
          <ImageFast
            source={{
              uri: channel?.image || channel?.imageUrl || item?.imageUrl,
            }}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
            loading={loading}
          />
        </View>

        <CustomText
          label={`EPS ${item?.["itunes:episode"] || 0} | ${item?.title}`}
          fontFamily={Fonts.bold}
          fontSize={20}
          textAlign="center"
          marginTop={20}
        />

        <View style={styles.sliderContainer}>
          <CustomText
            label={convertSecond(position)}
            fontFamily={Fonts.semiBold}
          />

          <MultiSlider
            onValuesChangeFinish={([val]) => {
              TrackPlayer.seekTo(val);
            }}
            values={[position]}
            markerStyle={styles.markerStyle}
            pressedMarkerStyle={styles.pressedMarkerStyle}
            selectedStyle={styles.selectedStyle}
            trackStyle={styles.trackStyle}
            sliderLength={210}
            min={0}
            max={validDuration}
            step={1}
          />
          <CustomText
            label={convertSecond(duration)}
            fontFamily={Fonts.semiBold}
          />
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
            name={isPlaying ? "pausecircle" : "play"}
            size={60}
            onPress={togglePlayback}
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
  trackStyle: {
    backgroundColor: COLORS.gray,
    height: 6,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
});
