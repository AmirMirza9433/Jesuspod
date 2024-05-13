import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Platform, View, Image } from "react-native";
import React from "react";

// screens

import Collections from "../screens/Main/Collections";
import Discover from "../screens/Main/Discover";
import Home from "../screens/Main/Home";
import Live from "../screens/Main/Live";

import { images } from "../assets/images";
import { COLORS } from "../utils/COLORS";
import { Fonts } from "../utils/fonts";

const Tab = createBottomTabNavigator();
const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: COLORS.primaryColor,
        headerShown: false,
      })}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? <View style={styles.emptyView} /> : null}
              <Image
                source={images.tabHome}
                style={[
                  styles.icon,
                  { tintColor: focused ? COLORS.primaryColor : COLORS.gray },
                ]}
              />
            </View>
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? <View style={styles.emptyView} /> : null}
              <Image
                source={images.tabDiscover}
                style={[
                  styles.icon,
                  { tintColor: focused ? COLORS.primaryColor : COLORS.gray },
                ]}
              />
            </View>
          ),
        }}
        name="Discover"
        component={Discover}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? <View style={styles.emptyView} /> : null}
              <Image
                source={images.tabLive}
                style={[
                  styles.icon,
                  { tintColor: focused ? COLORS.primaryColor : COLORS.gray },
                ]}
              />
            </View>
          ),
        }}
        name="Live"
        component={Live}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? <View style={styles.emptyView} /> : null}
              <Image
                source={images.tabCollection}
                style={[
                  styles.icon,
                  { tintColor: focused ? COLORS.primaryColor : COLORS.gray },
                ]}
              />
            </View>
          ),
        }}
        name="Collections"
        component={Collections}
      />
    </Tab.Navigator>
  );
};

export default TabStack;
const styles = StyleSheet.create({
  tabBarStyle: {
    height: Platform.OS == "ios" ? 75 : 70,
    backgroundColor: "white",
    paddingBottom: 5,
  },
  tabBarLabelStyle: {
    fontSize: 10,
    fontFamily: Fonts.medium,
    marginBottom: Platform.OS == "ios" ? 12 : 5,
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
    marginTop: 5,
  },
  emptyView: {
    width: 27,
    height: 3,
    backgroundColor: COLORS.primaryColor,
    position: "absolute",
    top: -8,
    borderRadius: 100,
  },
});
