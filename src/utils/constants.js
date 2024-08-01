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
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
  );
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
const urls = [
  "https://feed.podbean.com/riverchurchpodcast/feed.xml",
  "https://feed.podbean.com/allnationschurchdublin/feed.xml",
  "https://anchor.fm/s/682886c/podcast/rss",
  "https://mercyculture.podbean.com/feed.xml",
  "https://freshstartaz.podbean.com/feed.xml",
  "http://feeds.feedburner.com/LineOfFireRadio",
  "https://feeds.simplecast.com/WWr9c8Mo",
  "https://DavidHernandezMinistries.podbean.com/feed.xml",
  "https://copelandnetworkaudiopodcast.libsyn.com/rss",
  "https://www.bennyhinn.org/feed/benny-hinn-ministries-fresh-manna/",
  // "https://copelandnetworkaudiopodcast.libsyn.com/rss",
  "https://feeds.castos.com/0r98",
  "http://bwm.downloadsvr.com/podcast_audio.xml",
  "http://www.jerrysavelle.org/rssfeeds/tvaudio.xml",
  "https://anchor.fm/s/6c7c87f8/podcast/rss",
  "https://feed.podbean.com/wdbministries/feed.xml",
  "https://anchor.fm/s/718ad498/podcast/rss",
  "https://careynieuwhof.libsyn.com/rss",
  "https://feeds.simplecast.com/atgtihd0",
  "https://feeds.soundcloud.com/users/soundcloud:users:409240443/sounds.rss",
  "https://h3leadership.libsyn.com/rss",
  "https://freedailybiblestudy.com/feed/podcast/",
  "https://www.omnycontent.com/d/playlist/5e27a451-e6e6-4c51-aa03-a7370003783c/7608f244-e104-4c65-a371-af5b00f8e73d/702576b7-8f9f-42e2-b078-af5b00f90f90/podcast.rss",
  "https://omny.fm/shows/chapter-a-day-audio-bible/playlists/podcast.rss",
  "https://dailybiblereading.libsyn.com/rss",
  "https://anchor.fm/s/ecddbdb8/podcast/rss",
  // "https://momsinprayer.libsyn.com/rss",
];
