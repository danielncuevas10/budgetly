"use client";

import styles from "./page.module.scss";
import Button from "@/components/Button";
import Image from "next/image";
import Navbar from "@/app/(landing)/components/Navbar/Navbar";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <div className={styles.page}>
        <div className={styles.textSection}>
          <motion.div
            initial={{ opacity: 0, x: -50 }} // Start faded and slightly left
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1>Finally, a clear view of your money.</h1>

            <p>
              Bank statements tell you what happened. Budgetly tells you what’s
              next. Get total financial clarity in one glance.
            </p>

            <div className={styles.buttonGroup}>
              <Button
                variant="primary"
                text="Get Started"
                href="/login?mode=signup"
              />
              <Button variant="secondary" text="Features" href="#features" />
            </div>
          </motion.div>
        </div>

        <div className={styles.imageSection}>
          <motion.div
            className={styles.imageWrapper}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/images/landing/logo/landing2.png"
              alt="Landing Image"
              fill
              className={styles.landingImg}
              priority
            />
          </motion.div>
        </div>
      </div>

      <div className={styles.features} id="features">
        <div className={styles.featureCard}>
          <motion.div
            className={styles.featurePhone}
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/images/landing/illustrations/features/iPhone1.jpg"
              alt="iPhone"
              width={300}
              height={600}
              className={styles.landingImg}
            />
          </motion.div>

          <motion.div
            className={styles.featureText}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1>Clarity, not complexity.</h1>
            <p>
              Most finance apps are a spreadsheet headache. We stripped the
              noise so you can see exactly where you stand before the coffee's
              finished brewing.
            </p>
          </motion.div>
        </div>
      </div>

      <div className={styles.controlSection} id="control">
        <h1>Master your money. Finally.</h1>
        <p>
          Stop reacting to your bank balance and start commanding it. Turn raw
          data into a clear path toward the life you actually want to live.
        </p>
        <div className={styles.cardsSection}>
          <motion.div
            className={styles.cardInvividual}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/images/landing/illustrations/action/card.png"
              alt="credit card"
              width={300}
              height={600}
              className={styles.controlImg}
            />
            <h3>Track & Understand</h3>
            <p>
              See where your money goes daily. Understand patterns, not just
              numbers.
            </p>
          </motion.div>
          <motion.div
            className={styles.cardInvividual}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/images/landing/illustrations/action/bar.png"
              alt="bar"
              width={300}
              height={600}
              className={styles.controlImg}
            />
            <h3>Plan & Budget</h3>
            <p>Set budgets for each category so you never overspend.</p>
          </motion.div>
          <motion.div
            className={styles.cardInvividual}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/images/landing/illustrations/action/arrow.png"
              alt="iPhone"
              width={300}
              height={600}
              className={styles.controlImg}
            />
            <h3>Optimize & Decide</h3>
            <p>
              Get actionable insights on saving, spending, and investments
              tailored to you.
            </p>
          </motion.div>
        </div>
      </div>

      <div className={styles.safeToSpend} id="safeToSpend">
        <div className={styles.safeCard}>
          <motion.div
            className={styles.safeText}
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1>Safe to Spend</h1>
            <p>
              Our Safe-to-Spend engine calculates your bills, goals, and savings
              automatically. If the app says you can buy it, you really can. No
              math required.
            </p>
            <Button
              text="Get Started"
              href="/login?mode=signup"
              iconSrc="/images/landing/illustrations/safe/arrow.png"
              iconAlt="Arrow right"
              className={styles.buttonSafe}
              iconClassName={styles.arrowOnly}
            />
          </motion.div>

          <motion.div
            className={styles.safePhone}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/images/landing/illustrations/features/iPhone2.png"
              alt="iPhone"
              width={300}
              height={600}
              className={styles.safeImg}
            />
          </motion.div>
        </div>
      </div>

      <div className={styles.testimonials} id="testimonials">
        <div className={styles.testimonialsCard}>
          <h1>Join thousands of confident spenders</h1>
          <p>Read success stories</p>
          <div className={styles.testimonialsGrid}>
            <motion.div
              className={`${styles.card} ${styles.cardLarge}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.21, 1.02, 0.73, 0.99] }}
            >
              <div className={styles.content}>
                <h2>
                  I finally stopped choosing between rent and a social life.
                </h2>
                <Image
                  src="/images/landing/testimonials/quote.svg"
                  alt="iPhone"
                  width={20}
                  height={50}
                  className={styles.safeImg}
                />
                <h4>
                  I never knew what was tax money vs. profit. Budgetly’s
                  personalized baseline fixed that. I just booked my first
                  cash-paid vacation in years.
                </h4>
                <p>Diane Smith</p>
              </div>
            </motion.div>

            <motion.div
              className={`${styles.card} ${styles.cardMedium}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                ease: [0.21, 1.02, 0.73, 0.99],
                delay: 0.15,
              }}
            >
              <div className={styles.content}>
                <h2>From income chaos to total clarity.</h2>
                <Image
                  src="/images/landing/testimonials/quote.svg"
                  alt="iPhone"
                  width={20}
                  height={50}
                  className={styles.safeImg}
                />
                <h4>
                  I used to feel sick spending money. Now, the Safe to Spend
                  number tells me exactly what’s left for fun. I finished the
                  semester with a savings balance for the first time.
                </h4>
                <p>Alejandro Sanchez</p>
              </div>
            </motion.div>

            <motion.div
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                ease: [0.21, 1.02, 0.73, 0.99],
                delay: 0.3,
              }}
            >
              <div className={styles.content}>
                <h2>The end of the 2 AM bank app check.</h2>
                <Image
                  src="/images/landing/testimonials/quote.svg"
                  alt="iPhone"
                  width={20}
                  height={50}
                  className={styles.safeImg}
                />
                <h4>
                  I lived in a financial fog. Budgetly made my data visual and
                  simple. The knot of anxiety in my chest is gone. I finally
                  trust my own decisions.
                </h4>
                <p>Rika Chen</p>
              </div>
            </motion.div>

            <motion.div
              className={`${styles.card} ${styles.cardDark}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                ease: [0.21, 1.02, 0.73, 0.99],
                delay: 0.45,
              }}
            >
              <div className={styles.content}>
                <h2>I finally trust myself with money.</h2>
                <Image
                  src="/images/landing/testimonials/quote.svg"
                  alt="iPhone"
                  width={20}
                  height={50}
                  className={styles.safeImg}
                />
                <h4>
                  I used to second-guess every purchase. Budgetly gave me
                  clarity and confidence. I built savings, stopped overdrafts,
                  and feel calm about my future for the first time.
                </h4>
                <p>Jordan Kim</p>
              </div>
            </motion.div>
          </div>
          <Button
            text="Get Started"
            href="/login?mode=signup"
            iconSrc="/images/landing/illustrations/safe/arrow.png"
            iconAlt="Arrow right"
            className={styles.buttonTestimonial}
            iconClassName={styles.arrowOnly}
          />
        </div>
      </div>

      <div className={styles.vault} id="vault">
        <h1>Your data is a vault. We just provide the key.</h1>
        <p>
          What happens in Budgetly stays in Budgetly, this is why financial life
          is a private conversation. We aren't listening.
        </p>
        <div className={styles.vaultCards}>
          <motion.div
            className={styles.vaultCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
              delay: 0.3,
            }}
          >
            <h2>You hold the only key</h2>
            <Image
              src="/images/landing/vault/shield.png"
              alt="credit card"
              width={200}
              height={300}
              className={styles.vaultImg}
            />
            <p>
              We built a fortress, not a window. We don't see your balances, and
              we don't want to. Your data belongs to you—period.
            </p>
          </motion.div>
          <hr className={styles.vaultDivider} />
          <motion.div
            className={styles.vaultCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
              delay: 0.3,
            }}
          >
            <h2>Invisible to Us</h2>
            <Image
              src="/images/landing/vault/eye.png"
              alt="credit card"
              width={200}
              height={300}
              className={styles.vaultImg}
            />
            <p>
              We don't peek at your balances or track where you shop. Your data
              is encrypted so that it’s invisible to the world.
            </p>
          </motion.div>
          <hr className={styles.vaultDivider} />
          <motion.div
            className={styles.vaultCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
              delay: 0.3,
            }}
          >
            <h2>Your data isn't our business.</h2>
            <Image
              src="/images/landing/vault/lock.png"
              alt="credit card"
              width={200}
              height={300}
              className={styles.vaultImg}
            />
            <p className={styles.vaultP}>
              Most "free" apps sell your habits to the highest bidder. We give
              you a tool. Your business stays your business.
            </p>
          </motion.div>
        </div>
      </div>

      <div className={styles.ready}>
        <h1>Ready to take control of your finances?</h1>
        <p>
          Join 1,000+ users who are already saving money and building better
          financial habits.
        </p>
        <div className={styles.readyButtons}>
          <Button
            text="Get Started"
            href="/login?mode=signup"
            iconSrc="/images/landing/illustrations/safe/arrow.png"
            iconAlt="Arrow right"
            className={styles.buttonVault}
            iconClassName={styles.arrowOnly}
          />
          <Button
            text="Get Started"
            href="/login?mode=signup"
            iconAlt="Arrow right"
            className={styles.buttonVault2}
          />
        </div>
        <p>No credit card required. At your own Pace. Total control.</p>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerSection}>
          <div className={`{styles.footerSections} ${styles.footerMain}`}>
            <h1>Budgetly</h1>
            <p>Making personal finance simple and accessible for everyone.</p>
          </div>
          <div className={styles.footerSections}>
            <h2>Product</h2>
            <p>Features</p>
            <p>Security</p>
          </div>
          <div className={styles.footerSections}>
            <h2>Company</h2>
            <p>About us</p>
            <p>Contact us</p>
          </div>
        </div>
        <div className={styles.lastFooter}>
          <hr className={styles.footerLine} />
          <div className={styles.footerBottom}>
            <p>© 2026 Budgetly. All rights reserved.</p>
            <p className={styles.designedBy}>
              Designed and developed by The Cave.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
