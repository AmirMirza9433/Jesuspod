import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { parseString } from "react-native-xml2js";
import { useSelector } from "react-redux";
import CustomText from "../../../components/CustomText";
import { Fonts } from "../../../utils/fonts";
import ScreenWrapper from "../../../components/ScreenWrapper";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

const Live = () => {
  const navigation = useNavigation();
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

  const isPlayer = useSelector((state) => state.player.isPlayer);

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
        setData(results.flat()); // Flatten the array of arrays
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const renderItem2 = ({ item }) => {
    let imageUrl = null;

    // Check if the image is in the <media:content> tag
    if (item["media:content"] && item["media:content"][0].$.url) {
      imageUrl = item["media:content"][0].$.url;
    }
    // Check if the image is in the <content:encoded> tag
    else if (
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
          <Image
            source={{ uri: imageUrl }}
            style={styles.image2}
            resizeMode="cover"
          />
        )}
        <View>
          <CustomText
            label={formattedDate}
            fontFamily={Fonts.bold}
            numberOfLines={3}
            color={"black"}
            marginTop={5}
            fontSize={15}
          />
          <CustomText
            label={item.category[2]}
            fontFamily={Fonts.bold}
            numberOfLines={3}
            color={"black"}
            marginTop={5}
            fontSize={15}
          />
          <CustomText
            label={item.title}
            fontFamily={Fonts.bold}
            numberOfLines={3}
            width={200}
            color={"black"}
            fontSize={12}
          />
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    let imageUrl = null;

    // Check if the image is in the <media:content> tag
    if (item["media:content"] && item["media:content"][0].$.url) {
      imageUrl = item["media:content"][0].$.url;
    }
    // Check if the image is in the <content:encoded> tag
    else if (
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
        onPress={() =>
          navigation.navigate("NewsDetails", {
            data: item,
          })
        }
        style={styles.itemContainer}
      >
        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <View style={styles.positon}>
          <CustomText
            label={item.title}
            fontFamily={Fonts.bold}
            numberOfLines={3}
            color={"white"}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenWrapper scrollEnabled>
      <CustomText
        label={"News"}
        fontFamily={Fonts.bold}
        fontSize={25}
        marginTop={20}
      />

      <CustomText
        label={"Latest news >"}
        fontFamily={Fonts.bold}
        fontSize={20}
        marginTop={20}
      />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />

      <CustomText
        label={"World news >"}
        fontFamily={Fonts.bold}
        fontSize={20}
        marginTop={10}
        marginBottom={10}
      />

      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem2}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    // marginBottom: 20,
    // paddingLeft: 10,
    // gap: 10,
  },
  itemContainer2: {
    flexDirection: "row",
    gap: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
    borderRadius: 8,
    position: "relative",
  },

  image2: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 8,
    position: "relative",
  },

  positon: {
    position: "absolute",
    bottom: 40,
    width: 200,
    marginLeft: 15,
  },
});

export default Live;
