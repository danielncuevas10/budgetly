'use server'
import { prisma } from "@/lib/prisma"; 
import { createClient } from "@/utils/supabase/server";

export async function completeOnboarding(formData: any) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error("User not found");

    // Ensure types match your Prisma schema (Int vs Float)
    const payload = {
      monthlyIncome: Math.floor(formData.income ?? 0),
      isFreelancer: formData.isFreelancer ?? false,
      missionTitle: formData.mission ?? null,
      missionGoal: Math.floor(formData.goalAmount ?? 0),
      monthlyContribution: Math.floor(formData.monthlyContribution ?? 0),
      bills: JSON.stringify(formData.mustHaves || []),
      currency: formData.currency || "USD",
      emergencyEnabled: !!formData.emergencyEnabled,
      emergencyTargetMonths: formData.emergencyTargetMonths ? Math.floor(formData.emergencyTargetMonths) : null,
      emergencyTargetAmount: formData.emergencyTargetAmount ? parseFloat(formData.emergencyTargetAmount) : null,
      emergencyAutoContribution: formData.emergencyAutoContribution ? parseFloat(formData.emergencyAutoContribution) : null,
    };

    // PASTE THIS BLOCK BELOW
    await prisma.user.upsert({
      where: { id: user.id },
      create: {
        id: user.id,
        email: user.email,
        name: formData.name,
        onboardingComplete: true,
        onboarding: {
          create: payload,
        },
      },
      update: {
        name: formData.name,
        onboardingComplete: true,
        onboarding: {
          upsert: {
            create: payload,
            update: payload,
          },
        },
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error("Database Error:", error);
    // Return the error code so your UI can react to P2002 if needed
    return { success: false, errorCode: error.code };
  }
}