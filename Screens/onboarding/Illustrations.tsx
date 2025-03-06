// components/Illustration.tsx
import { Image, ImageProps, StyleSheet } from "react-native";
import React from "react";

type IllustrationProps = ImageProps & {
  source: ImageProps["source"];
};

export default function Illustration({ source, ...props }: IllustrationProps) {
  return (
    <Image
      source={source}
      style={styles.image}
      resizeMode="contain"
      accessibilityIgnoresInvertColors
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    marginVertical: 20,
  },
});
// // components/onboarding/Illustration.tsx
// import React from "react";
// import { Image, ImageSourcePropType, StyleSheet } from "react-native";
// import { Dimensions } from "react-native";

// const { width } = Dimensions.get("window");

// type IllustrationProps = {
//   source: ImageSourcePropType;
//   style?: object;
// };

// export default function Illustration({ source, style }: IllustrationProps) {
//   return (
//     <Image source={source} style={[styles.image, style]} resizeMode="contain" />
//   );
// }

// const styles = StyleSheet.create({
//   image: {
//     width: width * 0.8,
//     height: width * 0.8,
//     marginVertical: 20,
//   },
// });
