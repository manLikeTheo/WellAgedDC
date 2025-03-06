import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Illustration from "@/Screens/onboarding/Illustrations";
import ProgressIndicator from "@/Screens/onboarding/ProgressIndicator";
import { moderateScale } from "react-native-size-matters";

type SeniorSlideProps = {
  currentStep: number;
  totalSteps: number;
};

export default function SeniorSlide({
  currentStep,
  totalSteps,
}: SeniorSlideProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.largeText}>Welcome to WellAged Care+!</Text>
      <Text style={styles.bodyText}>
        We'll help you stay connected with your family and caregivers
      </Text>
      <Illustration
        source={require("../../../assets/images/Senior_Citizen.png")}
      />
      <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: moderateScale(20),
  },
  largeText: {
    fontSize: moderateScale(24),
    fontWeight: "bold",
    marginBottom: moderateScale(20),
  },
  bodyText: {
    fontSize: moderateScale(16),
    marginBottom: moderateScale(20),
  },
});
