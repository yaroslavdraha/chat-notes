import { ThemeModeToggle } from '@/components/header/ThemeModeToggle'
import { AccountMenu } from '@/components/header/AccountMenu'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { cookies } from 'next/headers'

export const Header = async (): Promise<JSX.Element> => {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex items-center justify-end py-3 gap-3">
        <ThemeModeToggle />

        {session && <AccountMenu email={session.user.email ?? ''} />}
      </div>
    </header>
  )
}
