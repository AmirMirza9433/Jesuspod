import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

import CustomText from "./CustomText";
import Icons from "./Icons";

import { COLORS } from "../utils/COLORS";
import { Fonts } from "../utils/fonts";
import MenuOptios from "./Menu";
import RNFetchBlob from "rn-fetch-blob";
import Share from "react-native-share";
import { useSelector } from "react-redux";
import { useState } from "react";

const BackHeader = ({
  title,
  onBackPress,
  onHeartPress,
  onSharePress,
  color,
  isHeart = false,
  isMenu = false,
  ItemData,
  chanalData,
  stared,
}) => {
  const navigation = useNavigation();
  const userData = useSelector((state) => state.user.users);
  const [Starepod, setStared] = useState(false);

  useEffect(() => {
    setStared(stared);
  }, [stared]);

  const ondataShare = () => {
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch(
        "GET",
        ItemData?.channel?.imageUrl ||
          ItemData?.imageUrl ||
          chanalData?.imageUrl ||
          chanalData
      )
      .then((resp) => {
        return resp.readFile("base64");
      })
      .then((base64Data) => {
        const imageUrl = "data:image/png;base64," + base64Data;

        const shareImage = {
          title: ItemData.title[0].trim() || ItemData?.channel.title,
          message:
            ItemData?.enclosure[0].$.url ||
            ItemData?.channel.enclosure[0].$.url,
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

  const starMusic = async () => {
    const userId = userData?.userId;

    const musicTitle = ItemData?.title[0] || ItemData?.channel?.title[0];

    if (!userId || !musicTitle) {
      console.error("User ID or music title is missing.");
      return;
    }

    const musicRef = firestore().collection("stared").doc(musicTitle);
    setStared(true); // Set the stared state

    try {
      const doc = await musicRef.get();
      if (doc.exists) {
        const { starredBy, starCount } = doc.data();
        if (starredBy.includes(userId)) {
          // If userId is in starredBy, unstar the music
          const updatedStarredBy = starredBy.filter((id) => id !== userId);
          const newStarCount = starCount - 1;
          setStared(false); // Set the stared state

          if (newStarCount === 0) {
            // Delete the document if no more stars
            await musicRef.delete();
          } else {
            // Update the document with the new starredBy array and starCount
            await musicRef.update({
              starredBy: updatedStarredBy,
              starCount: newStarCount,
            });
          }
        } else {
          // Manually update starredBy array
          const updatedStarredBy = [...starredBy, userId];
          await musicRef.update({
            starredBy: updatedStarredBy,
            starCount: starCount + 1,
          });
        }
      } else {
        // Create the document if it doesn't exist
        await musicRef.set({
          Staredmusic: [ItemData],
          imageUrl:
            ItemData?.imageUrl ||
            ItemData?.channel?.imageUrl ||
            chanalData.imageUrl ||
            chanalData,
          starCount: 1,
          starredBy: [userId],
        });
      }
    } catch (error) {
      console.error("Error starring music:", error);
    }
  };

  return (
    <View style={[styles.mainContainer]}>
      <Icons
        family="Ionicons"
        name="arrow-back"
        size={25}
        color={color || COLORS.black}
        onPress={onBackPress ? onBackPress : () => navigation.goBack()}
      />
      <CustomText
        label={title}
        fontSize={18}
        fontFamily={Fonts.semiBold}
        color={color || COLORS.black}
      />

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {onSharePress ? (
          <Icons
            family="Feather"
            name="share-2"
            size={22}
            color={color || COLORS.black}
            onPress={onSharePress}
            style={{ marginRight: 15 }}
          />
        ) : null}

        {onHeartPress ? (
          <Icons
            family="AntDesign"
            name={isHeart ? "heart" : "hearto"}
            size={22}
            color={color ? color : isHeart ? COLORS.red : COLORS.black}
            onPress={onHeartPress}
            style={{ marginRight: 15 }}
          />
        ) : null}

        {isMenu ? (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={starMusic}>
              <Icons
                family="AntDesign"
                name={Starepod ? "star" : "staro"}
                size={22}
                color={COLORS.primaryColor}
                marginRight={10}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={ondataShare}>
              <Icons
                family="Entypo"
                name="share"
                size={22}
                color={COLORS.primaryColor}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    padding: 10,
    paddingBottom: 15,
    marginLeft: "2.5%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  profile: {
    height: 56,
    width: 56,
    borderRadius: 100,
    backgroundColor: COLORS.gray,
  },
  icon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
});
