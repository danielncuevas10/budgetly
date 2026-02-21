// app/dashboard/components/TransactionList.tsx
"use client";

import styles from "./TransactionList.module.scss";

type Transaction = {
  id: string;
  description: string;
  amount: number;
  bucket?: string;
  direction: "IN" | "OUT";
  createdAt: Date;
};

type Props = {
  transactions: Transaction[];
};

export default function TransactionList({ transactions }: Props) {
  const fmt = (v: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(v);

  return (
    <section className={styles.activitySection}>
      <ul className={styles.list}>
        {transactions.map((t) => (
          <li key={t.id} className={styles.item}>
            <div className={styles.info}>
              <span className={styles.desc}>{t.description}</span>
              <span className={styles.date}>
                {new Date(t.createdAt).toLocaleDateString("en-US")}
              </span>
            </div>
            <div className={styles.actions}>
              <span
                className={
                  t.direction === "IN" ? styles.income : styles.expense
                }
              >
                {t.direction === "OUT" ? "-" : ""}
                {fmt(Math.abs(t.amount))}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
