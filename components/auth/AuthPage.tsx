'use client'

import { Auth } from '@supabase/auth-ui-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'

const supabase = createClientComponentClient()

export const AuthPage = (): JSX.Element => {
  const { push } = useRouter()
  const { theme } = useTheme()

  useEffect(() => {
    supabase.auth.onAuthStateChange((status) => {
      if (status === 'SIGNED_IN') {
        push('/')
      }
    })
  }, [])

  return (
    <div className="py-10 px-2">
      <div className="w-[300px]">
        <div className="py-4 text-center">
          <p className="text-2xl">Welcome to ChatNotes!</p>
          <p className="text-sm">Please sign in or sign up to use the app</p>
        </div>

        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['github', 'google']}
          theme={theme === 'dark' ? 'dark' : 'default'}
        />
      </div>
    </div>
  )
}
