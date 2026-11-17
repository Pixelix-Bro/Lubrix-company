import Navbar from '@/components/Navbar/Navbar'
import SmoothScroll from '@/components/SmoothScroll'
import CustomIntro from '@/components/Start'
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
    'Lubrix — moy almashtirish shoxobchalari va avtoservislar uchun zamonaviy CRM platforma. Mijozlar, avtomobillar, xizmatlar, savdo, xodimlar va filiallaringizni yagona tizimda boshqaring. Biznesingizni avtomatlashtiring va barcha jarayonlarni bir joydan nazorat qiling.',

  applicationName: 'Lubrix',

  authors: [
    {
      name: 'Lubrix',
      url: 'https://lubrix.uz',
    },
  ],

  creator: 'Lubrix',
  publisher: 'Lubrix',

  category: 'Biznes dasturiy ta’minoti',

  keywords: [
    // Brend
    'Lubrix',
    'Lubrix CRM',
    'Lubrix platformasi',

    // Asosiy xizmatlar
    'Moy almashtirish CRM',
    'Moy almashtirish dasturi',
    'Moy almashtirish shoxobchasi',
    'Avtoservis CRM',
    'Avtoservis boshqaruv tizimi',
    'Avtoservis dasturi',
    'Avtomobil servis boshqaruvi',

    // Biznes boshqaruvi
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

    // O‘zbekiston bozori
    'O‘zbekiston CRM',
    'O‘zbekistonda CRM tizimi',
    'O‘zbekiston biznes dasturlari',
    'Avtoservis uchun CRM O‘zbekiston',
    'Moy almashtirish uchun dastur O‘zbekiston',
  ],

  alternates: {
    canonical: 'https://lubrix.uz/',
    languages: {
      'uz-UZ': 'https://lubrix.uz/',
      'x-default': 'https://lubrix.uz/',
    },
  },

  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: 'https://lubrix.uz/',
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
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],

    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],

    shortcut: '/favicon.ico',
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


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white  bg-black">
        <CustomIntro />
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
