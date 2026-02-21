"use client";

import { useState } from "react";
import { addTransaction } from "@/app/dashboard/actions";
import styles from "./AddTransaction.module.scss";

type BucketType = "SPENDING" | "EMERGENCY" | "NEXT_MONTH" | "MISSION";

export default function AddTransaction() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [bucket, setBucket] = useState<BucketType>("SPENDING");
  const [direction, setDirection] = useState<"IN" | "OUT">("OUT");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    setLoading(true);

    await addTransaction({
      description,
      amount: parseFloat(amount),
      bucket,
      direction,
    });

    setDescription("");
    setAmount("");
    setBucket("SPENDING");
    setDirection("OUT");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Add Transaction</h3>

      {/* Primary Inputs Grid */}
      <div className={styles.inputs}>
        <div className={styles.inputGroup}>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            placeholder="e.g. Coffee, Salary"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            required
          />
        </div>
      </div>

      {/* Selectors Grid */}
      <div className={styles.selectors}>
        <div className={styles.inputGroup}>
          <label htmlFor="bucket">Bucket</label>
          <select
            id="bucket"
            value={bucket}
            onChange={(e) => setBucket(e.target.value as BucketType)}
          >
            <option value="SPENDING">Spending</option>
            <option value="EMERGENCY">Emergency</option>
            <option value="MISSION">Goal / Mission</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="direction">Direction</label>
          <select
            id="direction"
            value={direction}
            onChange={(e) => setDirection(e.target.value as "IN" | "OUT")}
          >
            <option value="IN">Deposit (IN)</option>
            <option value="OUT">Withdraw (OUT)</option>
          </select>
        </div>
      </div>

      <button type="submit" disabled={loading} className={styles.submitBtn}>
        {loading ? "Adding..." : "Add Transaction"}
      </button>
    </form>
  );
}
