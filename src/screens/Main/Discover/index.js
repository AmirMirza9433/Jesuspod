import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import React, { useState } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import SearchInput from "../../../components/SearchInput";
import Category from "../../../components/Category";
import Header from "../../../components/Header";
import Card from "../../../components/Card";

import { COLORS } from "../../../utils/COLORS";

const screenWidth = Dimensions.get("window").width;
const Discover = () => {
  const status = [
    {
      id: "all",
      name: "Categories",
    },
    {
      id: "pending",
      name: "Top Rank",
    },
    {
      id: "accepted",
      name: "Top Artist",
    },
  ];

  const [selectedStatus, setSelectedStatus] = useState("all");

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Header
          hideBackArrow
          title="Discover"
          subTitle="What are you listening to today?"
          onSettingPress={false}
          profile
        />
      )}
    >
      <SearchInput placeholder="Search" />
      <View style={styles.header}>
        {status.map((item, index) => (
          <Category
            key={index}
            name={item.name}
            selected={selectedStatus === item.id}
            onSelect={() => handleStatusSelect(item.id)}
            isFirst={index === 0}
            isLast={index === status.length - 1}
          />
        ))}
      </View>

      <FlatList
        data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <Card
            title={"Business & Finance"}
            des={"785 podcasts"}
            imageHeight={100}
            marginRight={(2 % index) + 1 !== 0 ? "4%" : 0}
          />
        )}
      />
    </ScreenWrapper>
  );
};

export default Discover;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: COLORS.white,
    borderRadius: 100,
    alignSelf: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "100%",
  },
});
