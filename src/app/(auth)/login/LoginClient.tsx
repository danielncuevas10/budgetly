"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { login, signup, resetPassword } from "./actions";
import styles from "./page.module.scss";
import Image from "next/image";
import Button from "@/components/Button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const message = searchParams.get("message");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mode = searchParams.get("mode");
  const error = searchParams.get("error");
  const isReset = mode === "reset";
  const isSignUp = mode === "signup";

  const [cooldown, setCooldown] = useState(0);

  const isLongEnough = password.length >= 8;
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  useEffect(() => {
    setIsSubmitting(false);
  }, [error, message]);

  // Handle Cooldown from Server Errors
  useEffect(() => {
    if (!error) return;
    const decoded = decodeURIComponent(error).toLowerCase();
    const isRateLimit =
      decoded.includes("rate limit") ||
      decoded.includes("too many") ||
      decoded.includes("security purposes");

    if (isRateLimit) {
      setCooldown(60);
      const expires = new Date(Date.now() + 60 * 1000).toUTCString();
      document.cookie = `auth_cooldown=${
        Date.now() + 60 * 1000
      }; expires=${expires}; path=/`;
    }
  }, [error]);

  // Timer Logic
  useEffect(() => {
    const match = document.cookie.match(/auth_cooldown=(\d+)/);
    if (match) {
      const until = parseInt(match[1], 10);
      const remaining = Math.ceil((until - Date.now()) / 1000);
      if (remaining > 0) {
        setCooldown(remaining);
      }
    }
  }, []);

  const getFriendlyError = (err: string | null) => {
    if (!err) return null;
    const decoded = decodeURIComponent(err).toLowerCase();

    if (
      decoded.includes("rate limit") ||
      decoded.includes("too many requests") ||
      decoded.includes("too many") ||
      decoded.includes("security purposes") ||
      decoded.includes("email rate limit")
    ) {
      return null;
    }

    if (decoded.includes("invalid login credentials")) {
      return "Invalid email or password.";
    }

    return decodeURIComponent(err);
  };

  async function checkBreach(password: string) {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();

    const prefix = hashHex.substring(0, 5);
    const suffix = hashHex.substring(5);

    try {
      const response = await fetch(
        `https://api.pwnedpasswords.com/range/${prefix}`
      );
      const text = await response.text();
      const leakedHashes = text.split("\n");
      const matchingLine = leakedHashes.find((line) => line.startsWith(suffix));

      if (matchingLine) {
        const parts = matchingLine.split(":");
        return { pwned: true, count: parseInt(parts[1] || "0", 10) };
      }
      return { pwned: false, count: 0 };
    } catch (error) {
      return { pwned: false, count: 0 };
    }
  }

  const [breachMessage, setBreachMessage] = useState("");

  const handlePasswordBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    if (pwd.length < 8) return;
    const result = await checkBreach(pwd);
    if (result.pwned) {
      setBreachMessage(
        `⚠️ Security Alert: This password appeared in ${result.count.toLocaleString()} data breaches.`
      );
    } else {
      setBreachMessage("");
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (isSignUp && (!isLongEnough || !hasSymbol)) {
      e.preventDefault();
      return;
    }
    if (cooldown > 0 || isSubmitting) {
      e.preventDefault();
      return;
    }
    setIsSubmitting(true);
  };

  function setCooldownCookie(seconds: number) {
    const expires = new Date(Date.now() + seconds * 1000).toUTCString();
    document.cookie = `auth_cooldown=${
      Date.now() + seconds * 1000
    }; expires=${expires}; path=/`;
  }

  return (
    <main>
      <div className={styles.login}>
        <div className={styles.leftSide}>
          <div className={styles.text}>
            <h1>Budgetly</h1>
            <p>Smarter budgeting starts here.</p>
          </div>
        </div>

        <div className={styles.formInput}>
          <Image
            src="/images/landing/logo/b.svg"
            alt="Logo"
            width={60}
            height={90}
            className={styles.bImg}
          />

          <h1>
            {isReset
              ? "Reset Password"
              : isSignUp
              ? "Create an Account"
              : "Welcome Back"}
          </h1>
          <p>
            {isReset
              ? "Enter your email to receive a reset link."
              : isSignUp
              ? "Join Budgetly to start saving."
              : "Log in to your dashboard."}
          </p>

          <form
            action={isReset ? resetPassword : isSignUp ? signup : login}
            onSubmit={handleFormSubmit}
          >
            <div className={styles.theForm}>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                style={{ width: "100%" }}
              />

              {!isReset && (
                <>
                  <label htmlFor="password">Password:</label>
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={handlePasswordBlur}
                      style={{ width: "100%" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: "10px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {showPassword ? (
                        <EyeOff size={20} color="#64748b" />
                      ) : (
                        <Eye size={20} color="#64748b" />
                      )}
                    </button>
                  </div>

                  {!isSignUp && (
                    <Link
                      href="/login?mode=reset"
                      className={styles.forgotLink}
                      style={{
                        fontSize: "0.85rem",
                        marginTop: "0.5rem",
                        display: "block",
                        color: "#1B263B",
                        textDecoration: "underline",
                      }}
                    >
                      Forgot password?
                    </Link>
                  )}
                </>
              )}

              {breachMessage && (
                <div className={styles.breachWarning}>{breachMessage}</div>
              )}

              {isSignUp && isPasswordFocused && (
                <div className={styles.validationRules}>
                  <p className={isLongEnough ? styles.valid : styles.invalid}>
                    {isLongEnough ? "✔" : "✖"} At least 8 characters
                  </p>
                  <p className={hasSymbol ? styles.valid : styles.invalid}>
                    {hasSymbol ? "✔" : "✖"} At least one symbol
                  </p>
                </div>
              )}

              {message && (
                <div className={styles.successMessage}>
                  {decodeURIComponent(message)}
                </div>
              )}
              {error && getFriendlyError(error) && (
                <div role="alert" className={styles.error}>
                  {getFriendlyError(error)}
                </div>
              )}
              {cooldown > 0 && (
                <div className={styles.error} style={{ marginTop: "0.5rem" }}>
                  Please wait {cooldown}s before trying again.
                </div>
              )}
            </div>

            <div className={styles.buttonCont}>
              <button
                type="submit"
                className={styles.cta}
                disabled={
                  isSubmitting ||
                  cooldown > 0 ||
                  (isSignUp && (!isLongEnough || !hasSymbol))
                }
              >
                {isSubmitting
                  ? "Processing..."
                  : isReset
                  ? "Send Reset Link"
                  : isSignUp
                  ? "Sign Up"
                  : "Log In"}
              </button>
            </div>
          </form>

          <div className={styles.finalText}>
            {isReset ? (
              <Link href="/login" className={styles.create}>
                Back to Login
              </Link>
            ) : !isSignUp ? (
              <>
                <p>Don't have an account?</p>
                <Button
                  variant="primary"
                  text="Sign Up"
                  href="/login?mode=signup"
                  className={styles.buttonStarted}
                />
              </>
            ) : (
              <p>
                Already have an account?{" "}
                <Link href="/login" className={styles.create}>
                  Log In
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
