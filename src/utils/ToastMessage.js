import Toast from "react-native-simple-toast";

export const ToastMessage = (message) => {
  if (typeof message !== "string") {
    return console.log(
      "============ToastMessageError",
      JSON.stringify(message)
    );
  } else {
    Toast.show(message);
  }
};
