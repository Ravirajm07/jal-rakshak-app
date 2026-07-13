import { initializeApp, getApps, getApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? ""
};

const missingFirebaseEnv = Object.entries(firebaseConfig)
    .filter(([key, value]) => key !== "measurementId" && !value)
    .map(([key]) => key);

if (missingFirebaseEnv.length > 0 && process.env.NODE_ENV !== "test") {
    console.warn(
        `Missing Firebase web configuration: ${missingFirebaseEnv.join(", ")}. Authentication will not work until these NEXT_PUBLIC_FIREBASE_* variables are set.`
    );
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

if (
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === "true" &&
    !(window as Window & { __JALRAKSHAK_AUTH_EMULATOR__?: boolean }).__JALRAKSHAK_AUTH_EMULATOR__
) {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
    (window as Window & { __JALRAKSHAK_AUTH_EMULATOR__?: boolean }).__JALRAKSHAK_AUTH_EMULATOR__ = true;
}

export { auth };
