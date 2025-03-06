import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { moderateScale, verticalScale } from "react-native-size-matters";
// import Animated from "react-native-reanimated";

export default function SplashScreen() {
  //   Animated values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  const { width, height } = Dimensions.get("window");

  const router = useRouter();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 12,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        clearTimeout(fallbackTimer);
        router.replace("/onboarding");
      }
    });

    const fallbackTimer = setTimeout(() => {
      router.replace("/onboarding");
    }, 5000);

    return () => clearTimeout(fallbackTimer);
  }, []);
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.iconContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Ionicons name="medical" size={200} color="darkblue" />
        <Text style={styles.appName}>WellAged Care+</Text>
      </Animated.View>
      {/* Pregress indicator */}
      <Animated.View
        style={[styles.progressBar, { opacity: fadeAnim }]}
      ></Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8F4FD",
  },
  iconContainer: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
    letterSpacing: 1,
  },
  appName: {
    color: "#2A5C8F",
    textAlign: "center",
    fontSize: moderateScale(32),
    fontWeight: "bold",
    marginTop: verticalScale(20),
    letterSpacing: 0.5,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  progressBar: {
    position: "absolute",
    bottom: verticalScale(50),
    height: verticalScale(5),
    width: "40%",
    backgroundColor: "#2A5C8F",
    borderRadius: 2,
  },
});
