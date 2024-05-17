import { StyleSheet, Text, View } from "react-native";
import React from "react";

const OnBoarding = () => {
  return (
    <View>
      <Text>OnBoarding</Text>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({});

// import React, {useEffect, useRef, useState} from 'react';
// import {useNavigation} from '@react-navigation/native';
// import {useTranslation} from 'react-i18next';
// import {useDispatch} from 'react-redux';
// import {
//   StyleSheet,
//   Dimensions,
//   StatusBar,
//   Animated,
//   Text,
//   View,
//   Platform,
// } from 'react-native';

// import CustomText from '../../../components/CustomText';
// import Button from '../../../components/Button';

// import {setOnBoarding} from '../../../store/reducer/AuthConfig';
// import GlobalStyles from '../../../utils/GlobalStyles';
// import {COLORS} from '../../../utils/config';
// import i18n from '../../../Language/i18n';
// import fonts from '../../../utils/fonts';
// import {
//   onBoarding1,
//   onBoarding2,
//   onBoarding3,
// } from '../../../assets/images/pngs';

// const {width, height} = Dimensions.get('window');

// const OnBoarding = () => {
//   const {t} = useTranslation();
//   const flatListRef = useRef();
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const array = [
//     {
//       id: 1,
//       img: onBoarding1,
//     },
//     {
//       id: 2,
//       img: onBoarding2,
//     },
//     {
//       id: 3,
//       img: onBoarding3,
//     },
//   ];
//   useEffect(() => {
//     flatListRef.current.scrollToIndex({animated: true, index: currentIndex});
//   }, [currentIndex]);
//   const toggleLanguage = async () => {
//     try {
//       if (i18n.language === 'en') {
//         await i18n.changeLanguage('ar');
//       } else {
//         await i18n.changeLanguage('en');
//       }
//     } catch (error) {
//       console.error('Error changing language:', error);
//     }
//   };

//   return (
//     <View style={styles.mainContainer}>
//       <StatusBar
//         backgroundColor={COLORS.white}
//         barStyle={'dark-content'}
//         animated={true}
//       />
//       <Animated.FlatList
//         data={array}
//         showsHorizontalScrollIndicator={false}
//         horizontal
//         getItemLayout={(_, index) => ({
//           length: width,
//           offset: width * index,
//           index,
//         })}
//         onScrollToIndexFailed={info => {
//           console.error('Failed to scroll to index:', info.index);
//         }}
//         ref={flatListRef}
//         onMomentumScrollEnd={e => {
//           const x = e.nativeEvent.contentOffset.x;
//           setCurrentIndex((x / width)?.toFixed(0));
//         }}
//         initialScrollIndex={currentIndex}
//         pagingEnabled
//         renderItem={({item}) => (
//           <Animated.View style={styles.sliderItem}>
//             <Animated.Image
//               style={{height: 350, width: 350}}
//               source={item.img}
//             />
//           </Animated.View>
//         )}
//       />
//       <View style={styles.container}>
//         <CustomText
//           label={
//             currentIndex == 0
//               ? 'onBoarding1'
//               : currentIndex == 1
//               ? 'onBoarding2'
//               : 'onBoarding3'
//           }
//           fontSize={32}
//           marginBottom={15}
//           textAlign="center"
//           lineHeight={40}
//           fontFamily={fonts.medium}
//         />

//         <Animated.View style={styles.dotContainer}>
//           {array?.map((_, i) => (
//             <Animated.View
//               key={i}
//               style={[
//                 styles.dot,
//                 {
//                   backgroundColor:
//                     i == currentIndex ? COLORS.black : COLORS.grey,
//                 },
//               ]}
//             />
//           ))}
//         </Animated.View>
//       </View>
//       <View style={{paddingHorizontal: 20}}>
//         <Button
//           customStyle={{marginBottom: 14}}
//           title="Next"
//           onPress={
//             currentIndex == 2
//               ? async () => {
//                   navigation.replace('OptionScreen');
//                   dispatch(setOnBoarding(true));
//                 }
//               : async () => {
//                   setCurrentIndex(pre => parseInt(pre) + 1);
//                 }
//           }
//         />
//       </View>
//       <View
//         style={{
//           alignItems: 'center',
//           paddingHorizontal: 24,
//           marginBottom: Platform.OS == 'ios' ? 50 : 30,
//         }}>
//         <Text style={[GlobalStyles.font14black, {textAlign: 'center'}]}>
//           {t('byProceedingOnBoardingText')}
//           <Text style={GlobalStyles.font14Purple}>
//             {t('termsOfServiceOnBoardingText')}
//           </Text>
//           <Text>{t('andOnBoardingText')}</Text>
//           <Text style={GlobalStyles.font14Purple}>
//             {t('privacyPolicyOnBoardingText')}
//           </Text>
//         </Text>
//       </View>
//     </View>
//   );
// };
// export default OnBoarding;
// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//   },
//   dot: {
//     height: 6,
//     width: 30,
//     marginHorizontal: 3,
//     borderRadius: 100,
//   },
//   sliderItem: {
//     width: width,
//     height: height / 1.6,
//     backgroundColor: COLORS.white,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingBottom: 60,
//   },
//   container: {
//     width: width,
//     height: height / 2.5,
//     alignItems: 'center',
//     backgroundColor: COLORS.white,
//     position: 'absolute',
//     bottom: 0,
//     paddingHorizontal: 20,
//     padding: 25,
//   },
//   mainImage: {
//     width: '90%',
//     height: '75%',
//     resizeMode: 'contain',
//   },
//   dotContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 30,
//   },
// });
