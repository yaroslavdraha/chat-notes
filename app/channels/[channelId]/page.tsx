import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { cookies } from 'next/headers'
import { AddMessageForm } from '@/components/chat/AddMessageForm'

export default async function Channel({
  params,
}: {
  params: { channelId: string }
}) {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data: messages } = await supabase
    .from('messages')
    .select('id, text, created_at, channel_id, channels(user_id)')
    .eq('channel_id', params.channelId)
    .eq('channels.user_id', session?.user.id)

  return (
    <>
      <div>{messages?.map(({ id, text }) => <div key={id}>{text}</div>)}</div>

      <div>
        <AddMessageForm channelId={params.channelId} />
      </div>
    </>
  )
}
