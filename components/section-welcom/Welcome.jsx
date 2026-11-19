'use client'

import FlexCarousel from '@/components/ui/FlexCarousel'
import GridBackground from '@/components/ui/GridBackground'
import { useLanguage } from '@/lib/i18n'

export default function Welcome() {
  const { language } = useLanguage()
  const items = [
    {
      src: '/allbum/album1.avif',
      alt: language === 'en' ? 'Lubrix CRM dashboard' : 'Lubrix CRM boshqaruv paneli',
      title: language === 'en' ? 'Smart management' : 'Aqlli boshqaruv',
      subtitle:
        language === 'en'
          ? 'Manage your business in one system'
          : 'Biznesingizni yagona tizimda boshqaring',
    },
    {
      src: '/allbum/album2.avif',
      alt:
        language === 'en'
          ? 'Lubrix customer and vehicle management'
          : 'Lubrix mijozlar va avtomobillar boshqaruvi',
      title: language === 'en' ? 'Customer experience' : 'Mijozlar tajribasi',
      subtitle: language === 'en' ? 'Every customer matters' : 'Har bir mijoz biz uchun muhim',
    },
    {
      src: '/allbum/album3.avif',
      alt: language === 'en' ? 'Lubrix inventory control' : 'Lubrix ombor va mahsulotlar nazorati',
      title: language === 'en' ? 'Inventory control' : 'Ombor nazorati',
      subtitle:
        language === 'en' ? 'Manage products completely' : 'Mahsulotlarni to‘liq boshqarish',
    },
    {
      src: '/allbum/album4.avif',
      alt:
        language === 'en'
          ? 'Lubrix finance analysis and sales statistics'
          : 'Lubrix moliyaviy tahlil va savdo statistikasi',
      title: language === 'en' ? 'Business analytics' : 'Biznes tahlili',
      subtitle: language === 'en' ? 'Clear data for growth' : 'Rivojlanish uchun aniq ma’lumotlar',
    },
    {
      src: '/allbum/album5.avif',
      alt:
        language === 'en'
          ? 'Lubrix artificial intelligence assistant'
          : 'Lubrix sun’iy intellekt yordamchisi',
      title: language === 'en' ? 'Artificial intelligence' : 'Sun’iy intellekt',
      subtitle:
        language === 'en'
          ? 'A new era of business management'
          : 'Biznes boshqaruvining yangi davri',
    },
  ]
  return (
    <section
      id="about"
      data-theme="light"
      className="
      h-[110vh]

        w-full relative flex flex-col items-center justify-center text-black
        gap-[40px] sm:gap-[60px] lg:gap-[100px]
        pt-[50px] pb-[50px] lg:pt-0 lg:pb-0
      "
    >
      <GridBackground />
      {/* HEAD */}
      <div className="head w-full items-center mt-[20px] flex flex-col gap-[16px] lg:gap-[20px] justify-center px-5">
        <h2
          className="
            font-bold text-center
            text-[40px] tracking-[8px]
            sm:text-[56px] sm:tracking-[14px]
            lg:text-[70px] lg:tracking-[20px]
          "
        >
          Lubrix
        </h2>
        <p className="w-full max-w-2xl text-[14px] sm:text-[15px] lg:text-[16px] text-center">
          {language === 'en'
            ? 'Lubrix is a professional CRM for oil-change centers. Manage all branches in one system and control your business quickly and efficiently.'
            : 'Lubrix — moy almashtirish shoxobchalari uchun professional CRM. Barcha filiallaringizni yagona tizimda boshqaring. Biznesingizni oson, tez va samarali nazorat qiling.'}
        </p>
      </div>

      {/* CONTENT */}
      <div
        className="
          flex w-[92%] sm:w-[88%] lg:w-[80%]
          flex-col lg:flex-row
          items-stretch lg:items-start
          justify-between gap-[36px] lg:gap-0
        "
      >
        {/* CAROUSEL */}
        <div className="w-full lg:w-[50%] ">
          <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[560px]">
            <FlexCarousel
              items={items}
              preset="liquid"
              intro="rise"
              cardHeight={0.5}
              gap={12}
              squeeze={0.2}
              focusOnClick
              captions
              fit="natural"
              radius={0}
              lensWidth={0.74}
              lensHeight={1.18}
              tilt={62}
              roundness={1}
              bend={0.34}
              reach={0.38}
              curl="twist"
              dispersion={0.45}
              liquid={0}
              followCursor={false}
              autoplay={false}
              interval={4}
              captureWheel
            />
          </div>
        </div>

        {/* TEXT */}
        <div className="flex flex-col w-full lg:w-[40%] gap-[14px] lg:gap-[20px]">
          <h3 className="text-[22px] tracking-[4px] sm:text-[26px] sm:tracking-[5px] lg:text-[30px] lg:tracking-[6px]">
            {language === 'en' ? 'About Lubrix' : 'Lubrix haqida'}
          </h3>
          <p className="text-[14px] sm:text-[15px] lg:text-[16px]">
            {language === 'en'
              ? 'Lubrix is a modern CRM platform for oil-change centers. Manage customers, sales, inventory, finance, and branches in one system. Automate your business, save time, and improve efficiency.'
              : 'Lubrix — moy almashtirish shoxobchalari uchun zamonaviy CRM platformasi. Mijozlar, savdo, ombor, moliya va filiallarni yagona tizimda boshqarish imkonini beradi. Biznesingizni avtomatlashtiring, vaqtni tejang va samaradorlikni oshiring.'}
          </p>
        </div>
      </div>
    </section>
  )
}
