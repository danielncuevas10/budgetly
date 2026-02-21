"use client";

import { useState } from "react";
import styles from "./Steps.module.scss";

interface StepProps {
  onNext: (name: string) => void;
  value: string;
}

export default function StepName({ onNext, value }: StepProps) {
  const [name, setName] = useState(value || "");

  const isDisabled = (name || "").trim().length < 2;

  return (
    <>
      <div className={styles.formInput}>
        <h1>First, what should we call you?</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Please type in your name"
        />

        <button
          disabled={isDisabled}
          onClick={() => onNext(name)}
          className={isDisabled ? styles.btnDisabled : styles.btnActive}
        >
          Continue
        </button>
      </div>
    </>
  );
}
