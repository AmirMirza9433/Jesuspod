import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image as ImageCompressor } from "react-native-compressor";
import { PermissionsAndroid, Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";
import storage from "@react-native-firebase/storage";

import { ToastMessage } from "./ToastMessage";

export const ValidateEmail = (email) => {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (regex.test(email)) {
    return true;
  } else {
    return false;
  }
};
export const ValidatePass = (pass) => {
  const regex =
    /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

  if (regex.test(pass)) {
    return true;
  } else {
    return false;
  }
};
export const uploadAndGetUrl = async (file) => {
  try {
    const resizeUri = await ImageCompressor.compress(
      file.fileCopyUri || file.path
    );
    const filename = `images/${new Date()
      .toISOString()
      .replace(/[.:-]+/g, "_")}`;
    const uploadUri =
      Platform.OS === "ios" ? resizeUri.replace("file://", "") : resizeUri;
    const storageRef = storage().ref(filename);
    await storageRef.putFile(uploadUri);
    const url = await storageRef.getDownloadURL();
    console.log("Image uploaded successfully");
    return url;
  } catch (err) {
    console.log("=======er", err);
    ToastMessage("Upload Again");
  }
};

export const getToken = async () => {
  // if (Platform.OS == "android") {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
  );
  // }
  const fcmToken = await AsyncStorage.getItem("fcmToken");
  // console.log('=======fcmToken', fcmToken);
  if (!fcmToken) {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    const token = await messaging().getToken();
    await AsyncStorage.setItem("fcmToken", token);
  } else {
    return;
  }
};
var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
export const formatPrice = (number) => {
  var tier = (Math.log10(Math.abs(number)) / 3) | 0;
  if (tier == 0) return number;
  var suffix = SI_SYMBOL[tier];
  var scale = Math.pow(10, tier * 3);
  var scaled = number / scale;
  var formattedNumber =
    scaled % 1 === 0 ? scaled.toFixed(0) : scaled.toFixed(1);
  return formattedNumber + suffix;
};
