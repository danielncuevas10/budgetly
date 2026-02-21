"use client";
import { useState, useMemo } from "react";
import styles from "./Steps.module.scss";

export default function StepEffort({ formData, onNext, onBack }: any) {
  // Start with a healthy default (20% of leftover)
  const totalBills = formData.mustHaves.reduce(
    (acc: number, b: any) => acc + b.amount,
    0
  );
  const leftAfterBills = formData.income - totalBills;
  const initialContribution = Math.floor(leftAfterBills * 0.2);

  const [contribution, setContribution] = useState(initialContribution);

  // Memoized math for smooth slider performance
  const { dailySafe, monthsToGoal } = useMemo(() => {
    const monthlyRemaining = leftAfterBills - contribution;
    const buffer = monthlyRemaining * 0.2;
    const pool = monthlyRemaining - buffer;

    return {
      dailySafe: Math.max(0, pool / 30),
      monthsToGoal: Math.ceil(formData.goalAmount / contribution) || 0,
    };
  }, [contribution, leftAfterBills, formData.goalAmount]);

  return (
    <div className={styles.formInput}>
      <header className={styles.stepHeader}>
        <h2>Let's define your effort</h2>
        <p>
          How much are we saving for <strong>{formData.mission}</strong>?
        </p>
      </header>

      <div className={styles.calculatorSection}>
        <div className={styles.amountCircle}>
          <span className={styles.label}>Monthly</span>
          <h3 className={styles.mainAmount}>
            ${contribution.toLocaleString()}
          </h3>
        </div>

        <input
          type="range"
          className={styles.rangeSlider}
          min="10"
          max={Math.max(100, leftAfterBills - 50)}
          value={contribution}
          onChange={(e) => setContribution(Number(e.target.value))}
        />

        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <small>Goal Timeline</small>
            <strong>{monthsToGoal} months</strong>
          </div>
          <div
            className={`${styles.statBox} ${
              dailySafe < 15 ? styles.lowFunds : ""
            }`}
          >
            <small>Daily Safe to Spend</small>
            <strong>${dailySafe.toFixed(2)}</strong>
          </div>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button className={styles.backBtn} onClick={onBack}>
          Back
        </button>
        <button className={styles.cta} onClick={() => onNext(contribution)}>
          Finish & Go to Dashboard
        </button>
      </div>
    </div>
  );
}
