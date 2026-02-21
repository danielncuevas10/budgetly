"use client";
import { useState } from "react";
import styles from "./Steps.module.scss";

export default function StepMission({ userName, onNext, onBack }: any) {
  const [mission, setMission] = useState({ title: "", amount: 0 });

  const [presets, setPresets] = useState([
    { title: "Pay my debt" },
    { title: "Saving" },
    { title: "Emergency fund" },
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [newAmount, setNewAmount] = useState<string>("");

  const addCustomMission = () => {
    const title = newTitle.trim();
    const amount = Number(newAmount);
    if (!title) return;
    const newPreset = { title };
    setPresets((p) => [...p, newPreset]);
    setMission({ title, amount: Number.isFinite(amount) ? amount : 0 });
    setNewTitle("");
    setNewAmount("");
  };

  return (
    <>
      <div className={styles.formInput}>
        <h2 className={styles.titleMission}>
          What is your personal mission, {userName}?
        </h2>

        <div className={styles.mission}>
          <div className={styles.presetGrid}>
            {presets.map((p, idx) => (
              <button
                key={`${p.title}-${idx}`}
                onClick={() => setMission({ ...mission, title: p.title })}
                className={mission.title === p.title ? styles.active : ""}
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* New: inline section to create a custom mission (adds to presets & selects it) */}
          <div className={styles.createSection}>
            <h3>Create your own mission</h3>
            <div className={styles.createForm}>
              <input
                className={styles.input}
                placeholder="Mission title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <input
                className={styles.input}
                type="number"
                placeholder="Target amount ($)"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
              />
              <button
                className={styles.addButton}
                type="button"
                onClick={addCustomMission}
                disabled={!newTitle.trim()}
              >
                Add mission
              </button>
            </div>
          </div>

          <div className={styles.customGoal}>
            <input
              placeholder="Or type a custom mission..."
              value={mission.title}
              onChange={(e) =>
                setMission({ ...mission, title: e.target.value })
              }
              className={styles.input}
            />
            <input
              type="number"
              placeholder="Target amount ($)"
              onChange={(e) =>
                setMission({ ...mission, amount: Number(e.target.value) })
              }
              className={styles.input}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button onClick={onBack} className={styles.secondary}>
              Back
            </button>
            <button
              className={styles.primary}
              disabled={!mission.title || mission.amount <= 0}
              onClick={() => onNext(mission)}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
