import { useDispatch, useSelector } from "react-redux";
import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Linking,
  Image,
  View,
  Text,
} from "react-native";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
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
      id: 3,
      title: "Subscription",
      icon: images.subscription,
      onPress: () => navigation.navigate("Subscription"),
    },
    {
      id: 4,
      title: "Downloads",
      icon: images.down,
      onPress: () => navigation.navigate("FavPodcast"),
    },
    {
      id: 5,
      title: "Privacy of Policy",
      icon: images.prvacy,
      onPress: () => navigation.navigate("PrivacyPolicy"),
    },
    {
      id: 6,
      title: "Help Center",
      icon: images.help,
      onPress: () => navigation.navigate("HelpCenter"),
    },
    {
      id: 7,
      title: "Logout",
      icon: images.exit,
      onPress: () => {
        dispatch(logout());
        dispatch(setUser({}));
        dispatch(setRecentMusic([]));
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
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 8,
            textAlign: "center",
            flexDirection: "row",
            gap: 5,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.black,
              fontFamily: Fonts.semiBold,
              fontSize: 20,
            }}
          >
            Help us preach the gospel
          </Text>
        </TouchableOpacity>

        <CustomButton
          onPress={() => Linking.openURL("https://fpgchurch.com/pages/give")}
          title={"Give Now"}
          fontSize={22}
          width={130}
          height={40}
          marginTop={5}
          borderRadius={2}
          fontFamily={Fonts.bold}
          backgroundColor={"green"}
        />
        <CustomText
          label={"A Ministry of Faith Pleases God Church"}
          color={COLORS.primaryColor}
          fontFamily={Fonts.medium}
          marginTop={10}
        />
        <TouchableOpacity
          onPress={() => Linking.openURL("https://fpgchurch.com/")}
        >
          <CustomText
            label={"fpgchurch.com"}
            color={COLORS.primaryColor}
            fontFamily={Fonts.bold}
            textDecorationLine={"underline"}
            marginTop={10}
          />
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    marginBottom: 100,
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
