import { createContext, useContext, useState } from "react";
import { SignUpModal } from "@/features/auth/components/sign-up/sign-up-modal";
import { SignInModal } from "@/features/auth/components/sign-in/sign-in-modal";

interface AuthContextType {
  isSignUpOpen: boolean;
  isSignInOpen: boolean;
  openSignUp: () => void;
  closeSignUp: () => void;
  openSignIn: () => void;
  closeSignIn: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const openSignUp = () => {
    setIsSignInOpen(false); // Close sign in if it's open
    setIsSignUpOpen(true);
  };

  const closeSignUp = () => setIsSignUpOpen(false);

  const openSignIn = () => {
    setIsSignUpOpen(false); // Close sign up if it's open
    setIsSignInOpen(true);
  };

  const closeSignIn = () => setIsSignInOpen(false);

  return (
    <AuthContext.Provider
      value={{
        isSignUpOpen,
        openSignUp,
        closeSignUp,
        isSignInOpen,
        openSignIn,
        closeSignIn,
      }}
    >
      {children}
      <SignUpModal />
      <SignInModal />
    </AuthContext.Provider>
  );
}
