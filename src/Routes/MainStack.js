import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

//screens
import TabStack from "./TabStack";
import Profile from "../screens/Main/Profile";
import ProductDetail from "../screens/Main/ProductDetail";
import PlayerScreen from "../screens/Main/PlayerScreen";
import SeeAll from "../screens/Main/AllChanals";
import FavPodcast from "../screens/Main/FavPodcast";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
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
    </Stack.Navigator>
  );
};

export default MainStack;
