import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import TrackPlayer from "react-native-track-player";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

import CategoryPodcast from "../screens/Main/CategoryPodcast";
import ProductDetail from "../screens/Main/ProductDetail";
import PlayerScreen from "../screens/Main/PlayerScreen";
import Discover from "../screens/Main/Discover";

const Stack = createNativeStackNavigator();

const DiscoverStack = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
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
    <View style={{ flex: 1 }}>
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
    </View>
  );
};

export default DiscoverStack;
