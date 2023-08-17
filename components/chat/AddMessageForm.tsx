'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { useRouter } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  text: z.string().min(1, {
    message: 'Hey, it cannot be empty',
  }),
})

const supabase = createClientComponentClient<Database>()

type AddMessageFormProps = {
  channelId: string
  onCreate?: () => void
}
export const AddMessageForm = ({
  onCreate,
  channelId,
}: AddMessageFormProps): JSX.Element => {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    // @ts-ignore
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await supabase
      .from('messages')
      .insert([{ text: values.text, channel_id: +channelId }])
      .select()

    form.reset()

    // TODO: Is it an optimal way to update Channel list?
    router.refresh()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row flex-1"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex-1 mr-4">
              <FormControl>
                <Textarea placeholder="Enter a message..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="ml-auto">
          Send
        </Button>
      </form>
    </Form>
  )
}
