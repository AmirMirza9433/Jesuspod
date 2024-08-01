import { FlatList, RefreshControl, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import SearchInput from "../../../components/SearchInput";
import CatCard from "../../../components/CatCard";
import Header from "../../../components/Header";

import { getCategories } from "../../../Firebase";
import { COLORS } from "../../../utils/COLORS";

const Discover = () => {
  const navigation = useNavigation();
  const [Cat, setCat] = useState([]);
  const [referesh, setrefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState("");

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filtered = Cat.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(Cat);
    }
  };

  const getcat = async () => {
    setrefresh(true);
    try {
      const res = await getCategories();
      setCat(res);
      setrefresh(false);
    } catch (error) {
      console.log(error);
      setrefresh(false);
    }
  };

  const backgroundImages = [
    require("../../../assets/images/CatImages/31.png"),
    require("../../../assets/images/CatImages/13.png"),
    require("../../../assets/images/CatImages/16.png"),
    require("../../../assets/images/CatImages/18.png"),
    require("../../../assets/images/CatImages/21.png"),
    require("../../../assets/images/CatImages/2.png"),
  ];

  useEffect(() => {
    getcat();
  }, []);

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <View style={{ padding: 20, paddingBottom: 0 }}>
          <Header title="Search" subTitle="Discover your podcast collections" />
          <SearchInput
            placeholder="Search"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      )}
    >
      <View style={{ height: 20 }} />
      <FlatList
        data={filteredData || Cat}
        contentContainerStyle={{ paddingBottom: 100 }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        refreshControl={
          <RefreshControl
            refreshing={referesh}
            onRefresh={getcat}
            colors={[COLORS.primaryColor]}
          />
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <CatCard
            onPress={() =>
              navigation.navigate("CategoryPodcast", { data: item })
            }
            title={item?.name}
            backgroundImage={backgroundImages[index % 6]}
          />
        )}
      />
    </ScreenWrapper>
  );
};

export default Discover;
