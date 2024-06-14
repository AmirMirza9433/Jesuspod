import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import BackHeader from "../../../components/BackHeader";
import Input from "../../Auth/OptionScreen/molecules/Input";

import { ToastMessage } from "../../../utils/ToastMessage";
import { images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import { Fonts } from "../../../utils/fonts";
import CustomText from "../../../components/CustomText";
import { saveDoc } from "../../../Firebase";

const HelpCenter = ({ navigation }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.users);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const array = [
    {
      id: 1,
      value: userData?.userName,
      name: true,
      editable: true,
    },
    {
      id: 2,
      value: userData?.email,
      email: true,
      editable: true,
    },
    {
      id: 3,
    },
  ];

  const validateMessage = (msg) => {
    if (!msg.trim()) {
      setError("Message is required");
    } else {
      setError("");
    }
  };
  useEffect(() => {
    validateMessage(message);
  }, [message]);

  const updateUser = async () => {
    if (!message.trim()) {
      setError("Message is required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = {
        userName: userData?.userName,
        email: userData?.email,
        userId: userData?.userId,
        message,
      };
      const res = await saveDoc(userData?.userId, data, "helpCenter");
      console.log("=======================res", res);
      setMessage("");
      navigation.goBack();
      ToastMessage("Post Message Success");
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled
      footerUnScrollable={() => (
        <CustomButton
          color={COLORS.white}
          title="Done"
          marginBottom={20}
          onPress={updateUser}
          loading={loading}
          width="90%"
          disabled={!message}
        />
      )}
      headerUnScrollable={() => <BackHeader title="Help Center" />}
    >
      {array.map((item) =>
        item.id == 3 ? (
          <TextInput
            key={item.id}
            value={message}
            onChangeText={(text) => {
              setMessage(text);
              validateMessage(text);
            }}
            multiline
            textAlignVertical="top"
            placeholder="Message..."
            placeholderTextColor={COLORS.red}
            style={[
              styles.input,
              {
                borderColor: error ? COLORS.red : COLORS.input,
                marginBottom: error ? 5 : 20,
              },
            ]}
          />
        ) : (
          <Input
            key={item.id}
            name={item.name}
            email={item.email}
            value={item.value}
            editable={item?.editable}
          />
        )
      )}
      {error && (
        <CustomText
          label={error}
          color={COLORS.red}
          marginBottom={20}
          marginLeft={10}
        />
      )}
    </ScreenWrapper>
  );
};

export default HelpCenter;

const styles = StyleSheet.create({
  userImage: {
    backgroundColor: COLORS.gray,
    borderRadius: 100,
    width: 100,
    height: 100,
    marginTop: 20,
    alignSelf: "center",
    marginBottom: 50,
  },
  input: {
    backgroundColor: COLORS.input,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderWidth: 1,
    height: 150,
    width: "100%",
    fontFamily: Fonts.semiBold,
    color: COLORS.black,
    fontSize: 16,
  },
});
