import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Channels } from '@/components/channel'
import { Database } from '@/types/supabase'
import { Header } from '@/components/header/Header'
import { AddChannelDialog } from '@/components/channel/AddChannelDialog'

export default async function ChannelsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: channels } = await supabase.from('channels').select()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div className="h-full">
      <Header />

      <div className="flex flex-row h-[calc(100%-65px)] pb-5">
        <nav className="flex flex-col justify-between w-[250px] p-6">
          {!!channels?.length && <Channels channels={channels} />}

          {session && <AddChannelDialog userId={session.user.id} />}
        </nav>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
