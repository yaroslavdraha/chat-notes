'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

type AccountMenuProps = {
  email: string
  name?: string
}

const supabase = createClientComponentClient()

export const AccountMenu = ({
  email,
  name = 'Yaroslav Draha',
}: AccountMenuProps): JSX.Element => {
  const { push } = useRouter()
  const fallbackText = email.substring(0, 2).toUpperCase()

  const signOut = async () => {
    await supabase.auth.signOut()
    push('/auth')
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild={true}>
          <Avatar className="hover:cursor-pointer w-7 h-7">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="text-sm">{fallbackText}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <p>{name}</p>
            <p className="font-normal text-xs">{email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="hover:cursor-pointer" onClick={signOut}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
