import { NavigationContainer } from "@react-navigation/native";
import { PersistGate } from "redux-persist/integration/react";
import messaging from "@react-native-firebase/messaging";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";

import Routes from "./src/Routes";

import Notification from "./Notification";

import { getToken } from "./src/utils/constants";
import { persistor, store } from "./src/store";
import { COLORS } from "./src/utils/COLORS";
import { MenuProvider } from "react-native-popup-menu";
import NetworkIssue from "./src/components/NetworkIssue";

const App = () => {
  const [isVisible, setVisible] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      setNotification({
        title: remoteMessage?.notification?.title,
        body: remoteMessage?.notification?.body,
      });
      setVisible(true);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setVisible(false);
      }, 4000);
    }
  }, [isVisible]);
  useEffect(() => {
    getToken();
  }, []);

  return (
    <MenuProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
            <NetworkIssue>
              <Routes />
            </NetworkIssue>
            {isVisible && (
              <Notification
                isVisible={isVisible}
                title={notification?.title}
                desc={notification?.body}
              />
            )}
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </MenuProvider>
  );
};

export default App;
