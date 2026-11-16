import Navbar from '@/components/Navbar/Navbar'
import SmoothScroll from '@/components/SmoothScroll'
import '@designcodeio/threeui/style.css'
import 'lenis/dist/lenis.css'
import './globals.css'

export const metadata = {
  title: 'Lubrix ',
  description: 'Lubrix',
  icons: {
    icon: '/fovicon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white  bg-black">
        <Start />
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
