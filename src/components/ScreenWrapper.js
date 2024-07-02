import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  StatusBar,
  View,
} from "react-native";

import ImageFast from "./ImageFast";

import { COLORS } from "../utils/COLORS";

const { width, height } = Dimensions.get("window");

const FocusAwareStatusBar = (props) => {
  const isFocused = useIsFocused();
  return isFocused ? (
    <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} {...props} />
  ) : null;
};

const ScreenWrapper = ({
  children,
  statusBarColor = COLORS.bg,
  transclucent = false,
  scrollEnabled = false,
  backgroundImage,
  backgroundColor = COLORS.bg,
  headerUnScrollable = () => null,
  footerUnScrollable = () => null,
  barStyle = "dark-content",
  refreshControl,
  paddingBottom,
  marginBottom,
  nestedScrollEnabled = true,
  paddingHorizontal,
}) => {
  const navigation = useNavigation();

  const content = () => {
    return (
      <View
        style={[
          styles.container,
          {
            paddingBottom: paddingBottom,
            // marginBottom: marginBottom,
            backgroundColor: backgroundImage ? "transparent" : backgroundColor,
          },
        ]}
      >
        <FocusAwareStatusBar
          barStyle={barStyle}
          backgroundColor={statusBarColor}
          translucent={transclucent}
        />
        {!transclucent && (
          <SafeAreaView
            style={(styles.container, { backgroundColor: statusBarColor })}
          />
        )}
        {headerUnScrollable()}

        {scrollEnabled ? (
          <KeyboardAwareScrollView
            nestedScrollEnabled={nestedScrollEnabled}
            refreshControl={refreshControl}
            style={[
              styles.container,
              { backgroundColor, paddingHorizontal: paddingHorizontal || 25 },
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </KeyboardAwareScrollView>
        ) : (
          <View
            style={{
              paddingHorizontal: paddingHorizontal || 25,
              flex: 1,
              backgroundColor,
            }}
          >
            {children}
          </View>
        )}
        {footerUnScrollable()}
      </View>
    );
  };
  return backgroundImage ? (
    <View style={{ width, height, zIndex: 999 }}>
      {content()}
      <ImageFast
        source={backgroundImage}
        style={{ width, height, position: "absolute", zIndex: -1 }}
        resizeMode="cover"
      />
    </View>
  ) : (
    content()
  );
};

export default ScreenWrapper;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
