"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./Steps.module.scss";

export default function StepIncome({ userName, onNext, onBack }: any) {
  const [income, setIncome] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [isFreelancer, setIsFreelancer] = useState(false);
  const [displayIncome, setDisplayIncome] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // professional formatter
  const formatter = new Intl.NumberFormat("en-US");

  // autofocus on mount (used by Stripe, Mercury, etc.)
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleIncomeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/,/g, "");

    if (raw === "") {
      setIncome(0);
      setDisplayIncome("");
      setError("");
      return;
    }

    const number = Number(raw);

    if (isNaN(number)) {
      setError("Enter a valid number");
      return;
    }

    if (number < 0) {
      setError("Income cannot be negative");
      return;
    }

    // clear error if valid
    setError("");

    setIncome(number);
    setDisplayIncome(formatter.format(number));
  }

  function handleContinue() {
    if (income <= 0) {
      setError("Please enter your monthly income");
      return;
    }

    onNext(income, isFreelancer, currency);
  }

  return (
    <div className={styles.formInput}>
      <div className={styles.theIncome}>
        <h2>What’s your monthly take-home pay, {userName}?</h2>

        {/* helper text */}
        <p className={styles.helper}>Enter your net income after taxes</p>

        {/* input row with currency */}
        <div className={styles.inputRow}>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            aria-label="Currency"
          >
            <option value="USD">USD ($)</option>
            <option value="CAD">CAD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="MXN">MXN ($)</option>
          </select>

          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            value={displayIncome}
            onChange={handleIncomeChange}
            placeholder="3,000"
            aria-invalid={!!error}
            aria-describedby="income-error"
            className={error ? styles.inputError : ""}
          />
        </div>

        {/* error message */}
        {error && (
          <span id="income-error" className={styles.errorText}>
            {error}
          </span>
        )}

        {/* freelancer checkbox */}
        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={isFreelancer}
            onChange={(e) => setIsFreelancer(e.target.checked)}
          />
          I have a variable income (Freelancer)
        </label>

        {/* buttons */}
        <div className={styles.buttonGroup}>
          <button onClick={onBack} className={styles.theBack} type="button">
            Back
          </button>

          <button
            disabled={income <= 0}
            onClick={handleContinue}
            className={styles.theContinue}
            type="button"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
