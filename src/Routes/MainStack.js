import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";

//screens
import TabStack from "./TabStack";
import Profile from "../screens/Main/Profile";
import ProductDetail from "../screens/Main/ProductDetail";
import PlayerScreen from "../screens/Main/PlayerScreen";
import SeeAll from "../screens/Main/AllChanals";
import FavPodcast from "../screens/Main/FavPodcast";
import TrackPlayer from "react-native-track-player";
import BottomPlayer from "../components/BottomPlayer";
import { StyleSheet, View } from "react-native";
import CategoryPodcast from "../screens/Main/CategoryPodcast";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
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
      <View style={styles.navigatorContainer}>
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
        </Stack.Navigator>
      </View>

      {currentTrack && <BottomPlayer currentTrack={currentTrack} />}
    </View>
  );
};

export default MainStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigatorContainer: {
    flex: 1,
    // marginBottom: , // Adjust according to the height of BottomPlayer
  },
});
