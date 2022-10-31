import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>CUAN</title>
        <meta name="description" content="Could Use A Name (CUAN) infsec blog" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-slate-900 text-white">
        {children}
      </body>
    </html>
  )
}
