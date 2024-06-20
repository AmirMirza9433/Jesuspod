import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import ProductDetail from "../screens/Main/ProductDetail";
import PlayerScreen from "../screens/Main/PlayerScreen";
import SeeAll from "../screens/Main/AllChanals";
import Home from "../screens/Main/Home";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="SeeAll" component={SeeAll} />
      <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
