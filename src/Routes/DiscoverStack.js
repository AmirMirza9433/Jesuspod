import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import ProductDetail from "../screens/Main/ProductDetail";
import PlayerScreen from "../screens/Main/PlayerScreen";
import SeeAll from "../screens/Main/AllChanals";
import CategoryPodcast from "../screens/Main/CategoryPodcast";
import Live from "../screens/Main/Collections";
import Discover from "../screens/Main/Discover";

const Stack = createNativeStackNavigator();

const DiscoverStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Discover" component={Discover} />
      <Stack.Screen name="CategoryPodcast" component={CategoryPodcast} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
};

export default DiscoverStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
