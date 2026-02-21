"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StepName from "./components/StepName";
import StepIncome from "./components/StepIncome";
import StepBills from "./components/StepBills";
import StepMission from "./components/StepMission";
import StepEffort from "./components/StepEffort";
import { completeOnboarding } from "./actions";
import styles from "./components/Steps.module.scss";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";

interface OnboardingData {
  name: string;
  income: number;
  isFreelancer: boolean;
  currency: string;
  mustHaves: Bill[];
  mission: string;
  goalAmount: number;
  monthlyContribution: number;
}

interface Bill {
  name: string;
  amount: number;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);

  const [formData, setFormData] = useState<OnboardingData>({
    name: "",
    income: 0,
    isFreelancer: false,
    currency: "USD",
    mustHaves: [],
    mission: "",
    goalAmount: 0,
    monthlyContribution: 0,
  });

  const nextStep = () => {
    setDirection(1);
    setStep((prev) => prev + 1);
  };
  const prevStep = () => {
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const variants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  // 2. Use "easeInOut" for a professional, smooth feel
  const transition: Transition = {
    x: { type: "tween", ease: "easeInOut", duration: 0.4 },
    opacity: { duration: 0.3 },
  };

  const updateData = (newData: Partial<OnboardingData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <main className={styles.login}>
      {/* 1. STATIC SIDEBAR: Now it stays glued to the left edge */}
      <div className={styles.leftSide}>
        <div className={styles.text}>
          <h1>Budgetly</h1>
          <p>Take control of your finances with Budgetly.</p>
        </div>
      </div>

      {/* 2. ANIMATED AREA: Only the form content moves */}
      <div className={styles.formInput}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "transparent",
            }}
          >
            {step === 1 && (
              <StepName
                value={formData.name}
                onNext={(name: string) => {
                  updateData({ name });
                  nextStep();
                }}
              />
            )}

            {step === 2 && (
              <StepIncome
                userName={formData.name}
                onBack={prevStep}
                onNext={(
                  income: number,
                  isFreelancer: boolean,
                  currency: string
                ) => {
                  updateData({ income, isFreelancer, currency });
                  nextStep();
                }}
              />
            )}

            {step === 3 && (
              <StepBills
                onBack={prevStep}
                onNext={(mustHaves: any[]) => {
                  updateData({ mustHaves });
                  nextStep();
                }}
              />
            )}

            {step === 4 && (
              <StepMission
                userName={formData.name}
                onBack={prevStep}
                onNext={(missionData: { title: string; amount: number }) => {
                  updateData({
                    mission: missionData.title,
                    goalAmount: missionData.amount,
                  });
                  nextStep();
                }}
              />
            )}

            {step === 5 && (
              <StepEffort
                userName={formData.name}
                formData={formData}
                onBack={prevStep}
                onNext={async (contribution: number) => {
                  updateData({ monthlyContribution: contribution });

                  const result = await completeOnboarding({
                    ...formData,
                    monthlyContribution: contribution,
                  });

                  if (result.success) {
                    router.push("/dashboard");
                  }
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
        {/*<pre
          style={{
            background: "#000",
            color: "#0b0",
            padding: "10px",
            marginTop: "20px",
          }}
        >
          {JSON.stringify(formData, null, 2)}
        </pre>*/}
      </div>
    </main>
  );
}
