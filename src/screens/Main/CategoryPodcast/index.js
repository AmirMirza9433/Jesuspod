import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import ScreenWrapper from "../../../components/ScreenWrapper";
import SearchInput from "../../../components/SearchInput";
import Header from "../../../components/Header";
import Card from "../../../components/Card";

import { getAllDocs, getChannelsByCategoryName } from "../../../Firebase";
import BackHeader from "../../../components/BackHeader";
import { RefreshControl } from "react-native";
import { COLORS } from "../../../utils/COLORS";

const CategoryPodcast = ({ route }) => {
  const data = route?.params?.data;
  const [loading, setLoading] = useState(false);
  const [channels, setChannels] = useState([]);
  const getChannels = async () => {
    setLoading(true);
    try {
      const channelsData = await getChannelsByCategoryName(data?.name);
      setChannels(channelsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching channels:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getChannels();
  }, [data?.name]);

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <View>
          <BackHeader title={data?.name} />
        </View>
      )}
    >
      <FlatList
        data={channels}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getChannels}
            colors={[COLORS.primaryColor]}
          />
        }
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <Card
            typeofPod={data?.name}
            imageHeight={180}
            marginRight={(2 % index) + 1 !== 0 ? "4%" : 0}
            image={item?.imageUrl}
            item={item}
            title={item.title}
          />
        )}
      />
    </ScreenWrapper>
  );
};

export default CategoryPodcast;
