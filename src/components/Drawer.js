import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import React from "react";

import { COLORS } from "../utils/COLORS";

const Drawer = ({ onDisable, isVisible }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onDisable}
      onBackButtonPress={onDisable}
      onSwipeComplete={onDisable}
      onDismiss={onDisable}
      swipeDirection="left"
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      backdropOpacity={0.5}
      avoidKeyboard={true}
      propagateSwipe={true}
      style={{ margin: 0 }}
    >
      <View style={styles.mainContainer}></View>
    </Modal>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: "flex-start",
    width: "70%",
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
