import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import React, { useState } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import Category from "../../../components/Category";
import Header from "../../../components/Header";
import Card from "../../../components/Card";

import { COLORS } from "../../../utils/COLORS";

const screenWidth = Dimensions.get("window").width;
const imageWidth = (screenWidth - 25 * 3) / 2; // Subtracting margins
const Collections = () => {
  const status = [
    {
      id: "all",
      name: "Playlist",
    },
    {
      id: "pending",
      name: "Favorite",
    },
    {
      id: "accepted",
      name: "Download",
    },
  ];

  const [selectedStatus, setSelectedStatus] = useState("all");

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <Header
          hideBackArrow
          title="Collection"
          subTitle={"Discover your podcast collections"}
          onSettingPress={false}
          profile
          searchIcon
        />
      )}
    >
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
        numColumns={2} // Set the number of columns
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <Card
            heading={"Thriller & Horror"}
            title={"EPS 25 | Night of Terror"}
            des={"Nightmare Stories"}
            author={"by Trio of Norman"}
            time={"10 Mins"}
            imageHeight={175}
            width="48%"
            marginRight={(2 % index) + 1 !== 0 ? "4%" : 0}
          />
        )}
      />
    </ScreenWrapper>
  );
};

export default Collections;

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
