"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  // Creating the client inline to bypass file-path errors
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh(); // Refresh the server-side Navbar
    router.push("/"); // Go back to landing page
  };

  return (
    <button onClick={handleLogout} className="logout-trigger">
      Log Out
    </button>
  );
}
