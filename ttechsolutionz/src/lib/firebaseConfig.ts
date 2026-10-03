// Firebase configuration is supplied through Vite environment variables.
export const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID
);

export const firebaseConfig = {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-ttech-solutionz",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456",
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForDemoModeTtech12345",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo-ttech-solutionz.firebaseapp.com",
  firestoreDatabaseId: import.meta.env.VITE_FIRESTORE_DATABASE_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo-ttech-solutionz.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
};

