export default function ChannelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full my-0 mx-auto w-[700px] flex-col justify-between">
      {children}
    </div>
  )
}
