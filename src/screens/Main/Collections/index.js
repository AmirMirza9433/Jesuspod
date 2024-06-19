import {
  ActivityIndicator,
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import Card from "../../../components/Card";

import { COLORS } from "../../../utils/COLORS";
import { Fonts } from "../../../utils/fonts";
import YoutubePlayer from "react-native-youtube-iframe";
import WebView from "react-native-webview";
import { useSelector } from "react-redux";
{
  /* <script src="https://static.elfsight.com/platform/platform.js" data-use-service-core defer></script>
<div class="elfsight-app-9fa6a344-715f-4311-93d2-8e315f334d8c" data-elfsight-app-lazy></div> */
}
const Live = () => {
  const [loading, setLoading] = useState(true);
  const isPlayer = useSelector((state) => state.player.isPlayer);

  const elfsightWidgetHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>

      <body>
        <div class="elfsight-app-ff94899e-6f9d-43a4-842e-bafc22a85d7b" data-elfsight-app-lazy></div> <!-- Replace XXXXXXX with your Elfsight widget ID -->
        <script src="https://static.elfsight.com/platform/platform.js" data-use-service-core defer></script>
      </body>
    </html>
  `;

  return (
    <View style={[styles.container, { marginBottom: isPlayer ? 85 : 0 }]}>
      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}

      <WebView
        originWhitelist={["*"]}
        source={{ html: elfsightWidgetHTML }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        style={styles.webview}
      />
    </View>
  );
};

export default Live;
const styles = StyleSheet.create({
  border: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    marginBottom: 10,
  },

  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
