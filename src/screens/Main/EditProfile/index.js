import { StyleSheet, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import firestore from "@react-native-firebase/firestore";
import React, { useEffect, useState } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import UploadImage from "../../../components/UploadImage";
import BackHeader from "../../../components/BackHeader";
import ImageFast from "../../../components/ImageFast";

import Input from "../../Auth/OptionScreen/molecules/Input";

import { setUser } from "../../../store/reducer/usersSlice";
import { uploadAndGetUrl } from "../../../utils/constants";
import { images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";

const EditProfile = ({ navigation }) => {
  const isPlayer = useSelector((state) => state.player.isPlayer);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const userData = useSelector((state) => state.user.users);
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const array = [
    {
      id: 1,
      value: userName,
      onChange: setUserName,
      name: true,
    },
    {
      id: 2,
      value: email,
      onChange: setEmail,
      email: true,
      editable: true,
    },
  ];

  const updateUser = async () => {
    setLoading(true);
    try {
      const updatedData = {
        ...userData,
        userName,
        userImage,
        email,
      };
      const res = await firestore()
        .collection("users")
        .doc(userData?.userId)
        .update(updatedData);
      console.log("============res", res);
      dispatch(setUser(updatedData));
      navigation.goBack();
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setUserImage(userData?.userImage);
      setUserName(userData?.userName);
      setEmail(userData?.email);
    }
  }, [isFocused]);

  return (
    <ScreenWrapper
      scrollEnabled
      footerUnScrollable={() => (
        <CustomButton
          color={COLORS.white}
          title="Update"
          marginBottom={isPlayer ? 85 : 0}
          onPress={updateUser}
          loading={loading}
          width="90%"
        />
      )}
      headerUnScrollable={() => <BackHeader title="Edit Profile" />}
    >
      <UploadImage
        handleChange={async (res) => {
          const url = await uploadAndGetUrl(res);
          setUserImage(url);
        }}
        renderButton={(res) => (
          <TouchableOpacity onPress={res} activeOpacity={0.6}>
            <ImageFast
              source={userImage ? { uri: userImage } : images.placeholder}
              style={styles.userImage}
            />
          </TouchableOpacity>
        )}
      />
      {array.map((item) => (
        <Input
          key={item.id}
          name={item.name}
          email={item.email}
          value={item.value}
          onChangeText={item.onChange}
          editable={item?.editable}
        />
      ))}
    </ScreenWrapper>
  );
};

export default EditProfile;

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
});
