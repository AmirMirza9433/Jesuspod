import { FlatList, StyleSheet, View } from "react-native";
import React, { useState } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import Card from "../../../components/Card";
import Tab from "../../../components/Tab";

import { COLORS } from "../../../utils/COLORS";

const Collections = () => {
  const [tab, setTab] = useState("Playlist");

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <Header
          hideBackArrow
          title="Collection"
          subTitle={"Discover your podcast collections"}
          profile
          searchIcon
        />
      )}
    >
      <View style={styles.header}>
        <Tab
          array={["Playlist", "Favorite", "Download"]}
          value={tab}
          setVale={setTab}
        />
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
