import { FlatList, RefreshControl } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ScreenWrapper from "../../../components/ScreenWrapper";
import BackHeader from "../../../components/BackHeader";
import Card from "../../../components/Card";

import { COLORS } from "../../../utils/COLORS";
import { getDocWithQuery } from "../../../Firebase";

const Subscription = () => {
  const isFocused = useIsFocused();
  const token = useSelector((state) => state.authConfig.token);

  const [loading, setLoading] = useState(false);
  const [channels, setChannels] = useState([]);

  const getChannels = async () => {
    setLoading(true);
    try {
      const res = await getDocWithQuery("Newchannels", [
        "sub",
        "array-contains",
        token,
      ]);
      console.log("====rs", res);
      setChannels(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("=========error:", error);
    }
  };

  useEffect(() => {
    getChannels();
  }, [isFocused]);

  return (
    <>
      <ScreenWrapper
        scrollEnabled
        paddingHorizontal={15}
        headerUnScrollable={() => <BackHeader title="Subscription" />}
      >
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={getChannels}
              colors={[COLORS.primaryColor]}
            />
          }
          data={channels}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <Card
              imageHeight={183}
              width="100%"
              image={item?.imageUrl}
              marginRight={10}
              item={item}
              title={item?.title}
            />
          )}
        />
      </ScreenWrapper>
    </>
  );
};

export default Subscription;
