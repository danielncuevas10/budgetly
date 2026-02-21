// app/auth/confirm/route.ts
import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'

  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')

  if (token_hash && type) {
    const supabase = await createClient()

    // This is the "Magic Moment" - it exchanges the email token for a session
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (!error) {
      // If the link was for a password reset, they go to /update-password
      // If it was for a signup, they go to /onboarding (or whatever 'next' is)
      return NextResponse.redirect(redirectTo)
    }
  }

  // If the link is expired or invalid, send them back to login with a message
  return NextResponse.redirect('/login?error=Invalid or expired link')
}