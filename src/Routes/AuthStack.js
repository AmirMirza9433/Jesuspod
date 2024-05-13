import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import React from "react";

//screens
import OptionScreen from "../screens/Auth/OptionScreen";
import OnBoarding from "../screens/Auth/OnBoarding";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const isOnBoarding = useSelector((state) => state.authConfig.isOnBoarding);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      {isOnBoarding ? (
        <>
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
          <Stack.Screen name="OptionScreen" component={OptionScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="OptionScreen" component={OptionScreen} />
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthStack;
