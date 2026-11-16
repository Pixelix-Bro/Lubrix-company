'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'

const features = [
  {
    title: 'Customer Management',
    subtitle: 'CUSTOMER EXPERIENCE',
    text: 'Mijozlaringiz, avtomobillari va xizmat ko‘rsatish tarixini yagona ekotizimda boshqaring. Har bir mijoz haqida to‘liq ma’lumot doimo qo‘lingizda.',
    img: '/features/customer.avif',
    number: '01',
  },
  {
    title: 'Branch Management',
    subtitle: 'CENTRALIZED CONTROL',
    text: 'Barcha filiallaringizni yagona platformaga birlashtiring. Xodimlar, xizmatlar, operatsiyalar va natijalarni real vaqt rejimida nazorat qiling.',
    img: '/features/branch.avif',
    number: '02',
  },
  {
    title: 'Financial Analytics',
    subtitle: 'BUSINESS INTELLIGENCE',
    text: 'Daromad, xarajat, sof foyda va savdo ko‘rsatkichlarini chuqur tahlil qiling. Biznesingizning haqiqiy holatini raqamlar orqali ko‘ring.',
    img: '/features/finance.avif',
    number: '03',
  },
  {
    title: 'AI Assistant',
    subtitle: 'INTELLIGENCE REDEFINED',
    text: 'Sun’iy intellekt yordamida biznesingizni tahlil qiling, muammolarni aniqlang va rivojlanishingiz uchun aqlli tavsiyalar oling.',
    img: '/features/ai.avif',
    number: '04',
  },
]

function Feature({ item, index, progress }) {
  const total = features.length

  const start = index / total
  const end = (index + 1) / total
  const gap = 0.035

  const opacityRange =
    index === 0
      ? [0, end, Math.min(1, end + gap)]
      : index === total - 1
        ? [Math.max(0, start - gap), start, 1]
        : [Math.max(0, start - gap), start, end, Math.min(1, end + gap)]

  const opacityValues = index === 0 ? [1, 1, 0] : index === total - 1 ? [0, 1, 1] : [0, 1, 1, 0]

  const opacity = useTransform(progress, opacityRange, opacityValues)

  const scale = useTransform(progress, [start, end], [1.02, 1.09])

  const imageY = useTransform(progress, [start, end], [12, -12])

  const textY = useTransform(
    progress,
    [Math.max(0, start - 0.03), Math.min(1, start + 0.08)],
    [24, 0]
  )

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity }}
    >
      {/* BACKGROUND */}

      <motion.div
        className="absolute inset-0"
        style={{
          scale,
          y: imageY,
          backgroundImage: `url(${item.img})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* SOFT OVERLAY */}

      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />

      {/* CONTENT */}

      <motion.div style={{ y: textY }} className="absolute inset-0 z-10 flex items-center">
        <div className="mx-auto w-[84%] max-w-[1400px]">
          <div className="max-w-[760px]">
            {/* EYEBROW */}

            <div className="mb-7 flex items-center gap-4">
              <div className="h-px w-12 bg-white/40" />

              <span className="text-[10px] font-medium tracking-[0.28em] text-white/55">
                {item.subtitle}
              </span>
            </div>

            {/* TITLE */}

            <h2 className="max-w-[760px] text-[clamp(3.2rem,7vw,6.8rem)] font-medium leading-[0.94] tracking-[-0.065em] text-white">
              {item.title}
            </h2>

            {/* DESCRIPTION */}

            <div className="mt-10 max-w-[470px] border-l border-white/25 pl-6">
              <p className="text-sm leading-8 text-white/70 md:text-base">{item.text}</p>

              <div className="mt-6 flex items-center gap-4">
                <span className="text-[9px] tracking-[0.24em] text-white/45">LUBRIX PLATFORM</span>

                <span className="text-sm text-white/60">↗</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function SectionThree() {
  const sectionRef = useRef(null)

  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const index = Math.min(features.length - 1, Math.floor(value * features.length))

    setActive((prev) => (prev === index ? prev : index))
  })

  return (
    <section ref={sectionRef} className="relative h-[400vh] bg-black text-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* FEATURES */}

        {features.map((item, index) => (
          <Feature key={item.number} item={item} index={index} progress={scrollYProgress} />
        ))}

        {/* MINIMAL PROGRESS */}

        <div className="absolute bottom-10 left-[8%] z-30 flex items-center gap-5">
          <span className="text-[11px] tabular-nums tracking-widest text-white/75">
            {features[active].number}
          </span>

          <div className="relative h-px w-24 overflow-hidden bg-white/20 md:w-32">
            <motion.div
              className="absolute inset-y-0 left-0 w-full origin-left bg-white"
              style={{
                scaleX: scrollYProgress,
              }}
            />
          </div>

          <span className="text-[11px] tracking-widest text-white/35">04</span>
        </div>
      </div>
    </section>
  )
}
