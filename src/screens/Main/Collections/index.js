import React, { useEffect, useState } from "react";
import { parseString } from "react-native-xml2js";
import moment from "moment";
import axios from "axios";
import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
  View,
} from "react-native";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomText from "../../../components/CustomText";
import ImageFast from "../../../components/ImageFast";

import { COLORS } from "../../../utils/COLORS";
import { Fonts } from "../../../utils/fonts";
import BackHeader from "../../../components/BackHeader";

const Live = ({ navigation }) => {
  const fetchDataFromUrls = async (urls) => {
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      Accept: "application/xml",
    };

    const fetchPromises = urls.map((url) =>
      axios.get(url, { headers }).then((response) => {
        return new Promise((resolve, reject) => {
          parseString(response.data, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result.rss.channel[0].item);
            }
          });
        });
      })
    );

    return Promise.all(fetchPromises);
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urls = [
      "https://morningstarnews.org/feed/",
      "https://www.eternitynews.com.au/feed/",
      "https://www.mnnonline.org/news/feed/",
      // Add more URLs here
    ];

    const getData = async () => {
      setLoading(true);
      try {
        const results = await fetchDataFromUrls(urls);
        setData(results.flat());
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color={COLORS.primaryColor}
        style={{ marginTop: 30 }}
      />
    );
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const renderItem2 = ({ item }) => {
    let imageUrl = null;

    if (item["media:content"] && item["media:content"][0].$.url) {
      imageUrl = item["media:content"][0].$.url;
    } else if (
      item["content:encoded"] &&
      item["content:encoded"][0].match(/<img[^>]+src="([^">]+)"/)
    ) {
      const imgMatch = item["content:encoded"][0].match(
        /<img[^>]+src="([^">]+)"/
      );
      imageUrl = imgMatch ? imgMatch[1] : null;
    }

    const pubDate = item?.pubDate;
    const formattedDate = pubDate
      ? moment(pubDate, "ddd, DD MMM YYYY HH:mm:ss ZZ").format("DD MMM YYYY")
      : "Date not available";

    return (
      <View style={styles.itemContainer2}>
        {imageUrl && (
          <ImageFast
            source={{ uri: imageUrl }}
            style={styles.image2}
            resizeMode="cover"
          />
        )}
        <View style={styles.position}>
          <CustomText
            label={formattedDate}
            fontFamily={Fonts.bold}
            numberOfLines={3}
            marginTop={5}
            fontSize={15}
          />
          <CustomText
            label={item.category[2]}
            fontFamily={Fonts.bold}
            numberOfLines={3}
            marginTop={5}
            fontSize={15}
          />
          <CustomText
            label={item.title}
            fontFamily={Fonts.bold}
            numberOfLines={3}
            width={200}
            fontSize={12}
          />
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    let imageUrl = null;

    if (item["media:content"] && item["media:content"][0].$.url) {
      imageUrl = item["media:content"][0].$.url;
    } else if (
      item["content:encoded"] &&
      item["content:encoded"][0].match(/<img[^>]+src="([^">]+)"/)
    ) {
      const imgMatch = item["content:encoded"][0].match(
        /<img[^>]+src="([^">]+)"/
      );
      imageUrl = imgMatch ? imgMatch[1] : null;
    }

    return (
      <TouchableOpacity
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          width: 200,
          height: 200,
          marginRight: 10,
          borderRadius: 10,
          overflow: "hidden",
        }}
        onPress={() =>
          navigation.navigate("NewsDetails", {
            data: item,
          })
        }
      >
        <ImageFast
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />

        <View style={{ padding: 10 }}>
          <CustomText
            label={item.title}
            fontFamily={Fonts.bold}
            numberOfLines={3}
            color={COLORS.white}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenWrapper
      scrollEnabled
      paddingHorizontal={0.1}
      headerUnScrollable={() => <BackHeader title="News" />}
    >
      <View
        style={{
          paddingLeft: 15,
          borderBottomColor: COLORS.gray,
          borderBottomWidth: 0.6,
          paddingBottom: 20,
        }}
      >
        <CustomText
          label="Latest news >"
          fontFamily={Fonts.bold}
          fontSize={20}
          marginTop={20}
          marginBottom={20}
        />
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={data}
          keyExtractor={(_, i) => i.toString()}
          renderItem={renderItem}
        />
      </View>
      <View style={{ paddingHorizontal: 15 }}>
        <CustomText
          label="World news >"
          fontFamily={Fonts.bold}
          fontSize={20}
          marginTop={20}
          marginBottom={20}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(_, i) => i.toString()}
          renderItem={renderItem2}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  itemContainer2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.gray,
    position: "absolute",
  },

  image2: {
    width: "40%",
    height: 120,
    borderRadius: 8,
  },

  position: {
    width: "55%",
  },
});

export default Live;
