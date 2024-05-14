import { parseString } from "react-native-xml2js";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import axios from "axios";

import { setChannels, setMainLoading } from "../store/reducer/usersSlice";
const BrainBox = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPodcasts = async () => {
      dispatch(setMainLoading(true));
      try {
        const urls = [
          "https://feed.podbean.com/riverchurchpodcast/feed.xml",
          "https://feed.podbean.com/allnationschurchdublin/feed.xml",
          "https://anchor.fm/s/682886c/podcast/rss",
          "https://mercyculture.podbean.com/feed.xml",
          "https://freshstartaz.podbean.com/feed.xml",
          "http://feeds.feedburner.com/LineOfFireRadio",
          "https://feeds.simplecast.com/WWr9c8Mo",
          "https://DavidHernandezMinistries.podbean.com/feed.xml",
          "https://copelandnetworkaudiopodcast.libsyn.com/rss",
          "https://www.bennyhinn.org/feed/benny-hinn-ministries-fresh-manna/",
          // "https://copelandnetworkaudiopodcast.libsyn.com/rss",
          "https://feeds.castos.com/0r98",
          "http://bwm.downloadsvr.com/podcast_audio.xml",
          "http://www.jerrysavelle.org/rssfeeds/tvaudio.xml",
          "https://anchor.fm/s/6c7c87f8/podcast/rss",
          "https://feed.podbean.com/wdbministries/feed.xml",
          "https://anchor.fm/s/718ad498/podcast/rss",
          "https://careynieuwhof.libsyn.com/rss",
          "https://feeds.simplecast.com/atgtihd0",
          "https://feeds.soundcloud.com/users/soundcloud:users:409240443/sounds.rss",
          "https://h3leadership.libsyn.com/rss",
          "https://freedailybiblestudy.com/feed/podcast/",
          "https://www.omnycontent.com/d/playlist/5e27a451-e6e6-4c51-aa03-a7370003783c/7608f244-e104-4c65-a371-af5b00f8e73d/702576b7-8f9f-42e2-b078-af5b00f90f90/podcast.rss",
          "https://omny.fm/shows/chapter-a-day-audio-bible/playlists/podcast.rss",
          "https://dailybiblereading.libsyn.com/rss",
          "https://anchor.fm/s/ecddbdb8/podcast/rss",
          // "https://momsinprayer.libsyn.com/rss",
        ];

        const responses = await Promise.all(urls.map((url) => axios.get(url)));

        const channelsData = await Promise.all(
          responses.map((response) => {
            const xmlData = response.data;
            return new Promise((resolve, reject) => {
              parseString(xmlData, (err, res) => {
                if (err) {
                  reject(err);
                } else {
                  resolve({
                    image:
                      res?.rss?.channel?.[0]?.["itunes:image"]?.[0]?.$.href,
                    items: res?.rss?.channel?.[0]?.item,
                    title: res?.rss?.channel?.[0]?.title,
                  });
                }
              });
            });
          })
        );

        dispatch(setChannels(channelsData));
        dispatch(setMainLoading(false));
      } catch (error) {
        dispatch(setMainLoading(false));
        console.error("Error fetching data:", error);
      }
    };

    fetchPodcasts();
  }, []);

  return <View style={styles.mainContainer}>{children}</View>;
};

export default BrainBox;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
