import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import ScreenWrapper from "../../../components/ScreenWrapper";
import SearchInput from "../../../components/SearchInput";
import Header from "../../../components/Header";
import Card from "../../../components/Card";

import { getAllDocs } from "../../../Firebase";

const SeeAll = () => {
  const [loading, setLoading] = useState(false);
  const [channels, setChannels] = useState([]);
  const getChannels = async () => {
    setLoading(true);
    try {
      const res = await getAllDocs("chanals");
      setChannels(res?.[0]?.podcasts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("=========error:", error);
    }
  };
  useEffect(() => {
    getChannels();
  }, []);
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <View style={{ padding: 20 }}>
          <Header
            hideBackArrow
            title="All Chanals"
            subTitle="What are you listening to today?"
            profile
          />
          <SearchInput placeholder="Search" />
        </View>
      )}
    >
      <FlatList
        data={channels}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <Card
            imageHeight={100}
            marginRight={(2 % index) + 1 !== 0 ? "4%" : 0}
            image={item.image}
            item={item}
            title={item.title}
          />
        )}
      />
    </ScreenWrapper>
  );
};

export default SeeAll;
