// components/Buttons/LargeButton.tsx
import { Pressable, Text, StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

export default function LargeButton({
  title,
  onPress,
  color,
}: {
  title: string;
  onPress: () => void;
  color: string;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: color, opacity: pressed ? 0.8 : 1 },
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: moderateScale(280),
    height: verticalScale(60),
    borderRadius: moderateScale(12),
    justifyContent: "center",
    marginVertical: verticalScale(10),
  },
  buttonText: {
    color: "white",
    fontSize: moderateScale(24),
    fontWeight: "600",
    textAlign: "center",
  },
});
