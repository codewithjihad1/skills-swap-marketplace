import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { 
  type User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  type UserCredential
} from 'firebase/auth';
import { auth } from '../firebase/FirebaseConfig';

// Define the shape of the auth context
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  // Authentication methods
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  googleSignIn: () => Promise<UserCredential>;
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>;
}

// Create context with undefined as default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props interface for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Google auth provider instance
const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Sign up with email and password
  const signup = (email: string, password: string): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login with email and password
  const login = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout
  const logout = (): Promise<void> => {
    return signOut(auth);
  };

  // Reset password
  const resetPassword = (email: string): Promise<void> => {
    return sendPasswordResetEmail(auth, email);
  };

  // Google sign in
  const googleSignIn = (): Promise<UserCredential> => {
    return signInWithPopup(auth, googleProvider);
  };

  // Update user profile
  const updateUserProfile = (displayName: string, photoURL?: string): Promise<void> => {
    if (!currentUser) {
      return Promise.reject(new Error('No user is currently signed in'));
    }
    
    return updateProfile(currentUser, {
      displayName,
      photoURL: photoURL || null
    });
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    googleSignIn,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };
export type { AuthContextType };