import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import ImageFast from "../../../components/ImageFast";

import SignupModal from "./molecules/SignupModal";
import ForgotModal from "./molecules/ForgotModal";
import LoginModal from "./molecules/LoginModal";

import { getToken } from "../../../utils/constants";
import { images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import { Fonts } from "../../../utils/fonts";
import { useState } from "react";

const OptionScreen = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [forgotModal, setForgotModal] = useState(false);
  useEffect(() => {
    getToken();
  }, []);
  return (
    <ScreenWrapper
      statusBarColor={
        loginModal || signupModal ? COLORS.primaryColor : COLORS.white
      }
    >
      <View style={styles.container}>
        <View style={{ flex: 1 }} />
        <LoginModal
          isVisible={loginModal}
          onDisable={() => setLoginModal(false)}
          setLoginModal={setLoginModal}
          setSignupModal={setSignupModal}
          setForgotModal={setForgotModal}
        />
        <SignupModal
          isVisible={signupModal}
          onDisable={() => setSignupModal(false)}
          setLoginModal={setLoginModal}
          setSignupModal={setSignupModal}
        />
        <ForgotModal
          isVisible={forgotModal}
          onDisable={() => setForgotModal(false)}
          setLoginModal={setLoginModal}
          setForgotModal={setForgotModal}
        />
        <ImageFast
          source={images.appLogo}
          style={styles.logo}
          resizeMode="contain"
        />
        <CustomText
          label="Let the Stories Begin."
          fontFamily={Fonts.medium}
          fontSize={14}
          marginTop={5}
        />
        <CustomButton
          backgroundColor="transparent"
          color={COLORS.black}
          title="Continue with Google"
          borderColor={COLORS.primaryColor}
          borderWidth={2}
          iconname="google"
          iconfamily="AntDesign"
          iconColor={COLORS.white}
          icon={true}
          marginTop={40}
        />

        <View style={styles.divider}>
          <View style={styles.dividerLines} />
          <CustomText label={"Or"} fontFamily={Fonts.bold} fontSize={14} />
          <View style={styles.dividerLines} />
        </View>

        <CustomButton
          color={COLORS.white}
          title="Sign In with Email"
          marginTop={20}
          marginBottom={10}
          onPress={() => setLoginModal(true)}
        />
        <Text style={styles.footerText}>
          Don’t have an account?
          <CustomText
            label=" Sign Up"
            color={COLORS.primaryColor}
            fontFamily={Fonts.bold}
            fontSize={14}
            onPress={() => setSignupModal(true)}
            marginBottom={Platform.OS == "android" ? -8 : -2}
          />
        </Text>
        <View style={{ flex: 1 }} />
        <Text style={styles.footerText}>
          By continuing, I agree to
          <Text style={{ fontFamily: Fonts.bold, color: COLORS.primaryColor }}>
            {" Terms of Conditions"}
          </Text>
          {" and "}
          <Text style={{ fontFamily: Fonts.bold, color: COLORS.primaryColor }}>
            Privacy of Policy
          </Text>
        </Text>
      </View>
    </ScreenWrapper>
  );
};

export default OptionScreen;

const styles = StyleSheet.create({
  logo: {
    width: 130,
    height: 130,
    borderRadius: 5,
    marginTop: 50,
  },

  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginTop: 20,
  },
  dividerLines: {
    backgroundColor: COLORS.gray,
    height: 2,
    width: 120,
  },
  footerText: {
    textAlign: "center",
    fontFamily: Fonts.regular,
    color: COLORS.black,
    marginBottom: 30,
  },
});
