import { View, Text } from "react-native";
import React from "react";
import { SecureStorage } from "@/utils/secure-store";
import { useRouter } from "expo-router";

export default function Onboarding() {
  const router = useRouter();

  const handleComplete = async () => {
    await SecureStorage.setOnboardingComplete(true);
    router.replace("(auth)/role-selection");
  };

  return <OnboardingCarousel onComplete={handleComplete} />;
}
