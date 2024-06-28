import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, StyleSheet, View } from "react-native";
import TrackPlayer, {
  usePlaybackState,
  useProgress,
  Capability,
  RepeatMode,
  State,
} from "react-native-track-player";
import firestore from "@react-native-firebase/firestore";

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
import Card from "../../../components/Card";
import { FlatList } from "react-native";

const PlayerScreen = ({ route }) => {
  const item = route.params?.item;
  const channel = route.params?.channel;

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [starLoading, setstarLoading] = useState(false);
  const playbackState = usePlaybackState();
  const { position, duration } = useProgress();
  const [isPlaying, setIsPlaying] = useState(playbackState === State.Playing);
  const userData = useSelector((state) => state.user.users);
  const [StredId, setStredId] = useState(false);
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

  useEffect(() => {
    starMusic();
  }, [isFocused]);

  const starMusic = async () => {
    const musicTitle =
      (item?.title?.[0] ?? item?.item?.title?.[0]) || "Default Title";

    const musicRef = firestore().collection("stared").doc(musicTitle);
    // console.log(musicRef);
    try {
      const doc = await musicRef.get();
      console.log(doc);
      if (doc.exists) {
        const { starredBy, starCount } = doc.data();
        if (
          starredBy.includes(userData?.userId || starredBy == userData?.userId)
        ) {
          setStredId(true);
        }
      }
    } catch (error) {
      console.error("Error starring music:", error);
    }
  };

  const setupTrack = async () => {
    let isSetup = false;
    try {
      await TrackPlayer.getCurrentTrack();
      await TrackPlayer.stop();
      await TrackPlayer.reset();
      isSetup = true;
      await TrackPlayer.add({
        id:
          item?.guid?.[0]?._ || item?.item?.guid?.[0]?._ || item?.guid?.[0]?._,
        url:
          item?.enclosure?.[0]?.$?.url ||
          item?.item?.enclosure?.[0]?.$?.url ||
          item?.enclosure?.[0]?.$?.url,
        title: item?.title || item?.item?.title || item?.title,
        artist: channel?.title || item?.channel?.title || item?.title,
        artwork:
          channel?.imageUrl ||
          item?.channel?.imageUrl ||
          item?.imageUrl ||
          channel,
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
        id: item?.guid?.[0]?._ || item?.item?.guid?.[0]?._,
        url:
          item?.enclosure?.[0]?.$?.url ||
          item?.item?.enclosure?.[0]?.$?.url ||
          item?.enclosure?.[0]?.$?.url,
        title: item?.title || item?.item?.title || item?.title,
        artist: channel?.title || item?.channel?.title || item?.title,
        artwork:
          channel?.imageUrl ||
          item?.channel?.imageUrl ||
          item?.imageUrl ||
          channel,
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

  const [RcomendedMusic, setRcomendedMusic] = useState([]);

  const getAllStarredMusic = async () => {
    setstarLoading(true);
    try {
      const snapshot = await firestore().collection("stared").get();
      const starredMusic = snapshot.docs.map((doc) => doc.data());
      console.log(starredMusic[0]?.Staredmusic[0]?.title);
      setRcomendedMusic(starredMusic);
      setstarLoading(false);
      return starredMusic;
    } catch (error) {
      setstarLoading(false);
      console.error("Error fetching starred music:", error);
      return [];
    }
  };

  useEffect(() => {
    getAllStarredMusic();
  }, [isFocused]);

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <BackHeader
          title="Now Playing"
          isMenu={true}
          ItemData={item}
          chanalData={channel}
          stared={StredId}
        />
      )}
    >
      <View style={styles.mainContainer}>
        <View style={styles.headerImage}>
          <ImageFast
            source={{
              uri:
                channel?.imageUrl ||
                item?.channel?.imageUrl ||
                item?.imageUrl ||
                channel,
            }}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
            loading={loading}
          />
        </View>

        <CustomText
          label={`EPS ${
            item?.["itunes:episode"] || item?.item?.["itunes:episode"] || 0
          } | ${item?.title || item?.channel?.title || item?.title}`}
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

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <CustomText
          label="Recommended for You"
          color={COLORS.black}
          fontFamily={Fonts.bold}
          fontSize={16}
        />
      </View>
      <View>
        <FlatList
          horizontal
          refreshControl={
            <RefreshControl
              refreshing={starLoading}
              onRefresh={getAllStarredMusic}
              colors={[COLORS.primaryColor]}
            />
          }
          data={RcomendedMusic}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <Card
              imageHeight={183}
              width={183}
              image={item?.imageUrl}
              marginRight={10}
              item={item}
              onPress={() =>
                navigation.navigate("PlayerScreen", {
                  item: item?.Staredmusic[0],
                  channel: item?.imageUrl,
                })
              }
              title={item?.Staredmusic[0]?.title}
            />
          )}
        />
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
