"use client";
import { useState } from "react";
import styles from "./Steps.module.scss";

interface Bill {
  name: string;
  amount: number;
}

export default function StepBills({ onNext, onBack }: any) {
  const [selectedBills, setSelectedBills] = useState<Bill[]>([]);
  const [currentName, setCurrentName] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");

  const addBill = () => {
    if (currentName.trim()) {
      const newBill = {
        name: currentName.trim(),

        amount: parseFloat(currentAmount) || 0,
      };
      setSelectedBills([...selectedBills, newBill]);
      setCurrentName("");
      setCurrentAmount("");
    }
  };

  const handleContinue = () => {
    onNext(selectedBills);
  };

  const removeBill = (index: number) => {
    setSelectedBills((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className={styles.formInput}>
        <div className={styles.mustHaves}>
          <h2>What are your monthly 'Must-Haves'?</h2>
          {/* Bill list */}
          <ul className={styles.billList}>
            {selectedBills.length === 0 && (
              <p className={styles.emptyState}>No bills added yet</p>
            )}

            {selectedBills.map((bill, i) => (
              <li key={i} className={styles.billItem}>
                <div className={styles.billInfo}>
                  <span className={styles.billName}>{bill.name}</span>

                  <span className={styles.billAmount}>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(bill.amount)}
                  </span>
                </div>

                <button
                  className={styles.removeBtn}
                  onClick={() => removeBill(i)}
                  type="button"
                  aria-label={`Remove ${bill.name}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>

          {/* Add bill row */}
          <div className={styles.addBillRow}>
            <input
              placeholder="Bill name (e.g. Groceries)"
              value={currentName}
              onChange={(e) => setCurrentName(e.target.value)}
              className={styles.billNameInput}
            />

            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Amount"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.value)}
              className={styles.billAmountInput}
            />

            <button
              type="button"
              onClick={addBill}
              className={styles.addBtn}
              disabled={!currentName.trim() || currentAmount === ""}
            >
              Add
            </button>
          </div>

          {/* Navigation */}
          <div className={styles.buttonGroup}>
            <button onClick={onBack} className={styles.theBack} type="button">
              Back
            </button>

            <button
              className={styles.theContinue}
              type="button"
              disabled={selectedBills.length === 0}
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
