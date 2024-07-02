import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";

import ScreenWrapper from "../../../components/ScreenWrapper";
import SearchInput from "../../../components/SearchInput";
import Header from "../../../components/Header";
import Card from "../../../components/Card";

import { getAllDocs } from "../../../Firebase";
import { COLORS } from "../../../utils/COLORS";

const SeeAll = () => {
  const [loading, setLoading] = useState(false);
  const [channels, setChannels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getChannels = async () => {
    setLoading(true);
    try {
      const res = await getAllDocs("Newchannels");
      setChannels(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("=========error:", error);
    }
  };
  useEffect(() => {
    getChannels();
  }, []);

  const filteredChannels = channels.filter((channel) =>
    channel.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <View style={{ padding: 20 }}>
          <Header
            hideBackArrow
            title="All Podcasts"
            subTitle="What are you listening to today?"
            profile
          />
          <SearchInput
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}
    >
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getChannels}
            colors={[COLORS.primaryColor]}
          />
        }
        data={filteredChannels}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <Card
            imageHeight={180}
            marginRight={(2 % index) + 1 !== 0 ? "4%" : 0}
            image={item.imageUrl}
            item={item}
            title={item.title}
          />
        )}
      />
    </ScreenWrapper>
  );
};

export default SeeAll;
