import { FlatList, View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import RNFetchBlob from "rn-fetch-blob";
import TrackPlayer, {
  useTrackPlayerEvents,
  usePlaybackState,
  Capability,
  State,
  Event,
} from "react-native-track-player";

import ScreenWrapper from "../../../components/ScreenWrapper";
import BackHeader from "../../../components/BackHeader";
import CustomText from "../../../components/CustomText";
import Icons from "../../../components/Icons";

import { COLORS } from "../../../utils/COLORS";
import { Fonts } from "../../../utils/fonts";
import { images } from "../../../assets/images";

const listDownloadedFiles = async () => {
  const downloads = RNFetchBlob.fs.dirs.DownloadDir + "/jesusDownload";
  try {
    const files = await RNFetchBlob.fs.ls(downloads);
    return files
      .filter((file) => file.endsWith(".mp3"))
      .map((file) => `${downloads}/${file}`);
  } catch (error) {
    console.log("Error listing files:", error);
    return [];
  }
};

const FavPodcast = () => {
  const playbackState = usePlaybackState();
  const [musicFiles, setMusicFiles] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      const files = await listDownloadedFiles();
      setMusicFiles(files);
    };

    fetchFiles();
  }, []);

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
      if (currentTrack && currentTrack === item) {
        if (playbackState === State.Playing) {
          await TrackPlayer.pause();
        } else {
          await TrackPlayer.play();
        }
      } else {
        await TrackPlayer.reset();
        await TrackPlayer.add({
          id: item,
          url: item,
          title: item?.substring(item.lastIndexOf("/") + 1),
          artwork: images.appLogo,
        });
        await TrackPlayer.play();
        setCurrentTrack(item);
      }
    } catch (error) {
      console.log("Playback error:", error);
    }
  };

  useTrackPlayerEvents([Event.PlaybackState], (event) => {
    if (event.state === State.Playing) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  });

  useEffect(() => {
    setupPlayer();
  }, []);

  useEffect(() => {
    if (playbackState === State.Playing && currentTrack) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [playbackState, currentTrack]);

  return (
    <ScreenWrapper headerUnScrollable={() => <BackHeader title="Downloads" />}>
      <FlatList
        data={musicFiles}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item}
        extraData={currentTrack}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ width: "90%" }}>
              <CustomText
                label={item?.substring(item.lastIndexOf("/") + 1)}
                fontFamily={Fonts.semiBold}
                numberOfLines={1}
                color={COLORS.black}
              />
            </View>
            <Icons
              family="AntDesign"
              name={isPlaying && currentTrack === item ? "pausecircle" : "play"}
              size={30}
              onPress={() => togglePlayback(item)}
              color={COLORS.primaryColor}
            />
          </View>
        )}
      />
    </ScreenWrapper>
  );
};

export default FavPodcast;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    padding: 12,
  },
});
