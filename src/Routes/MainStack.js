import TrackPlayer from "react-native-track-player";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import BottomPlayer from "../components/BottomPlayer";

//screens
import TabStack from "./TabStack";

const MainStack = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const isPlayer = useSelector((state) => state.player.isPlayer);

  useEffect(() => {
    const updateTrack = async () => {
      const track = await TrackPlayer.getCurrentTrack();
      const trackObject = await TrackPlayer.getTrack(track);
      setCurrentTrack(trackObject);
    };

    const trackChangedListener = TrackPlayer.addEventListener(
      "playback-track-changed",
      updateTrack
    );

    return () => {
      trackChangedListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <TabStack />
      {currentTrack && isPlayer && <BottomPlayer currentTrack={currentTrack} />}
    </View>
  );
};

export default MainStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
