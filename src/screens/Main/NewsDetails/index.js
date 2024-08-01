import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import React from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import BackHeader from "../../../components/BackHeader";

const NewsDetails = ({ route }) => {
  const { width } = useWindowDimensions();
  const data = route?.params?.data;
  const content = data["content:encoded"]?.[0]?.trim();
  const fallbackContent = data?.description?.[0];
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <BackHeader title="News" />}
    >
      <RenderHtml
        contentWidth={width}
        source={{
          html: content && content.length > 0 ? content : fallbackContent,
        }}
        tagsStyles={tagsStyles}
        classesStyles={classesStyles}
      />
    </ScreenWrapper>
  );
};
export default NewsDetails;
const tagsStyles = {
  h1: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  h2: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
};

const classesStyles = {
  centerImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
