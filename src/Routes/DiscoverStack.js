import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import ProductDetail from "../screens/Main/ProductDetail";
import PlayerScreen from "../screens/Main/PlayerScreen";
import SeeAll from "../screens/Main/AllChanals";
import CategoryPodcast from "../screens/Main/CategoryPodcast";
import Live from "../screens/Main/Collections";
import Discover from "../screens/Main/Discover";
import TrackPlayer from "react-native-track-player";

import BottomPlayer from "../components/BottomPlayer";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
const Stack = createNativeStackNavigator();

const DiscoverStack = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const isPlayer = useSelector((state) => state.player.isPlayer);
  const navigation = useNavigation();

  useEffect(() => {
    const updateTrack = async () => {
      const track = await TrackPlayer.getActiveTrack();
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

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      navigation.reset({
        index: 0,
        routes: [{ name: "DiscoverPage" }],
      });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Stack.Navigator
        initialRouteName="DiscoverPage"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="DiscoverPage" component={Discover} />
        <Stack.Screen name="CategoryPodcast" component={CategoryPodcast} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
      </Stack.Navigator>
      {/* {currentTrack && isPlayer && <BottomPlayer currentTrack={currentTrack} />} */}
    </View>
  );
};

export default DiscoverStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
