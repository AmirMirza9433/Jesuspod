import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Platform, View, Image } from "react-native";
import React from "react";

import Icons from "../components/Icons";

// screens
import Collections from "../screens/Main/Collections";
import DiscoverStack from "./DiscoverStack";
import ProfileStack from "./ProfileStack";
import Live from "../screens/Main/Live";
import HomeStack from "./HomeStack";

import { images } from "../assets/images";
import { COLORS } from "../utils/COLORS";
import { Fonts } from "../utils/fonts";

const Tab = createBottomTabNavigator();
const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={(route) => ({
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
        component={HomeStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? <View style={styles.emptyView} /> : null}
              <Image
                source={images.podcast}
                style={[
                  styles.icon,
                  { tintColor: focused ? COLORS.primaryColor : COLORS.gray },
                ]}
              />
            </View>
          ),
        }}
        name="Podcasts"
        component={DiscoverStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? <View style={styles.emptyView} /> : null}
              <Image
                source={images.subscription}
                style={[
                  styles.icon,
                  { tintColor: focused ? COLORS.primaryColor : COLORS.gray },
                ]}
              />
            </View>
          ),
        }}
        name="Videos"
        component={Live}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? <View style={styles.emptyView} /> : null}
              <Image
                source={images.news}
                style={[
                  styles.icon,
                  { tintColor: focused ? COLORS.primaryColor : COLORS.gray },
                ]}
              />
            </View>
          ),
        }}
        name="News"
        component={Collections}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? <View style={styles.emptyView} /> : null}
              <Icons
                family={"FontAwesome5"}
                name={"user-circle"}
                size={22}
                color={focused ? COLORS.primaryColor : COLORS.gray}
              />
            </View>
          ),
        }}
        name="Profile"
        component={ProfileStack}
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
    color: COLORS.black,
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
