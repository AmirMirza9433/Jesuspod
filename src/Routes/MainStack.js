import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TrackPlayer from "react-native-track-player";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import BottomPlayer from "../components/BottomPlayer";

//screens
import CategoryPodcast from "../screens/Main/CategoryPodcast";
import ProductDetail from "../screens/Main/ProductDetail";
import PlayerScreen from "../screens/Main/PlayerScreen";
import FavPodcast from "../screens/Main/FavPodcast";
import SeeAll from "../screens/Main/AllChanals";
import Profile from "../screens/Main/Profile";
import TabStack from "./TabStack";
import EditProfile from "../screens/Main/EditProfile";
import HelpCenter from "../screens/Main/HelpCenter";

const Stack = createNativeStackNavigator();

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
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="TabStack" component={TabStack} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="SeeAll" component={SeeAll} />
        <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
        <Stack.Screen name="FavPodcast" component={FavPodcast} />
        <Stack.Screen name="CategoryPodcast" component={CategoryPodcast} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="HelpCenter" component={HelpCenter} />
      </Stack.Navigator>
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
