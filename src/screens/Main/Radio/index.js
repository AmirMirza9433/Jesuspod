import {
  FlatList,
  StyleSheet,
  View,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { getAllDocs } from "../../../Firebase";
import { useIsFocused } from "@react-navigation/native";
import { COLORS } from "../../../utils/COLORS";
import FastImage from "react-native-fast-image";
import CustomText from "../../../components/CustomText";
import { Fonts } from "../../../utils/fonts";
import Icons from "../../../components/Icons";
import BackHeader from "../../../components/BackHeader";
import TrackPlayer, {
  State,
  Capability,
  usePlaybackState,
  useTrackPlayerEvents,
  Event,
} from "react-native-track-player";

const RadioPlayer = () => {
  const [Radio, setRadio] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [LoadingPlay, setLoadingPlay] = useState(false);

  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const focus = useIsFocused();
  const playbackState = usePlaybackState();

  const getRadio = async () => {
    setLoading(true);
    try {
      const res = await getAllDocs("Radio");
      setRadio(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("=========error:", error);
    }
  };

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
        compactCapabilities: [Capability.Play, Capability.Pause],
      });
    } catch (error) {
      console.log("Player setup error:", error);
    }
  };

  const togglePlayback = async (item) => {
    try {
      setLoadingPlay(true);
      if (currentTrack && currentTrack._id === item._id) {
        if (playbackState === State.Playing) {
          await TrackPlayer.pause();
        } else {
          await TrackPlayer.play();
        }
      } else {
        await TrackPlayer.reset();
        await TrackPlayer.add({
          id: item._id,
          url: item.url,
          title: item.title,
          artwork: item.imageUrl,
        });
        await TrackPlayer.play();
        setCurrentTrack(item);
      }
    } catch (error) {
      console.log("Playback error:", error);
      setLoadingPlay(false); // Ensure loading state is reset on error
    }
  };

  useTrackPlayerEvents([Event.PlaybackState], (event) => {
    if (event.state === State.Playing) {
      setIsPlaying(true);
      setLoadingPlay(false); // Stop loading when playback starts
    } else {
      setIsPlaying(false);
    }
  });

  useEffect(() => {
    setupPlayer();
    return () => {
      TrackPlayer.destroy();
    };
  }, []);

  useEffect(() => {
    getRadio();
  }, [focus]);

  return (
    <ScreenWrapper
      paddingHorizontal={0.1}
      scrollEnabled
      headerUnScrollable={() => (
        <View>
          <BackHeader title={"Radio"} />
        </View>
      )}
    >
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={Loading}
            onRefresh={getRadio}
            colors={[COLORS.primaryColor]}
          />
        }
        data={Radio}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <FastImage
                source={{ uri: item?.imageUrl }}
                style={{ height: 40, width: 40 }}
              />
              <CustomText
                label={item?.title}
                fontFamily={Fonts.semiBold}
                color={COLORS.black}
              />
            </View>

            {LoadingPlay && currentTrack?._id === item._id ? (
              <ActivityIndicator size="small" color={COLORS.primaryColor} />
            ) : (
              <Icons
                family="AntDesign"
                name={
                  isPlaying && currentTrack?._id === item._id
                    ? "pausecircle"
                    : "play"
                }
                size={30}
                onPress={() => togglePlayback(item)}
                color={COLORS.primaryColor}
              />
            )}
          </View>
        )}
      />
    </ScreenWrapper>
  );
};

export default RadioPlayer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    padding: 12,
  },
});
