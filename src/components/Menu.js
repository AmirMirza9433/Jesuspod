import React from "react";
import { MenuView } from "@react-native-menu/menu";
import Icons from "./Icons";
import { COLORS } from "../utils/COLORS";
import { Fonts } from "../utils/fonts";
import { images } from "../assets/images";
import RNFetchBlob from "rn-fetch-blob";
import Share from "react-native-share";
import { View } from "react-native";

const MenuOptios = ({ ItemData, chanalData }) => {
  const downloadData = () => {
    const { config, fs } = RNFetchBlob;
    const downloads = fs.dirs.DownloadDir;
    return config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: downloads + "/" + ItemData?.title[0] + ".mp3",
      },
    }).fetch("GET", ItemData?.enclosure[0].$.url);
  };

  const ondataShare = () => {
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch("GET", chanalData.image)
      .then((resp) => {
        return resp.readFile("base64");
      })
      .then((base64Data) => {
        const imageUrl = "data:image/png;base64," + base64Data;

        const shareImage = {
          title: ItemData.title[0].trim(),
          message: ItemData?.enclosure[0].$.url,
          url: imageUrl,
        };

        Share.open(shareImage)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            err && console.log(err);
          });

        if (imagePath) {
          return RNFetchBlob.fs.unlink(imagePath);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <MenuView
      themeVariant="light"
      title="Menu Title"
      shouldOpenOnLongPress={false}
      onPressAction={({ nativeEvent }) => {
        if (nativeEvent?.event === "2") {
          ondataShare(); // Call onShare function when Share option is pressed
        } else if (nativeEvent?.event === "3") {
          downloadData();
        } else {
        }

        // console.warn(JSON.stringify(nativeEvent));
      }}
      actions={[
        {
          id: "1",
          title: "Like",
          titleColor: COLORS.black,
          //   image: images.setting,
          imageColor: COLORS.primaryColor,
        },
        {
          id: "2",
          title: "Share",
          titleColor: COLORS.black,
          subtitle: "Share action on SNS",
          //   image: images.setting,
          imageColor: COLORS.primaryColor,
          //   state: "on",
        },
        {
          id: "3",
          title: "Download",
          titleColor: COLORS.black,
          //   image: images.setting,
          imageColor: COLORS.primaryColor,
        },
      ]}
    >
      <Icons
        family="Entypo"
        name="dots-three-horizontal"
        size={22}
        color={COLORS.primaryColor}
      />
    </MenuView>
  );
};

export default MenuOptios;
