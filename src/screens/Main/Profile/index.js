import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import BackHeader from "../../../components/BackHeader";
import CustomText from "../../../components/CustomText";
import ImageFast from "../../../components/ImageFast";
import Icons from "../../../components/Icons";

import { setRecentMusic } from "../../../store/reducer/recentSlice";
import { setUser } from "../../../store/reducer/usersSlice";
import { logout } from "../../../store/reducer/AuthConfig";
import { images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import { Fonts } from "../../../utils/fonts";

const Profile = ({ navigation }) => {
  const userData = useSelector((state) => state.user.users);

  const dispatch = useDispatch();
  const array = [
    {
      id: 1,
      title: "Favorite Podcast",
      icon: images.tabLive,
      onPress: () => navigation.navigate("FavPodcast"),
    },
    // {
    //   id: 2,
    //   title: "Notification",
    //   icon: images.notifications,
    // },
    // {
    //   id: 3,
    //   title: "Subscription",
    //   icon: images.subscription,
    // },
    {
      id: 4,
      title: "Privacy of Policy",
      icon: images.prvacy,
      onPress: () => navigation.navigate("PrivacyPolicy"),
    },
    {
      id: 5,
      title: "Help Center",
      icon: images.help,
      onPress: () => navigation.navigate("HelpCenter"),
    },
    {
      id: 6,
      title: "Logout",
      icon: images.exit,
      onPress: () => {
        dispatch(logout());
        dispatch(setUser({}));
        dispatch(setRecentMusic({}));
      },
    },
  ];
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <BackHeader title="Profile" />}
    >
      <View style={styles.mainContainer}>
        <View style={{ width: 96, height: 96, marginTop: 20 }}>
          <ImageFast
            source={
              userData?.userImage
                ? { uri: userData?.userImage }
                : images.placeholder
            }
            style={styles.userImage}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("EditProfile")}
            style={styles.editContainer}
          >
            <Icons family="Entypo" name="edit" color={COLORS.white} size={20} />
          </TouchableOpacity>
        </View>
        <CustomText
          label={userData?.userName}
          fontFamily={Fonts.bold}
          fontSize={20}
          marginTop={10}
        />
        <CustomText
          label={userData?.email}
          color={COLORS.gray}
          marginBottom={30}
        />
        {array.map((item) => (
          <TouchableOpacity
            onPress={item.onPress}
            key={item.id}
            activeOpacity={0.6}
            style={styles.item}
          >
            <View style={styles.row}>
              <Image source={item.icon} style={styles.itemIcon} />
              <CustomText
                label={item.title}
                fontFamily={Fonts.medium}
                color={COLORS.black}
                fontSize={16}
              />
            </View>
            <Icons family="Feather" name="chevron-right" size={25} />
          </TouchableOpacity>
        ))}
      </View>
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
  },
  userImage: {
    backgroundColor: COLORS.gray,
    borderRadius: 100,
    width: "100%",
    height: "100%",
  },
  editContainer: {
    width: 32,
    height: 32,
    borderRadius: 100,
    backgroundColor: COLORS.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    bottom: 5,
    right: -5,
    position: "absolute",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 10,
    marginBottom: 10,
  },
  itemIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginRight: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
