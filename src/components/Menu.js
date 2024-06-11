import { useDispatch, useSelector } from "react-redux";
import RNFetchBlob from "rn-fetch-blob";
import Share from "react-native-share";
import React from "react";

import Icons from "./Icons";

import { COLORS } from "../utils/COLORS";
import { updateCollection } from "../Firebase";
import { setUser } from "../store/reducer/usersSlice";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { View } from "react-native";
import CustomText from "./CustomText";
import { Fonts } from "../utils/fonts";
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
      .fetch("GET", chanalData?.image)
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
          .then((res) => {})
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
    } catch (error) {
      console.log("==============error", error?.response?.data);
    }
  };
  return (
    <Menu>
      <MenuTrigger>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icons
            family="Entypo"
            name="dots-three-horizontal"
            size={22}
            color={COLORS.primaryColor}
          />
        </View>
      </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={ondataShare}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icons
              family="Entypo"
              name="share"
              size={22}
              color={COLORS.primaryColor}
            />

            <CustomText
              fontFamily={Fonts.medium}
              label={"Share"}
              marginLeft={10}
            />
          </View>
        </MenuOption>
        <MenuOption onSelect={onLike}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icons
              family="AntDesign"
              name="like1"
              size={22}
              color={COLORS.primaryColor}
            />

            <CustomText
              fontFamily={Fonts.medium}
              label={"Like"}
              marginLeft={10}
            />
          </View>
        </MenuOption>
        <MenuOption onSelect={downloadData}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icons
              family="MaterialIcons"
              name="download-for-offline"
              size={22}
              color={COLORS.primaryColor}
            />
            <CustomText
              fontFamily={Fonts.medium}
              label={"Download"}
              marginLeft={10}
            />
          </View>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

export default MenuOptios;
