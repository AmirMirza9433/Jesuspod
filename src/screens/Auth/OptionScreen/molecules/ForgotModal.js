import React, { useEffect, useMemo, useState } from "react";
import auth from "@react-native-firebase/auth";
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Keyboard,
  Text,
  View,
} from "react-native";

import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";
import CustomText from "../../../../components/CustomText";

import Input from "./Input";

import { ToastMessage } from "../../../../utils/ToastMessage";
import { ValidateEmail } from "../../../../utils/constants";
import { COLORS } from "../../../../utils/COLORS";
import { Fonts } from "../../../../utils/fonts";

const ForgotModal = ({
  isVisible,
  onDisable,
  setLoginModal,
  setForgotModal,
}) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const errorCheck = useMemo(() => {
    return () => {
      let newErrors = "";
      if (!email) newErrors = "Please enter email";
      else if (!ValidateEmail(email)) newErrors = "Please enter valid email";
      setEmailError(newErrors);
    };
  }, [email]);

  useEffect(() => {
    errorCheck();
  }, [errorCheck]);

  const onContinue = async () => {
    try {
      setLoading(true);
      await auth().sendPasswordResetEmail(email?.toLowerCase()?.trim());
      ToastMessage("A password reset link send to your email");
      onDisable();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.code == "auth/user-not-found") {
        console.log("============forgotError", error.code, error.message);
        ToastMessage("No account found");
      }
    }
  };
  return (
    <CustomModal isVisible={isVisible} onDisable={onDisable}>
      <ScrollView>
        <View
          style={[
            styles.mainContainer,
            isKeyboardVisible ? { height: 1000 } : {},
          ]}
        >
          <TouchableOpacity
            style={styles.empty}
            activeOpacity={0.6}
            onPress={onDisable}
          />
          <CustomText
            label="Forgot Password"
            alignSelf="center"
            fontFamily={Fonts.bold}
            fontSize={25}
            marginBottom={30}
          />

          <Input email error={emailError} onChangeText={setEmail} />

          <CustomButton
            color={COLORS.white}
            title="Continue"
            marginBottom={10}
            onPress={onContinue}
            loading={loading}
            disabled={emailError ? true : false}
          />
          <Text style={styles.footerText}>
            Already have an account?
            <CustomText
              label=" Login"
              color={COLORS.primaryColor}
              fontFamily={Fonts.bold}
              fontSize={14}
              onPress={() => {
                setForgotModal(false);
                setTimeout(() => {
                  setLoginModal(true);
                }, 500);
              }}
              marginBottom={Platform.OS == "android" ? -8 : -2}
            />
          </Text>

          <Text style={[styles.footerText, { marginTop: 30 }]}>
            By continuing, I agree to
            <Text
              style={{ fontFamily: Fonts.bold, color: COLORS.primaryColor }}
            >
              {" Terms of Conditions"}
            </Text>
            {" and "}
            <Text
              style={{ fontFamily: Fonts.bold, color: COLORS.primaryColor }}
            >
              Privacy of Policy
            </Text>
          </Text>
        </View>
      </ScrollView>
    </CustomModal>
  );
};

export default ForgotModal;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
    width: "100%",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    padding: 20,
  },
  empty: {
    width: 100,
    height: 6,
    borderRadius: 100,
    backgroundColor: COLORS.primaryColor,
    marginBottom: 20,
    alignSelf: "center",
  },
  footerText: {
    textAlign: "center",
    fontFamily: Fonts.regular,
    color: COLORS.black,
    marginBottom: 10,
  },
});
