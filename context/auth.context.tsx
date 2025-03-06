import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Auth,
  User,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { AuthStorage } from "@/utils/authStorage";
import { doc, getDoc, updateDoc } from "@react-native-firebase/firestore";
import { auth, db } from "@/config/firebase";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    role: null,
    onboardingCompleted: false,
    loading: true,
    verificationId: undefined,
  });

  //Initiate recaptcha verifier
  useEffect(() => {
    (window as any).recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {},
      }
    );
  }, []);

  // ─── Handle Auth State Changes
  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged(async (firebaseUser: User) => {
      if (firebaseUser) {
        //get the User's data from firestore
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        const userData = userDoc.data();

        //Get secure persisted user data
        const { role } = await AuthStorage.getPersistedUser();

        setState({
          user: {
            uid: firebaseUser.uid,
            phoneNumber: firebaseUser.phoneNumber,
          },
          role: userData?.role || null,
          onboardingCompleted: await AuthStorage.checkOnboardingComplete(),
          loading: false,
        });
      } else {
        setState({
          user: null,
          role: null,
          onboardingCompleted: false,
          loading: false,
        });
      }
    });
    return unsuscribe;
  }, []);

  //Phone Number Authentication methods
  const sendPhoneVerification = async (phoneNumber: string) => {
    try {
      const appVerifier = (window as any).recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );

      setState((prev) => ({
        ...prev,
        verificationId: confirmationResult.verificationId,
      }));
    } catch (error) {
      console.error("Error sending verification code:", error);
      throw error;
    }
  };

  //Phone Number Confirmation
  const confirmVerificationCode = async (code: string) => {
    if (!state.verificationId) throw new Error("No verification in progress");
    //Confirm the verification code
    try {
      const credential = await auth.PhoneAuthProvider.credential(
        state.verificationId,
        code
      );
      await auth.signInWithCredential(auth, credential);
    } catch (error) {
      console.error("Error confirming verification code:", error);
      throw error;
    }
  };

  //Other Context Methods
  const signOut = async () => {
    await auth.signOut();
    await AuthStorage.clearSession();
    setState((prev) => ({ ...prev, user: null, role: null }));
  };

  const completeOnboarding = async () => {
    //update onboarding status
    await AuthStorage.setOnboardingComplete();
    setState((prev) => ({ ...prev, onboardingCompleted: true }));
  };

  const updateUserRole = async (role: UserRole) => {
    if (!state.user) return;

    await updateDoc(doc(db, "users", state.user.uid), { role });
    await AuthStorage.saveSession(state.user.uid, role);
    setState((prev) => ({ ...prev, role }));
  };
  //update firestore and secure storage
  //     await Promise.all([
  //       doc(db, "users", state.user.uid).update({ role }),
  //       AuthStorage.saveSession(state.user.uid, role),
  //     ]);
  //     setState((prev) => ({ ...prev, role }));
  //   };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signOut,
        completeOnboarding,
        updateUserRole,
        sendPhoneVerification,
        confirmVerificationCode,
      }}
    >
      {children}
      <div id="recaptcha-container" style={{ display: "none" }}></div>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
