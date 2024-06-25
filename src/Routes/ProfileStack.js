import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import React from "react";

import CategoryPodcast from "../screens/Main/CategoryPodcast";
import PrivacyPolicy from "../screens/Main/PrivacyPolicy";
import Subscription from "../screens/Main/Subscription";
import EditProfile from "../screens/Main/EditProfile";
import FavPodcast from "../screens/Main/FavPodcast";
import HelpCenter from "../screens/Main/HelpCenter";
import Profile from "../screens/Main/Profile";

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
      <Stack.Screen name="Subscription" component={Subscription} />
    </Stack.Navigator>
  );
};

export default ProfileStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
