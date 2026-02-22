'use server';
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addTransaction(data: {
  description: string;
  amount: number;
  type?: "income" | "expense" | "NEXT_MONTH_RESERVE";
  isSalary?: boolean;
  bucket?: string;
  direction?: "IN" | "OUT";
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  await prisma.transaction.create({
    data: {
      userId: user.id,
      description: data.description,
      amount: data.type === "expense" ? -Math.abs(data.amount) : Math.abs(data.amount),
      type: data.isSalary ? "NEXT_MONTH_RESERVE" : data.type || "expense",
      bucket: data.bucket || "",       // <-- default to empty string
      direction: data.direction || "", // <-- default to empty string
    },
  });

  revalidatePath("/dashboard");
}


export async function deleteTransaction(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Only delete if the transaction belongs to the logged-in user
  await prisma.transaction.delete({
    where: { 
      id,
      userId: user.id // This ensures I can't delete your stuff!
    },
  });
  revalidatePath("/dashboard");
}

