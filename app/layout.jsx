import Navbar from '@/components/Navbar/Navbar'
import SmoothScroll from '@/components/SmoothScroll'
import { LanguageProvider } from '@/lib/i18n'

import '@designcodeio/threeui/style.css'
import 'lenis/dist/lenis.css'
import './globals.css'

export const metadata = {
  metadataBase: new URL('https://lubrix.uz'),

  title: {
    default: 'Lubrix — Moy almashtirish va avtoservislar uchun aqlli CRM',
    template: '%s | Lubrix',
  },

  description:
    'Lubrix — moy almashtirish shoxobchalari va avtoservislar uchun zamonaviy CRM platforma. Mijozlar, avtomobillar, xizmatlar, savdo, xodimlar, ombor va filiallaringizni yagona tizimda boshqaring. Biznesingizni avtomatlashtiring va barcha jarayonlarni bir joydan nazorat qiling.',

  applicationName: 'Lubrix',

  authors: [
    {
      name: 'Lubrix',
      url: 'https://lubrix.uz',
    },
  ],

  creator: 'Lubrix',
  publisher: 'Lubrix',

  category: 'Business Software',

  keywords: [
    // Brand
    'Lubrix',
    'Lubrix CRM',
    'Lubrix platformasi',

    'Moy almashtirish CRM',
    'Moy almashtirish dasturi',
    'Moy almashtirish shoxobchasi',
    'Avtoservis CRM',
    'Avtoservis boshqaruv tizimi',
    'Avtoservis dasturi',
    'Avtomobil servis boshqaruvi',

    'CRM tizimi',
    'Mijozlarni boshqarish tizimi',
    'Biznesni boshqarish dasturi',
    'Savdolarni boshqarish',
    'Ombor boshqaruvi',
    'Xodimlarni boshqarish',
    'Filiallarni boshqarish',
    'Ko‘p filialli biznes boshqaruvi',
    'Biznesni avtomatlashtirish',
    'Mijozlar bazasi',
    'Avtomobillar tarixi',
    'Xizmatlar hisobini yuritish',

    'O‘zbekiston CRM',
    'O‘zbekistonda CRM tizimi',
    'O‘zbekiston biznes dasturlari',
    'Avtoservis uchun CRM O‘zbekiston',
    'Moy almashtirish uchun dastur O‘zbekiston',
  ],

  alternates: {
    canonical: '/',
    languages: {
      'uz-UZ': '/',
      'x-default': '/',
    },
  },

  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: '/',
    siteName: 'Lubrix',

    title: 'Lubrix — Avtoservis biznesingizni aqlli boshqaring',

    description:
      'Moy almashtirish markazlari va avtoservislar uchun yagona aqlli CRM platforma. Mijozlar, avtomobillar, xizmatlar, savdo va barcha filiallaringizni bir joydan boshqaring.',

    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lubrix — O‘zbekiston avtoservislari uchun professional CRM',
        type: 'image/jpeg',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title: 'Lubrix — Biznesingizni aqlli boshqaring',

    description:
      'Moy almashtirish shoxobchalari va avtoservislar uchun professional CRM platforma.',

    images: ['/og-image.jpg'],
  },

  icons: {
    icon: [
      {
        url: '/fovicon.png',
        type: 'image/png',
      },
    ],

    shortcut: '/fovicon.png',

    apple: [
      {
        url: '/fovicon.png',
        type: 'image/png',
      },
    ],
  },

  manifest: '/site.webmanifest',

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  appleWebApp: {
    capable: true,
    title: 'Lubrix',
    statusBarStyle: 'black-translucent',
  },

  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },

  referrer: 'strict-origin-when-cross-origin',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#000000',
}

export default function RootLayout({ children }) {
  return (
    <html lang="uz" className="h-full antialiased">
      <body className="min-h-screen flex flex-col ">
        <LanguageProvider>
          <Navbar />

          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  )
}
