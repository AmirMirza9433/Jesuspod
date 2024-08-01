import { ActivityIndicator } from "react-native";
import WebView from "react-native-webview";
import React, { useState } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";

import { COLORS } from "../../../utils/COLORS";

const Live = () => {
  const [loading, setLoading] = useState(true);
  const widgetHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>

      <body>
        <div class="elfsight-app-9fa6a344-715f-4311-93d2-8e315f334d8c" data-elfsight-app-lazy></div> <!-- Replace XXXXXXX with your Elfsight widget ID -->
        <script src="https://static.elfsight.com/platform/platform.js" data-use-service-core defer></script>
      </body>
    </html>
  `;
  return (
    <ScreenWrapper paddingHorizontal={0.1}>
      {loading && (
        <ActivityIndicator size="large" color={COLORS.primaryColor} />
      )}

      <WebView
        originWhitelist={["*"]}
        source={{ html: widgetHTML }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        style={{ flex: 1 }}
      />
    </ScreenWrapper>
  );
};

export default Live;
