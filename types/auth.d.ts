// types/auth.d.ts
export type UserRole = "senior" | "family" | "caregiver" | "admin" | null;

export interface AuthUser {
  uid: string;
  phoneNumber?: string | null;
}

export interface AuthState {
  user: AuthUser | null;
  role: UserRole;
  onboardingCompleted: boolean;
  verificationId?: string;
  loading: boolean;
}

export interface AuthContextType extends AuthState {
  signOut: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
  updateUserRole: (role: UserRole) => Promise<void>;
  confirmVerificationCode: (code: string) => Promise<void>; //What it does: Verifies the verification code entered by the user.
  sendPhoneVerification: (phoneNumber: string) => Promise<void>; //it sends a verification code to the specified phone number.
}
