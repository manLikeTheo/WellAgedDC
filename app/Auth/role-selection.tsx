// app/(auth)/role-selection.tsx
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import LargeButton from "@/components/Buttons/LargeButton";

export default function RoleSelection() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Who are you?</Text>

      <Link href="/(auth)/signup/senior" asChild>
        <LargeButton title="I'm a Senior" icon="person" color="#2A5C8F" />
      </Link>

      <Link href="/(auth)/signup/family" asChild>
        <LargeButton title="Family Member" icon="people" color="#4CAF50" />
      </Link>

      <Link href="/(auth)/login" asChild>
        <LargeButton
          title="Already have an account? Login"
          icon="log-in"
          color="#666"
        />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
