import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import LogoutButton from "./LogoutButton";
import styles from "./Navbar.module.scss";

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get the first letter of the email
  const initial = user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/dashboard">Budgetly</Link>
      </div>

      <div className={styles.navActions}>
        {user ? (
          <div className={styles.profileArea}>
            <div className={styles.avatar}>{initial}</div>
            <div className={styles.userDropdown}>
              <LogoutButton />
            </div>
          </div>
        ) : (
          <Link href="/login?mode=signin" className={styles.loginBtn}>
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
}
