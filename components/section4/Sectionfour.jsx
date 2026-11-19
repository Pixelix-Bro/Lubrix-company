'use client'

import { useEffect, useRef, useState } from 'react'

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'

import GridBackground from '@/components/ui/GridBackground'
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  Cloud,
  CreditCard,
  Gauge,
  LayoutDashboard,
  Package,
  ShieldCheck,
  Smartphone,
  Users,
  Zap,
} from 'lucide-react'
// ======================================================
// LUBRIX — WHITE LUXURY ECOSYSTEM
// ======================================================

const features = [
  {
    number: '01',
    category: 'Management',
    title: 'Aqlli boshqaruv',
    description: 'Barcha biznes jarayonlaringizni yagona platformadan boshqaring.',
    icon: LayoutDashboard,
  },
  {
    number: '02',
    category: 'Analytics',
    title: 'Real-time statistika',
    description: 'Daromad, xarajat va biznes ko‘rsatkichlarini real vaqtda kuzating.',
    icon: BarChart3,
  },
  {
    number: '03',
    category: 'CRM',
    title: 'Mijozlar bazasi',
    description: 'Mijozlar, avtomobillar va xizmat ko‘rsatish tarixini boshqaring.',
    icon: Users,
  },
  {
    number: '04',
    category: 'Inventory',
    title: 'Ombor nazorati',
    description: 'Mahsulotlar qoldig‘i va kirim-chiqim jarayonlarini nazorat qiling.',
    icon: Package,
  },
  {
    number: '05',
    category: 'Performance',
    title: 'Tezkor xizmat',
    description: 'Xizmat ko‘rsatish jarayonlarini soddalashtiring va tezlashtiring.',
    icon: Zap,
  },
  {
    number: '06',
    category: 'Security',
    title: 'Xavfsiz tizim',
    description: 'Ma’lumotlaringizni himoyalashga yo‘naltirilgan mexanizmlardan foydalaning.',
    icon: ShieldCheck,
  },
  {
    number: '07',
    category: 'Finance',
    title: 'To‘lovlar nazorati',
    description: 'Moliyaviy operatsiyalar va to‘lovlarni bir joyda kuzating.',
    icon: CreditCard,
  },
  {
    number: '08',
    category: 'Team',
    title: 'Xodimlar boshqaruvi',
    description: 'Jamoa, vazifalar va ish jarayonlarini samarali boshqaring.',
    icon: Users,
  },
  {
    number: '09',
    category: 'Notifications',
    title: 'Avtomatik eslatmalar',
    description: 'Muhim vazifalar va jarayonlar haqida o‘z vaqtida xabardor bo‘ling.',
    icon: Bell,
  },
  {
    number: '10',
    category: 'Responsive',
    title: 'Har qanday qurilmada',
    description: 'Kompyuter, planshet va smartfon orqali foydalaning.',
    icon: Smartphone,
  },
  {
    number: '11',
    category: 'Monitoring',
    title: 'Tezkor monitoring',
    description: 'Ish jarayonlari va xizmatlar holatini doimiy kuzatib boring.',
    icon: Gauge,
  },
  {
    number: '12',
    category: 'Cloud System',
    title: 'Bulutli infratuzilma',
    description: 'Ma’lumotlaringizga internet mavjud bo‘lgan joydan kiring.',
    icon: Cloud,
  },
]

// ======================================================
// FEATURE CARD
// ======================================================

