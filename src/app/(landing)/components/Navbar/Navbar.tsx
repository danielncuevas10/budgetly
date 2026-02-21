import styles from "./Navbar.module.scss";
import Link from "next/link";
import Button from "@/components/Button";

export default function Navbar() {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <h1>
            <Link href="#landing">Budgetly</Link>
          </h1>
        </div>

        <ul className={styles.navLinks}>
          <li>
            <Link href="#features">Features</Link>
          </li>
          <li>
            <Link href="#control">Take Control</Link>
          </li>
          <li>
            <Link href="#safeToSpend">Safe to Spend</Link>
          </li>
        </ul>
        <div className={styles.cta}>
          <Button variant="primary" text="Log In" href="/login?mode=signin" />
        </div>
      </div>
    </>
  );
}
