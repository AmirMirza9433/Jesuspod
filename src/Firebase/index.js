import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export const saveDoc = (uid, data, collection) => {
  try {
    return firestore().collection(collection).doc(uid).set(data);
  } catch (error) {
    console.log("error saveData", error);
    throw error;
  }
};
export const deleteSingleDoc = async (collection, uid) => {
  try {
    const res = await firestore().collection(collection).doc(uid).delete();
    return res;
  } catch (error) {
    console.error("Error deleting user document:", error);
  }
};

export const getSingleDoc = async (id, collection) => {
  try {
    const response = await firestore().collection(collection).doc(id).get();
    return response.data();
  } catch (error) {
    console.log("=== getSingleDoc error", error);
    throw error;
  }
};

export const getAllDocs = async (collection) => {
  try {
    const snapshot = await firestore().collection(collection).get();
    const tempArray = snapshot.docs.map((doc) => doc.data());
    return tempArray;
  } catch (error) {
    console.log("=== getAllDoc error", error);
    throw error;
  }
};
export const getDocsById = (collection, id) => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firestore()
      .collection(collection)
      .where(...id)
      .orderBy("createdAdd", "desc")
      .onSnapshot(
        (chatsSnapshot) => {
          const detectorDataArray = [];
          chatsSnapshot.forEach((chatSnapshot) => {
            const detectorData = chatSnapshot.data();
            detectorDataArray.push(detectorData);
          });
          resolve(detectorDataArray);
        },
        (error) => {
          console.error("Error:", error);
          reject(error);
        }
      );
    return unsubscribe;
  });
};

export const updateCollection = async (collection, uid, data) => {
  try {
    const docRef = firestore().collection(collection).doc(uid);
    const res = await docRef.update(data);
    return res;
  } catch (error) {
    console.error("Update error:", error);
    throw error;
  }
};

export const deleteUser = async (uid) => {
  try {
    const res = await auth().deleteUser(uid);
    return res;
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

export const checkUserExist = async (email) => {
  try {
    const user = await auth().fetchSignInMethodsForEmail(
      email?.trim()?.toLowerCase()
    );
    return user.length > 0;
  } catch (error) {
    console.error("Error checking user existence========>", error);
    return false;
  }
};
