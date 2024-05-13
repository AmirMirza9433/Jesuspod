import {
  ActivityIndicator,
  Dimensions,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import React, { useState } from "react";

import CustomModal from "./CustomModal";

import { COLORS } from "../utils/COLORS";
import Icons from "./Icons";

const ImageFast = ({ source, style, resizeMode, isView, loading }) => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isViewModal, setIsViewModal] = useState(false);
  const { width, height } = Dimensions.get("window");
  return (
    <TouchableOpacity
      onPress={() => setIsViewModal(true)}
      activeOpacity={0.6}
      disabled={!isView}
      style={[
        style,
        { overflow: "hidden" },
        (loading || isImageLoading) && {
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      {isViewModal && (
        <CustomModal
          isVisible={isViewModal}
          onDisable={() => setIsViewModal(false)}
        >
          <Icons
            family="Entypo"
            name="circle-with-cross"
            color={COLORS.white}
            size={30}
            onPress={() => setIsViewModal(false)}
            style={{
              alignSelf: "flex-end",
              marginBottom: 20,
              marginRight: 10,
              top: Platform.OS == "ios" ? 50 : 0,
              zIndex: 999,
            }}
          />
          <FastImage
            onLoadStart={() => setIsImageLoading(true)}
            onLoadEnd={() => setIsImageLoading(false)}
            source={source}
            resizeMode="contain"
            style={{
              width: width,
              height: height - 70,
            }}
          />
        </CustomModal>
      )}
      <FastImage
        onLoadStart={() => setIsImageLoading(true)}
        onLoadEnd={() => setIsImageLoading(false)}
        source={source}
        resizeMode={resizeMode}
        style={{ width: "100%", height: "100%" }}
      />

      {loading || isImageLoading ? (
        <ActivityIndicator
          style={{ position: "absolute" }}
          color={COLORS.primaryColor}
          size="large"
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default ImageFast;
