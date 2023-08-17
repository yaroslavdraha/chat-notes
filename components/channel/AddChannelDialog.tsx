'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { AddChannelForm } from '@/components/channel/AddChannelForm'
import { useState } from 'react'

type AddChannelProps = {
  userId: string
}

export const AddChannelDialog = ({ userId }: AddChannelProps): JSX.Element => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          New channel
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new channel</DialogTitle>
          <DialogDescription>
            A channel help you to organise notes for a particular topic
          </DialogDescription>
        </DialogHeader>
        <div>
          <AddChannelForm userId={userId} onCreate={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