function FeatureCard({ feature, index }) {
  const Icon = feature.icon

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.85,
        delay: (index % 4) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group relative flex shrink-0 flex-col
        justify-between overflow-hidden
        h-[330px] w-[285px]
        border border-[#EAEAEA]
        bg-white p-7
        transition-all duration-700
        hover:border-[#AFAFAF]
        sm:h-[350px] sm:w-[320px] sm:p-8
        lg:w-[350px]
      "
    >
      {/* TOP */}

      <div className="flex items-center justify-between">
        <div
          className="
            flex h-12 w-12 items-center justify-center
            border border-[#EAEAEA]
            text-[#171717]
            transition-all duration-500
            group-hover:bg-black
            group-hover:text-white
          "
        >
          <Icon size={21} strokeWidth={1.35} />
        </div>

        <span
          className="
          font-mono text-[11px]
          tracking-[0.15em] text-[#AAAAAA]
        "
        >
          / {feature.number}
        </span>
      </div>

      {/* BOTTOM */}

      <div>
        <div
          className="
          mb-5 flex items-center gap-2
          text-[10px] uppercase
          tracking-[0.23em] text-[#999999]
        "
        >
          <span className="h-1 w-1 rounded-full bg-black" />
          {feature.category}
        </div>

        <h3
          className="
          mb-4 max-w-[280px]
          text-[25px] font-normal
          leading-[1.2] tracking-[-0.055em]
          text-[#111111]
          sm:text-[27px]
        "
        >
          {feature.title}
        </h3>

        <p
          className="
          max-w-[270px]
          text-[13px] leading-[1.9]
          text-[#858585]
        "
        >
          {feature.description}
        </p>
      </div>

      {/* ARROW */}

      <div
        className="
        absolute bottom-7 right-7
        flex h-9 w-9 items-center justify-center
        rounded-full border border-[#EAEAEA]
        text-[#777777]
        transition-all duration-500
        group-hover:rotate-45
        group-hover:border-black
        group-hover:bg-black
        group-hover:text-white
      "
      >
        <ArrowUpRight size={17} strokeWidth={1.3} />
      </div>

      {/* HOVER LINE */}

      <motion.div
        className="
          absolute bottom-0 left-0
          h-[2px] bg-black
        "
        initial={{ width: '0%' }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.6 }}
      />
    </motion.article>
  )
}

// ======================================================
// MAIN COMPONENT
// ======================================================

export default function Features() {
  const sectionRef = useRef(null)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)

  const [maxScroll, setMaxScroll] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  // ====================================================
  // RESPONSIVE SCROLL CALCULATION
  // ====================================================

  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current

    if (!viewport || !track) return

    let resizeObserver

    const updateDimensions = () => {
      const distance = Math.max(0, track.scrollWidth - viewport.clientWidth)

      setMaxScroll(distance)
    }

    updateDimensions()

    resizeObserver = new ResizeObserver(updateDimensions)

    resizeObserver.observe(viewport)
    resizeObserver.observe(track)

    window.addEventListener('resize', updateDimensions)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  // ====================================================
  // VERTICAL SCROLL ENGINE
  // ====================================================

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // ====================================================
  // HORIZONTAL MOVEMENT
  // ====================================================

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -maxScroll])

  const x = useSpring(rawX, {
    stiffness: 90,
    damping: 28,
    mass: 0.3,
    restDelta: 0.01,
  })

  // ====================================================
  // PROGRESS BAR
  // ====================================================

  const progress = useTransform(scrollYProgress, (value) => `${value * 100}%`)

  // ====================================================
  // ACTIVE CARD
  // ====================================================

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const index = Math.min(features.length - 1, Math.floor(value * features.length))

    setActiveIndex(index)
  })

  const activeNumber = String(activeIndex + 1).padStart(2, '0')

  // ====================================================
  // DYNAMIC SECTION HEIGHT
  // ====================================================

  const sectionHeight = `calc(100vh + ${maxScroll}px)`

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section
      ref={sectionRef}
      id="benefits"
      data-theme="light"
      style={{
        height: sectionHeight,
        backgroundColor: '#FFFFFF',
        color: '#111111',
        colorScheme: 'light',
      }}
      className="
        relative w-full
        bg-white text-black
      "
    >
      <div
        className="
          sticky top-0 flex h-screen
          flex-col justify-center
          overflow-hidden bg-white
        "
      >
        {/* ==========================================
            GRID BACKGROUND
        ========================================== */}

        <GridBackground />

        {/* ==========================================
            BRAND INTRO
        ========================================== */}

        <div
          className="
          relative z-10 mx-auto
          mb-10 w-full max-w-[1500px]
          px-6 text-center
          sm:mb-12
        "
        >
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h2
              className="
              text-[58px] font-medium
              leading-none tracking-[0.12em]
              text-black
              sm:text-[76px]
              lg:text-[90px]
            "
            >
              Lubrix
            </h2>

            <p
              className="
              mx-auto mt-6 max-w-[620px]
              text-[12px] leading-[1.9]
              tracking-[-0.015em]
              text-[#777777]
              sm:text-[14px]
            "
            >
              Lubrix — moy almashtirish shoxobchalari uchun professional CRM. Barcha
              filiallaringizni yagona tizimda boshqaring. Biznesingizni oson, tez va samarali
              nazorat qiling.
            </p>
          </motion.div>
        </div>

        {/* ==========================================
            SECTION HEADER
        ========================================== */}

        <div
          className="
          relative z-10 mx-auto
          mb-8 flex w-full max-w-[1500px]
          flex-col justify-between gap-5
          px-6 sm:px-10
          md:flex-row md:items-end
          lg:px-16
        "
        >
          <div>
            <span
              className="
              mb-4 block text-[10px]
              uppercase tracking-[0.3em]
              text-[#A0A0A0]
            "
            >
              01 — 12 / Our ecosystem
            </span>

            <h3
              className="
              text-[35px] font-normal
              leading-tight tracking-[-0.055em]
              sm:text-[46px]
              lg:text-[54px]
            "
            >
              Barcha imkoniyatlar.
            </h3>
          </div>

          <p
            className="
            max-w-[340px] pb-1
            text-[13px] leading-[1.9]
            text-[#888888]
          "
          >
            Biznesingizni rivojlantirish uchun kerak bo‘lgan barcha vositalar. Bitta mukammal
            platformada.
          </p>
        </div>

        {/* ==========================================
            HORIZONTAL CAROUSEL
        ========================================== */}

        <div
          ref={viewportRef}
          className="
            relative z-10 w-full
            overflow-hidden
          "
        >
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="
              flex w-max gap-4
              px-6
              sm:gap-5 sm:px-10
              lg:px-16
              will-change-transform
            "
          >
            {features.map((feature, index) => (
              <FeatureCard key={feature.number} feature={feature} index={index} />
            ))}
          </motion.div>
        </div>

        {/* ==========================================
            PROGRESS
        ========================================== */}

        <div
          className="
          relative z-10 mx-auto
          mt-9 flex w-full max-w-[1500px]
          items-center gap-5
          px-6 sm:px-10
          lg:px-16
        "
        >
          <span
            className="
            font-mono text-[10px]
            tracking-wider text-black
            tabular-nums
          "
          >
            {activeNumber}
          </span>

          <div
            className="
            relative h-px flex-1
            overflow-hidden bg-[#E8E8E8]
          "
          >
            <motion.div
              style={{ width: progress }}
              className="
                absolute inset-y-0 left-0
                bg-black
              "
            />
          </div>

          <span
            className="
            font-mono text-[10px]
            tracking-wider text-[#AAAAAA]
          "
          >
            12
          </span>
        </div>

        {/* ==========================================
            FOOTER
        ========================================== */}

        <div
          className="
          relative z-10 mx-auto
          mt-5 flex w-full max-w-[1500px]
          items-center justify-between
          px-6 sm:px-10
          lg:px-16
        "
        >
          <span
            className="
            text-[9px] uppercase
            tracking-[0.25em]
            text-[#B0B0B0]
          "
          >
            Lubrix ecosystem
          </span>

          <span
            className="
            text-[9px] uppercase
            tracking-[0.25em]
            text-[#B0B0B0]
          "
          >
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  )
}
