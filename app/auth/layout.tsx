import { Header } from '@/components/header/Header'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full flex flex-col">
      <Header />

      <div className="flex flex-1 items-center justify-center">{children}</div>
    </div>
  )
}
