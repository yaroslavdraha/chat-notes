'use client'

import { Database } from '@/types/supabase'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type ChannelsProps = {
  channels: Database['public']['Tables']['channels']['Row'][]
}

export const Channels = ({ channels }: ChannelsProps) => {
  const { push } = useRouter()
  const params = useParams()
  const channelId = +params.channelId

  return (
    <div className="flex flex-col gap-2">
      {channels?.map(({ name, id }) => (
        <Button
          key={id}
          className="w-full justify-start px-5"
          variant={channelId === id ? 'default' : 'ghost'}
          onClick={() => push(`/channels/${id}`)}
        >
          {name}
        </Button>
      ))}
    </div>
  )
}
