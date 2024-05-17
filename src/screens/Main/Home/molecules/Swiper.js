import { Animated, Dimensions, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { COLORS } from "../../../../utils/COLORS";
import TopCart from "./TopCart";

const { width } = Dimensions.get("window");
const Swiper = ({ array }) => {
  const flatListRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    flatListRef.current.scrollToIndex({ animated: true, index: currentIndex });
  }, [currentIndex]);
  return (
    <Animated.FlatList
      data={array}
      showsHorizontalScrollIndicator={false}
      horizontal
      getItemLayout={(_, index) => ({
        length: width,
        offset: width * index,
        index,
      })}
      onScrollToIndexFailed={(info) => {
        console.error("Failed to scroll to index:", info.index);
      }}
      ref={flatListRef}
      onMomentumScrollEnd={(e) => {
        const x = e.nativeEvent.contentOffset.x;
        setCurrentIndex((x / width)?.toFixed(0));
      }}
      initialScrollIndex={currentIndex}
      pagingEnabled
      renderItem={({ item }) => (
        <Animated.View style={styles.sliderItem}>
          <TopCart item={item} />
        </Animated.View>
      )}
    />
  );
};

export default Swiper;

const styles = StyleSheet.create({
  sliderItem: {
    width: width,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 60,
  },
});
