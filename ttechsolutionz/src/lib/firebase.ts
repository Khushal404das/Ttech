import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as fbSignOut,
  onAuthStateChanged,
  signInAnonymously,
  type User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);

// Use custom database ID if provisioned, or default
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const signInWithGoogle = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Sync user profile in Firestore
    if (user) {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email?.split('@')[0] || 'User',
          photoURL: user.photoURL || '',
          lastLoginAt: serverTimestamp(),
        },
        { merge: true }
      );
    }

    return user;
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
};

export const signInAsGuest = async (): Promise<User> => {
  try {
    const result = await signInAnonymously(auth);
    const user = result.user;

    if (user) {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          uid: user.uid,
          email: 'guest@omnihub.workspace',
          displayName: 'Guest Explorer',
          photoURL: '',
          isAnonymous: true,
          lastLoginAt: serverTimestamp(),
        },
        { merge: true }
      );
    }
    return user;
  } catch (error: any) {
    console.error('Guest Sign-In Error:', error);
    throw error;
  }
};

export const signOut = async (): Promise<void> => {
  await fbSignOut(auth);
};

export { onAuthStateChanged, type User };
