'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { prisma } from '@/lib/prisma'

/**
 * LOGIN ACTION
 */
export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email')?.toString().trim()
  const password = formData.get('password')?.toString().trim()

  if (!email || !password) {
    redirect('/login?error=' + encodeURIComponent('Email and password are required'))
  }

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // This is where "Email not confirmed" or "Invalid credentials" errors come from
    redirect('/login?error=' + encodeURIComponent(error.message))
  }

  const user = authData.user
  if (!user) redirect('/login?error=User not found')

  // Check Prisma onboarding status
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { onboardingComplete: true }
  })

  // If user doesn't exist in Prisma yet, or hasn't finished onboarding
  if (!dbUser || dbUser.onboardingComplete === false) {
    redirect('/onboarding')
  }

  redirect('/dashboard')
}

/**
 * SIGNUP ACTION
 */
export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email')?.toString().trim()
  const password = formData.get('password')?.toString().trim()

  if (!email || !password) {
    redirect('/login?mode=signup&error=Email and password are required')
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Ensures they come back to your site after clicking the email link
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
    },
  })

  if (error) {
    redirect('/login?mode=signup&error=' + encodeURIComponent(error.message))
  }

  redirect('/login?message=' + encodeURIComponent('Check your email to confirm your account!'))
}

/**
 * RESET PASSWORD ACTION (Phase 1: Send Email)
 */
export async function resetPassword(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email')?.toString().trim()

  if (!email) {
    redirect('/login?mode=reset&error=Email is required')
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm?next=/update-password`,
  })

  if (error) {
    redirect('/login?mode=reset&error=' + encodeURIComponent(error.message))
  }

  redirect('/login?message=' + encodeURIComponent('Check your email for the reset link!'))
}

/**
 * UPDATE PASSWORD ACTION (Phase 2: Save New Password)
 * This is called from your /update-password page
 */
export async function updatePassword(formData: FormData) {
  const supabase = await createClient()
  const password = formData.get('password')?.toString().trim()

  if (!password) {
    redirect('/update-password?error=Password is required')
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  })

  if (error) {
    redirect('/update-password?error=' + encodeURIComponent(error.message))
  }

  // Success! Send them to the dashboard or a "success" page
  redirect('/dashboard?message=' + encodeURIComponent('Password updated successfully!'))
}