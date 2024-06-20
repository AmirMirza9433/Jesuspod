import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import ProductDetail from "../screens/Main/ProductDetail";
import PlayerScreen from "../screens/Main/PlayerScreen";
import SeeAll from "../screens/Main/AllChanals";
import Profile from "../screens/Main/Profile";
import EditProfile from "../screens/Main/EditProfile";
import FavPodcast from "../screens/Main/FavPodcast";
import CategoryPodcast from "../screens/Main/CategoryPodcast";
import HelpCenter from "../screens/Main/HelpCenter";
import PrivacyPolicy from "../screens/Main/PrivacyPolicy";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="FavPodcast" component={FavPodcast} />
      <Stack.Screen name="CategoryPodcast" component={CategoryPodcast} />
      <Stack.Screen name="HelpCenter" component={HelpCenter} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
};

export default ProfileStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
