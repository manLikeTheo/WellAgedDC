// utils/authStorage.ts
import { UserRole } from "@/types/auth";
import * as SecureStore from "expo-secure-store";

const SECURE_KEYS = {
  USER_ID: "wellaged_user_id",
  USER_ROLE: "wellaged_user_role",
  ONBOARDING: "wellaged_onboarding",
} as const;

export const AuthStorage = {
  // Save session data securely
  saveSession: async (userId: string, role: UserRole) => {
    await SecureStore.setItemAsync(SECURE_KEYS.USER_ID, userId);
    if (role) await SecureStore.setItemAsync(SECURE_KEYS.USER_ROLE, role);
  },

  // Get persisted user data
  getPersistedUser: async () => {
    const [userId, role] = await Promise.all([
      SecureStore.getItemAsync(SECURE_KEYS.USER_ID),
      SecureStore.getItemAsync(SECURE_KEYS.USER_ROLE),
    ]);

    return { userId, role: role as UserRole };
  },

  // Onboarding status
  setOnboardingComplete: async () => {
    await SecureStore.setItemAsync(SECURE_KEYS.ONBOARDING, "true");
  },

  checkOnboardingComplete: async () => {
    return (await SecureStore.getItemAsync(SECURE_KEYS.ONBOARDING)) === "true";
  },

  // Clear session on logout
  clearSession: async () => {
    await Promise.all([
      SecureStore.deleteItemAsync(SECURE_KEYS.USER_ID),
      SecureStore.deleteItemAsync(SECURE_KEYS.USER_ROLE),
    ]);
  },
};
