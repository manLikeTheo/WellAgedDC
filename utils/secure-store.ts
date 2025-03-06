// utils/secure-store.ts
import * as SecureStore from "expo-secure-store";

type UserRole = "senior" | "family" | "caregiver" | "admin";

// Secure keys (prevent typos)
const SECURE_KEYS = {
  ONBOARDING_COMPLETE: "onboarding_complete",
  USER_ROLE: "user_role",
  USER_TOKEN: "user_token",
} as const;

// Type-safe getter/setter
export const SecureStorage = {
  // Save onboarding status
  setOnboardingComplete: async (value: boolean) => {
    await SecureStore.setItemAsync(
      SECURE_KEYS.ONBOARDING_COMPLETE,
      value.toString()
    );
  },

  // Check if onboarding completed
  getOnboardingComplete: async () => {
    const value = await SecureStore.getItemAsync(
      SECURE_KEYS.ONBOARDING_COMPLETE
    );
    return value === "true";
  },

  // Save user role (type-safe)
  setUserRole: async (role: UserRole) => {
    await SecureStore.setItemAsync(SECURE_KEYS.USER_ROLE, role);
  },

  // Get user role
  getUserRole: async () => {
    return (await SecureStore.getItemAsync(SECURE_KEYS.USER_ROLE)) as UserRole;
  },
};
