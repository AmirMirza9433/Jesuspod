import React, { useEffect, useMemo, useState } from "react";
import auth from "@react-native-firebase/auth";
import { useDispatch } from "react-redux";
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Text,
  View,
} from "react-native";

import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";
import CustomText from "../../../../components/CustomText";

import Input from "./Input";

import { ValidateEmail, ValidatePass } from "../../../../utils/constants";
import { setToken } from "../../../../store/reducer/AuthConfig";
import { setUser } from "../../../../store/reducer/usersSlice";
import { ToastMessage } from "../../../../utils/ToastMessage";
import { getSingleDoc } from "../../../../Firebase";
import { COLORS } from "../../../../utils/COLORS";
import { Fonts } from "../../../../utils/fonts";

const LoginModal = ({
  isVisible,
  onDisable,
  setLoginModal,
  setSignupModal,
  setForgotModal,
}) => {
  const dispatch = useDispatch();
  const init = {
    email: "",
    password: "",
  };
  const inits = {
    imageError: "",
    nameError: "",
    emailError: "",
    passwordError: "",
  };
  const [errors, setErrors] = useState(inits);
  const [state, setState] = useState(init);
  const [loading, setLoading] = useState(false);

  const errorCheck = useMemo(() => {
    return () => {
      let newErrors = {};

      if (!state.email) newErrors.emailError = "Please enter email";
      else if (!ValidateEmail(state.email))
        newErrors.emailError = "Please enter valid email";
      if (!state.password) newErrors.passwordError = "Please enter password";
      else if (!ValidatePass(state.password))
        newErrors.passwordError = "Please enter valid password (Abc1234@)";

      setErrors(newErrors);
    };
  }, [state]);

  useEffect(() => {
    errorCheck();
  }, [errorCheck]);
  const array = [
    {
      id: 1,
      value: state.email,
      onChange: (text) => setState({ ...state, email: text }),
      email: true,
      error: errors.emailError,
    },
    {
      id: 2,
      value: state.password,
      onChange: (text) => setState({ ...state, password: text }),
      pass: true,
      error: errors.passwordError,
    },
  ];

  const onSignup = async () => {
    try {
      setLoading(true);
      const res = await auth().signInWithEmailAndPassword(
        state.email?.toLowerCase()?.trim(),
        state.password
      );
      onDisable();

      setTimeout(() => {
        dispatch(setToken(res?.user?.uid));
      }, 500);
      const userData = await getSingleDoc(res?.user?.uid, "users");
      dispatch(setUser(userData));
      setState(init);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/wrong-password") {
        ToastMessage("Please enter valid email & password");
      }
      if (error.code === "auth/invalid-email") {
        ToastMessage("Please enter valid email & password");
      }
      if (error.code === "auth/user-not-found") {
        ToastMessage("User Not Found");
      }
      if (error.code === "auth/network-request-failed") {
        ToastMessage("Request Failed Please try again");
      }
      if (error.code === "auth/too-many-requests") {
        ToastMessage("Too Many Request");
      }
      if (error.code === "auth/invalid-credential") {
        ToastMessage("Invalid Credential");
      }
      console.log("================LoginError", error.code, error.message);
    }
  };
  return (
    <CustomModal isVisible={isVisible} onDisable={onDisable}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <TouchableOpacity
            style={styles.empty}
            activeOpacity={0.6}
            onPress={onDisable}
          />
          <CustomText
            label="Welcome!"
            alignSelf="center"
            fontFamily={Fonts.bold}
            fontSize={36}
          />
          <CustomText
            label="It's great to see you again! Log in now!"
            fontFamily={Fonts.medium}
            fontSize={16}
            alignSelf="center"
            textAlign="center"
            marginBottom={30}
          />
          {array.map((item) => (
            <Input
              key={item.id}
              name={item.name}
              email={item.email}
              pass={item.pass}
              error={item.error}
              onChangeText={item.onChange}
            />
          ))}

          <CustomText
            label="Forgot Password?"
            fontFamily={Fonts.bold}
            marginBottom={30}
            color={COLORS.primaryColor}
            alignSelf="flex-end"
            onPress={() => {
              setLoginModal(false);
              setTimeout(() => {
                setForgotModal(true);
              }, 500);
            }}
          />
          <CustomButton
            color={COLORS.white}
            title="Login"
            marginBottom={10}
            onPress={onSignup}
            loading={loading}
            disabled={!Object.values(errors).every((error) => error === "")}
          />
          <Text style={styles.footerText}>
            Don’t have an account?
            <CustomText
              label=" Sign Up"
              color={COLORS.primaryColor}
              fontFamily={Fonts.bold}
              fontSize={14}
              onPress={() => {
                setLoginModal(false);
                setTimeout(() => {
                  setSignupModal(true);
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

export default LoginModal;

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
