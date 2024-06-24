import { Image, Keyboard, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";

import CustomButton from "./CustomButton";
import CustomText from "./CustomText";
import Drawer from "./Drawer";

import { setDrawer } from "../store/reducer/PlayerSlice";
import { images } from "../assets/images";
import { COLORS } from "../utils/COLORS";

const NetworkIssue = ({ children }) => {
  const dispatch = useDispatch();
  const isDrawer = useSelector((state) => state.player.isDrawer);

  const [isInternetReachable, setInternetReachable] = useState(true);
  const [connected, setConnected] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!connected) Keyboard.dismiss();
  }, [connected]);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnected(state.isConnected);
      setInternetReachable(state.isInternetReachable);
    });
    return unsubscribe;
  }, []);
  const retry = async () => {
    setLoading(true);
    try {
      await NetInfo.refresh();
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  if (
    connected &&
    (isInternetReachable === true || isInternetReachable === null)
  )
    return (
      <View style={{ flex: 1 }}>
        {true && (
          <Drawer
            isVisible={isDrawer}
            onDisable={() => dispatch(setDrawer(false))}
          />
        )}
        {children}
      </View>
    );
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={images.warning} style={styles.warning} />
      <CustomText
        label={
          !isInternetReachable && connected
            ? "Poor internet connection!"
            : "There seems to be an issue with your internet connection and we can't reach our servers."
        }
        color={COLORS.red}
        fontSize={16}
        marginTop={20}
      />
      <CustomButton
        title="Retry"
        width="90%"
        marginTop={20}
        loading={loading}
        onPress={retry}
      />
    </View>
  );
};
export default NetworkIssue;
const styles = StyleSheet.create({
  warning: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
