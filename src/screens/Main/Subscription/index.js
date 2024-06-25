import { ActivityIndicator, FlatList, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ScreenWrapper from "../../../components/ScreenWrapper";
import BackHeader from "../../../components/BackHeader";
import Card from "../../../components/Card";

import { getDocWithQuery } from "../../../Firebase";
import { COLORS } from "../../../utils/COLORS";

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
        paddingHorizontal={15}
        headerUnScrollable={() => <BackHeader title="Subscription" />}
      >
        {loading ? (
          <View style={{ marginTop: 30 }}>
            <ActivityIndicator size={50} color={COLORS.primaryColor} />
          </View>
        ) : (
          <FlatList
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
        )}
      </ScreenWrapper>
    </>
  );
};

export default Subscription;
