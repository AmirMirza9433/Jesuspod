import { Text } from "react-native";
import React from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import BackHeader from "../../../components/BackHeader";

import { COLORS } from "../../../utils/COLORS";
import { Fonts } from "../../../utils/fonts";

const PrivacyPolicy = () => {
  return (
    <ScreenWrapper
      scrollEnabled
      paddingBottom={30}
      headerUnScrollable={() => <BackHeader title="Privacy Policy" />}
    >
      <Text
        style={{
          color: COLORS.black,
          fontFamily: Fonts.bold,
          marginBottom: 10,
        }}
      >
        **1.
      </Text>
      <Text
        style={{
          color: COLORS.black,
          fontFamily: Fonts.regular,
          marginBottom: 10,
        }}
      >
        Introduction** Welcome to JesusPod ("we", "our", "us"). JesusPod is
        committed to protecting your privacy and ensuring you have a positive
        experience on our app. This Privacy Policy outlines our practices
        regarding the collection, use, and sharing of your personal information.
      </Text>

      <Text
        style={{
          color: COLORS.black,
          fontFamily: Fonts.bold,
          marginBottom: 10,
        }}
      >
        **2.
      </Text>
      <Text
        style={{
          color: COLORS.black,
          fontFamily: Fonts.regular,
          marginBottom: 10,
        }}
      >
        How We Use Your Information** - To provide and maintain our services. -
        To improve and personalize your experience. - To communicate with you
        about updates, promotions, and other information related to JesusPod. -
        To process transactions and manage subscriptions.
      </Text>

      <Text
        style={{
          color: COLORS.black,
          fontFamily: Fonts.bold,
          marginBottom: 10,
        }}
      >
        **3.
      </Text>
      <Text
        style={{
          color: COLORS.black,
          fontFamily: Fonts.regular,
          marginBottom: 10,
        }}
      >
        Sharing Your Information** We do not share your personal information
        with third parties except as necessary to provide our services, comply
        with legal obligations, or with your consent. This includes sharing
        information with service providers who assist us in operating our app
        and processing payments.
      </Text>

      <Text
        style={{
          color: COLORS.black,
          fontFamily: Fonts.bold,
          marginBottom: 10,
        }}
      >
        **4.
      </Text>
      <Text
        style={{
          color: COLORS.black,
          fontFamily: Fonts.regular,
          marginBottom: 10,
        }}
      >
        **5. Your Rights** You have the right to access, correct, or delete your
        personal information. You can manage your preferences and exercise these
        rights through your account settings or by contacting us at
        kevin@faithpleasesgod.com.
      </Text>
      <Text
        style={{
          color: COLORS.black,
          fontFamily: Fonts.bold,
          marginBottom: 10,
        }}
      >
        **5.
      </Text>
      <Text
        style={{
          color: COLORS.black,
          fontFamily: Fonts.regular,
          marginBottom: 10,
        }}
      >
        Data Security** We implement appropriate technical and organizational
        measures to protect your personal information from unauthorized access,
        use, or disclosure.
      </Text>

      <Text
        style={{
          color: COLORS.black,
          fontFamily: Fonts.bold,
          marginBottom: 10,
        }}
      >
        **6.
      </Text>
      <Text
        style={{
          color: COLORS.black,
          fontFamily: Fonts.regular,
          marginBottom: 10,
        }}
      >
        Children's Privacy** JesusPod is not intended for children under the age
        of 13. We do not knowingly collect personal information from children
        under 13. If we become aware that a child under 13 has provided us with
        personal information, we will take steps to delete such information.
      </Text>

      <Text
        style={{
          color: COLORS.black,
          fontFamily: Fonts.bold,
          marginBottom: 10,
        }}
      >
        **7.
      </Text>
      <Text
        style={{
          color: COLORS.black,
          fontFamily: Fonts.regular,
          marginBottom: 10,
        }}
      >
        Changes to This Privacy Policy** We may update this Privacy Policy from
        time to time. We will notify you of any changes by posting the new
        Privacy Policy on this page. You are advised to review this Privacy
        Policy periodically for any changes.
      </Text>

      <Text
        style={{
          color: COLORS.black,
          fontFamily: Fonts.bold,
          marginBottom: 10,
        }}
      >
        **8.
      </Text>
      <Text
        style={{
          color: COLORS.black,
          fontFamily: Fonts.regular,
          marginBottom: 10,
        }}
      >
        Contact Us** If you have any questions about this Privacy Policy, please
        contact us at: Faith Pleases God Church Corporation Attention: Kevin
        Ortiz Email: kevin@faithpleasesgod.com By using JesusPod, you consent to
        our Privacy Policy and agree to its terms.
      </Text>
    </ScreenWrapper>
  );
};
export default PrivacyPolicy;
