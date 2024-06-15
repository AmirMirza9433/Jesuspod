// import React, { useEffect, useState } from "react";
// import { FlatList, View } from "react-native";

// import ScreenWrapper from "../../../components/ScreenWrapper";
// import SearchInput from "../../../components/SearchInput";
// import Header from "../../../components/Header";
// import Card from "../../../components/Card";

// import { getAllDocs } from "../../../Firebase";

// const Discover = () => {
//   const [loading, setLoading] = useState(false);
//   const [channels, setChannels] = useState([]);
//   const getChannels = async () => {
//     setLoading(true);
//     try {
//       const res = await getAllDocs("chanals");
//       setChannels(res?.[0]?.podcasts);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       console.log("=========error:", error);
//     }
//   };
//   useEffect(() => {
//     getChannels();
//   }, []);
//   return (
//     <ScreenWrapper
//       headerUnScrollable={() => (
//         <View style={{ padding: 20 }}>
//           <Header
//             hideBackArrow
//             title="Discover"
//             subTitle="What are you listening to today?"
//             profile
//           />
//           <SearchInput placeholder="Search" />
//         </View>
//       )}
//     >
//       <FlatList
//         data={channels}
//         showsHorizontalScrollIndicator={false}
//         numColumns={2}
//         showsVerticalScrollIndicator={false}
//         keyExtractor={(_, i) => i.toString()}
//         renderItem={({ item, index }) => (
//           <Card
//             imageHeight={170}
//             marginRight={(2 % index) + 1 !== 0 ? "4%" : 0}
//             image={item.image}
//             item={item}
//             title={item.title}
//           />
//         )}
//       />
//     </ScreenWrapper>
//   );
// };

// export default Discover;
// // import { FlatList, RefreshControl, View } from "react-native";

import { FlatList, RefreshControl, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import { COLORS } from "../../../utils/COLORS";
import CustomText from "../../../components/CustomText";
import CatCard from "../../../components/CatCard";
import { getCategories } from "../../../Firebase";
import { useNavigation } from "@react-navigation/native";
import SearchInput from "../../../components/SearchInput";

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

  // const filteredChannels = Cat.filter((channel) =>
  //   channel.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

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
  }, [""]);

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <>
          <View style={{ padding: 20, paddingBottom: 0 }}>
            <Header
              title="Search"
              subTitle="Discover your podcast collections"
            />
            <SearchInput
              placeholder="Search"
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
        </>
      )}
    >
      <View style={{ height: 20 }} />
      <FlatList
        data={filteredData || Cat}
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
