import { useDispatch, useSelector } from "react-redux";
import { MenuView } from "@react-native-menu/menu";
import RNFetchBlob from "rn-fetch-blob";
import Share from "react-native-share";
import React from "react";

import Icons from "./Icons";

import { COLORS } from "../utils/COLORS";
import { updateCollection } from "../Firebase";
import { setUser } from "../store/reducer/usersSlice";

const MenuOptios = ({ ItemData, chanalData }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authConfig.token);
  const userData = useSelector((state) => state.user.users);

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
  const onLike = async () => {
    let finalArray;
    if (
      userData?.musics?.filter(
        (item) => item?.title?.[0] == ItemData?.title?.[0]
      )?.length
    ) {
      finalArray = userData?.musics?.filter(
        (item) => item?.title?.[0] != ItemData?.title?.[0]
      );
    } else {
      finalArray = [...userData?.musics, ItemData];
    }
    try {
      const res = await updateCollection("users", token, {
        ...userData,
        musics: finalArray,
      });
      dispatch(
        setUser({
          ...userData,
          musics: finalArray,
        })
      );
      console.log("==============res", res);
    } catch (error) {
      console.log("==============error", error?.response?.data);
    }
  };
  return (
    <MenuView
      themeVariant="light"
      title="Menu Title"
      shouldOpenOnLongPress={false}
      onPressAction={({ nativeEvent }) => {
        if (nativeEvent?.event === "1") {
          onLike();
        } else if (nativeEvent?.event === "2") {
          ondataShare();
        } else if (nativeEvent?.event === "3") {
          downloadData();
        }
      }}
      actions={[
        {
          id: "1",
          title: userData?.musics?.filter(
            (item) => item?.title?.[0] == ItemData?.title
          )?.length
            ? "Un Like"
            : "Like",
          titleColor: COLORS.black,
          imageColor: COLORS.primaryColor,
        },
        {
          id: "2",
          title: "Share",
          titleColor: COLORS.black,
          subtitle: "Share action on SNS",
          imageColor: COLORS.primaryColor,
        },
        {
          id: "3",
          title: "Download",
          titleColor: COLORS.black,
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
