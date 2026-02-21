import { updatePassword } from "../login/actions";
import styles from "../login/page.module.scss";

export default function UpdatePasswordPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <main className={styles.login}>
      <div className={styles.formInput}>
        <h1>Create New Password</h1>
        <p>Enter your new password below to regain access.</p>

        <form action={updatePassword}>
          <div className={styles.theForm}>
            <label htmlFor="password">New Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Min 8 characters"
              style={{ width: "100%" }}
            />
            {searchParams.error && (
              <p style={{ color: "red", fontSize: "0.8rem" }}>
                {decodeURIComponent(searchParams.error)}
              </p>
            )}
          </div>
          <div className={styles.buttonCont}>
            <button type="submit" className={styles.cta}>
              Update Password
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
