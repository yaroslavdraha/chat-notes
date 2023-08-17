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
import { Input } from '@/components/ui/input'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  channelName: z.string().min(1, {
    message: 'Hey, it cannot be empty',
  }),
})

const supabase = createClientComponentClient<Database>()

type AddChannelFormProps = {
  userId: string
  onCreate: () => void
}
export const AddChannelForm = ({
  userId,
  onCreate,
}: AddChannelFormProps): JSX.Element => {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    // @ts-ignore
    resolver: zodResolver(formSchema),
    defaultValues: {
      channelName: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { data, error } = await supabase
      .from('channels')
      .insert([{ name: values.channelName, user_id: userId }])
      .select()

    // todo: show error

    const newChannel = data?.[0]

    onCreate()
    // TODO: Is it an optimal way to update Channel list?
    if (newChannel) {
      router.push(`/channels/${newChannel?.id}`)
    }

    router.refresh()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="channelName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Channel name"
                  {...field}
                  className="outline-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="ml-auto">
          Create
        </Button>
      </form>
    </Form>
  )
}
