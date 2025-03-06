// types/auth.d.ts
type UserRole = "senior" | "family" | "caregiver" | "admin" | null;

interface AuthUser {
  uid: string;
  //   email?: string;
  phoneNumber?: string | null;
}

interface AuthState {
  user: AuthUser | null;
  role: UserRole;
  onboardingCompleted: boolean;
  verificationId?: string;
  loading: boolean;
}

interface AuthContextType extends AuthState {
  signOut: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
  updateUserRole: (role: UserRole) => Promise<void>;
  confirmVerificationCode: (code: string) => Promise<void>;
  sendPhoneVerification: (phoneNumber: string) => Promise<void>;
}
