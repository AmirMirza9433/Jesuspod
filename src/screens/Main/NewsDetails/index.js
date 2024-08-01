import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import ScreenWrapper from "../../../components/ScreenWrapper";
import BackHeader from "../../../components/BackHeader";

export default function NewsDetails({ route }) {
  const { width } = useWindowDimensions();

  const data = route?.params?.data;
  console.log("====================================");
  console.log(data["content:encoded"]);
  console.log("====================================");

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <View>
          <BackHeader title={"News"} />
        </View>
      )}
    >
      <RenderHtml
        contentWidth={width}
        source={{ html: data["content:encoded"][0] }}
        tagsStyles={tagsStyles}
        classesStyles={classesStyles}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({});

const tagsStyles = {
  h1: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "black", // Customize as needed
  },
  h2: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "black", // Customize as needed
  },
  // Add other heading styles as needed
};

const classesStyles = {
  centerImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
