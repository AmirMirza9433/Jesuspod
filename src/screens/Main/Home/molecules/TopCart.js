import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import CustomButton from "../../../../components/CustomButton";
import CustomText from "../../../../components/CustomText";

import { COLORS } from "../../../../utils/COLORS";
import { Fonts } from "../../../../utils/fonts";
import { useNavigation } from "@react-navigation/native";
import { getAllDocs } from "../../../../Firebase";
import Card from "../../../../components/Card";
import ImageFast from "../../../../components/ImageFast";
import Icons from "../../../../components/Icons";
import { images } from "../../../../assets/images";

const TopCart = ({ item, channelData }) => {
  // uri: "",

  const navigation = useNavigation();
  return <></>;
};

export default TopCart;

const styles = StyleSheet.create({});
