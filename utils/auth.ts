import { AuthStorage } from "./authStorage";

export const AuthService = {
  signUpWithEmail: async (email: string, password: string, role: UserRole) => {
    const userCredential = await auth.createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    //save to secure storage
    await AuthStorage.saveSession(userCredential.user.uid, role);

    return userCredential;
  },
};
