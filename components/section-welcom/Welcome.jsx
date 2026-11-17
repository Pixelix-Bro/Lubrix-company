import FlexCarousel from '@/components/ui/FlexCarousel'

export default function Welcome() {
  const items = [
    {
      src: '/allbum/album1.avif',
      alt: 'Lubrix CRM boshqaruv paneli',
      title: 'Aqlli boshqaruv',
      subtitle: 'Biznesingizni yagona tizimda boshqaring',
    },
    {
      src: '/allbum/album2.avif',
      alt: 'Lubrix mijozlar va avtomobillar boshqaruvi',
      title: 'Mijozlar tajribasi',
      subtitle: 'Har bir mijoz biz uchun muhim',
    },
    {
      src: '/allbum/album3.avif',
      alt: 'Lubrix ombor va mahsulotlar nazorati',
      title: 'Ombor nazorati',
      subtitle: 'Mahsulotlarni to‘liq boshqarish',
    },
    {
      src: '/allbum/album4.avif',
      alt: 'Lubrix moliyaviy tahlil va savdo statistikasi',
      title: 'Biznes tahlili',
      subtitle: 'Rivojlanish uchun aniq ma’lumotlar',
    },
    {
      src: '/allbum/album5.avif',
      alt: 'Lubrix sun’iy intellekt yordamchisi',
      title: 'Sun’iy intellekt',
      subtitle: 'Biznes boshqaruvining yangi davri',
    },
  ]
  return (
    <section
      data-theme="light"
      className="w-full  relative flex-col items-center flex   gap-[100px]   text-black "
    >
      <div className="head w-full items-center mt-[20px] flex flex-col gap-[20px] justify-center">
        <h2 className="tracking-[20px] font-bold text-[70px]">Lubrix</h2>
        <p className="w-2xl text-[16px] text-center">
          Lubrix — moy almashtirish shoxobchalari uchun professional CRM. Barcha filiallaringizni
          yagona tizimda boshqaring. Biznesingizni oson, tez va samarali nazorat qiling.
        </p>
      </div>
      <div className="flex w-[80%]  justify-between i">
        <div className="w-[50%] ">
          <div style={{ width: '100%', height: '560px', position: 'relative' }}>
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
        <div className="flex flex-col w-[40%] gap-[20px]">
          <h3 className="text-[30px] tracking-[6px]">Lubrix About</h3>
          <p>
            Lubrix — moy almashtirish shoxobchalari uchun zamonaviy CRM platformasi. Mijozlar,
            savdo, ombor, moliya va filiallarni yagona tizimda boshqarish imkonini beradi.
            Biznesingizni avtomatlashtiring, vaqtni tejang va samaradorlikni oshiring.
          </p>
        </div>
      </div>
    </section>
  )
}
