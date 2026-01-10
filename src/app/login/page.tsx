"use client";

import styles from "./Login.module.css";
import { Button } from "@/components/ui/Button";
import { Droplets } from "lucide-react";
import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Form States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState(""); // Only for Sign Up

    const router = useRouter();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (isSignUp) {
                // Sign Up Logic
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                // Set Display Name
                if (auth.currentUser) {
                    await updateProfile(auth.currentUser, {
                        displayName: fullName
                    });
                }
                // Redirect
                router.push("/app/dashboard");
            } else {
                // Sign In Logic
                await signInWithEmailAndPassword(auth, email, password);
                router.push("/app/dashboard");
            }
        } catch (err: any) {
            console.error(err);
            if (err.code === 'auth/invalid-credential') {
                setError("Invalid credentials. If you haven't registered yet, please switch to 'Create Account'.");
            } else if (err.code === 'auth/email-already-in-use') {
                setError("Email is already registered. Please Sign In.");
            } else if (err.code === 'auth/weak-password') {
                setError("Password should be at least 6 characters.");
            } else if (err.code === 'auth/too-many-requests') {
                setError("Too many attempts. Try again later.");
            } else {
                setError("Authentication failed. " + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.loginCard}>
                <div className={styles.logoSection}>
                    <div className={styles.logoIcon}>
                        <Droplets size={32} />
                    </div>
                    <div className={styles.logoText}>
                        <h1>JalRakshak</h1>
                        <p>Smart Water Health & Flood Monitoring System</p>
                    </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.welcomeText}>
                    <h2>{isSignUp ? "Create an Account" : "Welcome Back"}</h2>
                    <p>{isSignUp ? "Join as a Citizen to report issues and get alerts." : "Enter your credentials to access the city dashboard."}</p>
                </div>

                <form onSubmit={handleAuth} className="flex flex-col gap-4 w-full">
                    {error && (
                        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100">
                            {error}
                        </div>
                    )}

                    {isSignUp && (
                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    )}

                    <Input
                        label="Email Address"
                        placeholder={isSignUp ? "citizen@example.com" : "officer@jalrakshak.in"}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Input
                        label="Password"
                        placeholder="••••••••"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Button
                        type="submit"
                        fullWidth
                        size="md"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : (isSignUp ? "Sign Up" : "Sign In")}
                    </Button>
                </form>

                <div className={styles.toggleContainer}>
                    {isSignUp ? "Already have an account?" : "New to JalRakshak?"}
                    <button
                        type="button"
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            setError("");
                        }}
                        className={styles.toggleButton}
                    >
                        {isSignUp ? "Sign In" : "Create Account"}
                    </button>
                </div>

                {!isSignUp && (
                    <p className={styles.footerNote}>
                        Admins: Use your official IDs to access the Command Center.
                    </p>
                )}
            </div>
        </main>
    );
}
