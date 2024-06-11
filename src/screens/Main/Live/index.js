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
{
  /* <script src="https://static.elfsight.com/platform/platform.js" data-use-service-core defer></script>
<div class="elfsight-app-9fa6a344-715f-4311-93d2-8e315f334d8c" data-elfsight-app-lazy></div> */
}
const Live = () => {
  const [loading, setLoading] = useState(true);

  const elfsightWidgetHTML = `
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
  // const [ChanalDAta, setChanalDAta] = useState([]);
  // const [ChanalDAtaSecoon, setChanalDAtaSecoond] = useState([]);
  // const [playing, setPlaying] = useState(false);

  // const onStateChange = useCallback((state) => {
  //   if (state === "ended") {
  //     setPlaying(false);
  //     Alert.alert("video has finished playing!");
  //   }
  // }, []);

  // const togglePlaying = useCallback(() => {
  //   setPlaying((prev) => !prev);
  // }, []);

  // const fetchData = () => {
  //   const url = `https://www.googleapis.com/youtube/v3/search?key=${"AIzaSyCz-9tzbAEUyIdsDVuRGNFr7UpmuhmOURA"}&q=${"@TedShuttlesworthJr"}&type=channel&part=snippet`;

  //   // setLoading(true);
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("====================================", data);
  //       const channelId = data.items[0].id.channelId;
  //       console.log("chanalId", channelId);
  //       console.log("====================================");
  //       const videosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=20&order=date&type=video&key=${"AIzaSyCz-9tzbAEUyIdsDVuRGNFr7UpmuhmOURA"}`;
  //       fetch(videosUrl)
  //         .then((res) => res.json())
  //         .then((data) => {
  //           console.log("====================================");
  //           setChanalDAta(data?.items);
  //           console.log("chaanldata", channelId);
  //           console.log("====================================");
  //         });
  //     });
  // };

  // const fetchDataSecond = () => {
  //   const url = `https://www.googleapis.com/youtube/v3/search?key=${"AIzaSyCz-9tzbAEUyIdsDVuRGNFr7UpmuhmOURA"}&q=${"@MercyCulture"}&type=channel&part=snippet`;

  //   // setLoading(true);
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("====================================");
  //       const channelId = data.items[0].id.channelId;
  //       console.log("chanalId", channelId);
  //       console.log("====================================");
  //       const videosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=20&order=date&type=video&key=${"AIzaSyCz-9tzbAEUyIdsDVuRGNFr7UpmuhmOURA"}`;
  //       fetch(videosUrl)
  //         .then((res) => res.json())
  //         .then((data) => {
  //           console.log("====================================");
  //           setChanalDAtaSecoond(data?.items);
  //           console.log("chaanldata", channelId);
  //           console.log("====================================");
  //         });
  //     });
  // };

  // useEffect(() => {
  //   fetchData();
  //   fetchDataSecond();
  // }, []);

  return (
    <View style={styles.container}>
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
    // <ScreenWrapper
    //   scrollEnabled
    //   headerUnScrollable={() => (
    //     <View style={{ padding: 20 }}>
    //       <Header
    //         hideBackArrow
    //         title="Live Podcast"
    //         subTitle={"Experience Real-Time Podcasting"}
    //         searchIcon
    //         profile
    //       />
    //     </View>
    //   )}
    // >
    //   {/* <YoutubePlayer
    //     height={300}
    //     play={playing}
    //     videoId={"iee2TATGMyI"}
    //     onChangeState={onStateChange}
    //     c
    //   /> */}
    //   {/* <Button title={playing ? "pause" />: "play"} onPress={togglePlaying} /> */}

    //   <CustomText
    //     label="Ongoing Live"
    //     color={COLORS.black}
    //     fontFamily={Fonts.bold}
    //     fontSize={16}
    //     marginBottom={5}
    //   />

    //   <FlatList
    //     data={ChanalDAta}
    //     horizontal
    //     showsHorizontalScrollIndicator={false}
    //     keyExtractor={(_, i) => i.toString()}
    //     renderItem={({ item, index }) => (
    //       <Card
    //         title={item?.snippet?.title}
    //         image={item?.snippet?.thumbnails?.high?.url}
    //         des={"Nightmare Stories"}
    //         author={"by Trio of Norman"}
    //         time={"10 Mins"}
    //         imageHeight={150}
    //         width={280}
    //         marginRight={(2 % index) + 1 !== 0 ? 20 : 0}
    //         live
    //         onPress={false}
    //       />
    //     )}
    //   />

    //   <View style={styles.border} />
    //   <CustomText
    //     label="Coming Soon"
    //     color={COLORS.black}
    //     fontFamily={Fonts.bold}
    //     fontSize={16}
    //     marginBottom={5}
    //   />
    //   <ScrollView horizontal scrollEnabled={false}>
    //     <FlatList
    //       data={ChanalDAtaSecoon}
    //       showsHorizontalScrollIndicator={false}
    //       keyExtractor={(_, i) => i.toString()}
    //       renderItem={({ item, index }) => (
    //         <Card
    //           flex="row"
    //           align="center"
    //           des="TechTalk Live  by Tech Pioneers"
    //           author="Live Apr 4th - 10:00 AM"
    //           imageHeight={80}
    //           imageWith={80}
    //           gap={10}
    //           width="100%"
    //           title={item?.snippet?.title}
    //           image={item?.snippet?.thumbnails?.high?.url}
    //           onPress={false}
    //         />
    //       )}
    //     />
    //   </ScrollView>
    // </ScreenWrapper>
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
