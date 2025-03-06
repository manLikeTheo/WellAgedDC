// components/ProgressIndicator.tsx
import { View, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

type ProgressIndicatorProps = {
  currentStep: number;
  totalSteps: number;
};

export default function ProgressIndicator({
  currentStep,
  totalSteps,
}: ProgressIndicatorProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index < currentStep ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: moderateScale(30),
  },
  dot: {
    width: moderateScale(12),
    height: moderateScale(12),
    borderRadius: moderateScale(6),
    marginHorizontal: moderateScale(4),
  },
  activeDot: {
    backgroundColor: "#2A5C8F",
  },
  inactiveDot: {
    backgroundColor: "#B0BEC5",
  },
});
// // components/onboarding/ProgressIndicator.tsx
// import React from "react";
// import { View, StyleSheet } from "react-native";
// import { scale } from "react-native-size-matters";

// type ProgressIndicatorProps = {
//   currentStep: number;
//   totalSteps: number;
// };

// export default function ProgressIndicator({
//   currentStep,
//   totalSteps,
// }: ProgressIndicatorProps) {
//   return (
//     <View style={styles.container}>
//       {Array.from({ length: totalSteps }).map((_, index) => (
//         <View
//           key={index}
//           style={[styles.dot, index === currentStep && styles.activeDot]}
//         />
//       ))}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginVertical: scale(20),
//   },
//   dot: {
//     width: scale(8),
//     height: scale(8),
//     borderRadius: scale(4),
//     backgroundColor: "#ccc",
//     marginHorizontal: scale(4),
//   },
//   activeDot: {
//     backgroundColor: "#2A5C8F",
//     width: scale(12),
//     height: scale(12),
//     borderRadius: scale(6),
//   },
// });
