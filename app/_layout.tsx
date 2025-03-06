import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@/context/theme.context";
import { Redirect, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { SecureStorage } from "@/utils/secure-store";

SplashScreen.preventAutoHideAsync(); //prevent splash screen from auto hiding

export default function RootLayout() {
  return (
    <ThemeProvider>
      {/* <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(routes)/onboarding/index" />
      </Stack> */}
    </ThemeProvider>
  );
}

function NavigationFlow() {
  const { user, loading } = useAuth();
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(
    null
  );

  //Onboarding Status
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const complete = await SecureStorage.getOnboardingComplete();
      setOnboardingComplete(complete);
    };
    checkOnboardingStatus();
  }, []);

  if (loading || onboardingComplete === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  //else
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!onboardingComplete ? (
        <Stack.Screen name="(routes)/onboarding/index" />
      ) : !user ? (
        <Stack.Screen name="(auth)/role-selection" />
      ) : (
        <RoleBasedRedirect />
      )}
    </Stack>
  );
}

function RoleBasedRedirect() {
  const { user } = useAuth();
  const [role, setRole] = useState<UserRole | null>(null);

  //Get user role
  useEffect(() => {
    const getRole = async () => {
      const storedRole = await SecureStorage.getUserRole(); //get user role from secure storage
      setRole(storedRole); //set user role state so that it can be used in the rest of the app
    };
    getRole();
  });

  if (!role) return <ActivityIndicator size="large" />; //show loading indicator while role is being fetched

  return (
    <>
      {role === "senior" && <Redirect href="/(tabs)/home" />}
      {role === "family" && <Redirect href="/(tabs)/explore" />}
      {role === "caregiver" && <Redirect href="/(tabs)/explore" />}
      {role === "admin" && <Redirect href="/(tabs)/admin" />}
    </>
  );
}
