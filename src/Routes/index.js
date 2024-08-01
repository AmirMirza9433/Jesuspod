import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import React from "react";

//screens
import NewsDetails from "../screens/Main/NewsDetails";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";

const Stack = createNativeStackNavigator();

const Routes = () => {
  const token = useSelector((state) => state.authConfig.token);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      {token ? (
        <>
          <Stack.Screen name="MainStack" component={MainStack} />
          <Stack.Screen name="NewsDetails" component={NewsDetails} />
        </>
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default Routes;
