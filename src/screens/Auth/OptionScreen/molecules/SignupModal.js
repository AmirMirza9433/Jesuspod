import React, { useEffect, useMemo, useState } from "react";
import firestore from "@react-native-firebase/firestore";
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
import UploadImage from "../../../../components/UploadImage";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";

import Input from "./Input";

import { setToken } from "../../../../store/reducer/AuthConfig";
import { setUser } from "../../../../store/reducer/usersSlice";
import { ToastMessage } from "../../../../utils/ToastMessage";
import { images } from "../../../../assets/images";
import { COLORS } from "../../../../utils/COLORS";
import { Fonts } from "../../../../utils/fonts";
import {
  ValidateEmail,
  ValidatePass,
  uploadAndGetUrl,
} from "../../../../utils/constants";

const SignupModal = ({
  setSignupModal,
  setLoginModal,
  isVisible,
  onDisable,
}) => {
  const dispatch = useDispatch();
  const init = {
    userImage: "",
    userName: "",
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
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const errorCheck = useMemo(() => {
    return () => {
      let newErrors = {};
      if (!state.userImage)
        newErrors.imageError = "Please select profile image";
      if (!state.userName) newErrors.nameError = "Please enter user name";
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
      value: state.userName,
      onChange: (text) => setState({ ...state, userName: text }),
      name: true,
      error: errors.nameError,
    },
    {
      id: 2,
      value: state.email,
      onChange: (text) => setState({ ...state, email: text }),
      email: true,
      error: errors.emailError,
    },
    {
      id: 3,
      value: state.password,
      onChange: (text) => setState({ ...state, password: text }),
      pass: true,
      error: errors.passwordError,
    },
  ];

  const onSignup = async () => {
    try {
      setLoading(true);
      const res = await auth().createUserWithEmailAndPassword(
        state?.email,
        state?.password
      );
      console.log("=====res", res);
      await firestore()
        .collection("users")
        .doc(res?.user?.uid)
        .set({
          ...{
            userImage: state.userImage,
            userName: state.userName,
            email: state.email,
          },
          userId: res?.user?.uid,
        });
      dispatch(setToken(res?.user?.uid));
      dispatch(setUser(state));
      setState(init);
      onDisable();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/email-already-in-use") {
        ToastMessage("Email already in use by another account");
      }

      if (error.code === "auth/too-many-requests") {
        ToastMessage("Too many request");
      }
      if (error.code === "auth/network-request-failed") {
        ToastMessage("Request failed please try again");
      }
      console.log("================SignupError", error.code, error.message);
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
          <UploadImage
            handleChange={async (res) => {
              setImageLoading(true);
              const url = await uploadAndGetUrl(res);
              setImageLoading(false);
              setState({ ...state, userImage: url });
            }}
            renderButton={(onPress) => (
              <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
                <ImageFast
                  loading={imageLoading}
                  source={
                    state.userImage
                      ? { uri: state.userImage }
                      : images.placeholder
                  }
                  style={[
                    styles.profile,
                    errors.imageError
                      ? {
                          borderWidth: 1,
                          borderColor: COLORS.red,
                          marginBottom: 5,
                        }
                      : { marginBottom: 30 },
                  ]}
                />
              </TouchableOpacity>
            )}
          />
          {errors.imageError ? (
            <CustomText
              label={errors.imageError}
              color={COLORS.red}
              alignSelf="center"
              marginBottom={30}
            />
          ) : null}
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

          <CustomButton
            color={COLORS.white}
            title="Sign Up"
            marginBottom={10}
            onPress={onSignup}
            loading={loading}
            disabled={!Object.values(errors).every((error) => error === "")}
          />
          <Text style={styles.footerText}>
            Already have an account?
            <CustomText
              label=" Login"
              color={COLORS.primaryColor}
              fontFamily={Fonts.bold}
              fontSize={14}
              onPress={() => {
                setSignupModal(false);
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

export default SignupModal;

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
    marginBottom: 40,
    alignSelf: "center",
  },
  footerText: {
    textAlign: "center",
    fontFamily: Fonts.regular,
    color: COLORS.black,
    marginBottom: 10,
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: "center",
  },
});
