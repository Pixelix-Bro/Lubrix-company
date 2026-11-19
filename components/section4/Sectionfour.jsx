'use client'

import GridBackground from '@/components/ui/GridBackground'
import { useLanguage } from '@/lib/i18n'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import {
  ArrowLeftRight,
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
// ENGLISH TRANSLATIONS
// ======================================================

const englishFeatures = [
  ['Management', 'Smart management', 'Manage every business process in one platform.'],
  ['Analytics', 'Real-time statistics', 'Track revenue, costs, and business KPIs in real time.'],
  ['CRM', 'Customer database', 'Manage customers, vehicles, and service history.'],
  ['Inventory', 'Inventory control', 'Monitor stock levels and stock movements.'],
  ['Performance', 'Fast service', 'Simplify and accelerate service operations.'],
  ['Security', 'Secure system', 'Use tools designed to protect your data.'],
  ['Finance', 'Payment control', 'Track financial transactions and payments in one place.'],
  ['Team', 'Employee management', 'Manage your team, tasks, and workflows efficiently.'],
  ['Notifications', 'Automatic reminders', 'Stay informed about important tasks and processes.'],
  ['Responsive', 'Every device', 'Use it from a computer, tablet, or smartphone.'],
  ['Monitoring', 'Fast monitoring', 'Continuously monitor operations and service status.'],
  ['Cloud System', 'Cloud infrastructure', 'Access your data from anywhere with internet access.'],
]

// ======================================================
// FEATURE CARD
// ======================================================

function FeatureCard({ feature }) {
  const Icon = feature.icon

  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group relative flex shrink-0 flex-col
        justify-between overflow-hidden
        h-[330px] w-[285px]
        border border-[#EAEAEA]
        bg-white/70 backdrop-blur-[5px]
        p-7
        transition-colors duration-500
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
            group-hover:border-black
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

      {/* CONTENT */}

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

      <div
        className="
        absolute bottom-0 left-0
        h-[2px] w-full
        origin-left scale-x-0
        bg-black
        transition-transform duration-700
        ease-[cubic-bezier(0.22,1,0.36,1)]
        group-hover:scale-x-100
      "
      />
    </motion.article>
  )
}

// ======================================================
// INFINITE DRAG CAROUSEL
// ======================================================

function InfiniteCarousel({ items }) {
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const groupRef = useRef(null)

  const position = useRef(0)
  const groupWidth = useRef(0)

  const paused = useRef(false)
  const dragging = useRef(false)

  const startX = useRef(0)
  const startPosition = useRef(0)
  const lastTime = useRef(0)

  const [isDragging, setIsDragging] = useState(false)

  // ----------------------------------------------------
  // POSITION NORMALIZATION
  // ----------------------------------------------------

  const normalizePosition = (value) => {
    const width = groupWidth.current

    if (!width) return 0

    let result = value % width

    if (result > 0) result -= width

    return result
  }

  // ----------------------------------------------------
  // MEASURE WIDTH
  // ----------------------------------------------------

  useEffect(() => {
    const group = groupRef.current
    if (!group) return

    const measure = () => {
      const width = group.getBoundingClientRect().width

      if (width > 0) {
        groupWidth.current = width
        position.current = normalizePosition(position.current)
      }
    }

    measure()

    const observer = new ResizeObserver(measure)

    observer.observe(group)

    return () => observer.disconnect()
  }, [])

  // ----------------------------------------------------
  // ANIMATION ENGINE
  // ----------------------------------------------------

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let frameId

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const SPEED = 35

    const animate = (time) => {
      if (!lastTime.current) {
        lastTime.current = time
      }

      const delta = Math.min(time - lastTime.current, 40)

      lastTime.current = time

      if (!paused.current && !dragging.current && !prefersReducedMotion && groupWidth.current > 0) {
        position.current -= (SPEED * delta) / 1000

        position.current = normalizePosition(position.current)
      }

      track.style.transform = `translate3d(${position.current}px, 0, 0)`

      frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameId)
      lastTime.current = 0
    }
  }, [])

  // ----------------------------------------------------
  // POINTER DOWN
  // ----------------------------------------------------

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return

    dragging.current = true

    setIsDragging(true)

    startX.current = event.clientX
    startPosition.current = position.current

    viewportRef.current?.setPointerCapture(event.pointerId)
  }

  // ----------------------------------------------------
  // POINTER MOVE
  // ----------------------------------------------------

  const handlePointerMove = (event) => {
    if (!dragging.current) return

    const movement = event.clientX - startX.current

    position.current = normalizePosition(startPosition.current + movement)

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${position.current}px, 0, 0)`
    }
  }

  // ----------------------------------------------------
  // POINTER UP
  // ----------------------------------------------------

  const handlePointerUp = () => {
    if (!dragging.current) return

    dragging.current = false

    setIsDragging(false)
  }

  // ----------------------------------------------------
  // RENDER
  // ----------------------------------------------------

  return (
    <div
      ref={viewportRef}
      className="
        relative z-10 w-full
        overflow-hidden
        cursor-grab
        active:cursor-grabbing
      "
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onLostPointerCapture={handlePointerUp}
      onMouseEnter={() => {
        paused.current = true
      }}
      onMouseLeave={() => {
        if (!dragging.current) {
          paused.current = false
        }
      }}
      style={{
        touchAction: 'pan-y',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      <div
        ref={trackRef}
        className="flex w-max will-change-transform"
        style={{
          transform: 'translate3d(0,0,0)',
        }}
      >
        {/* FIRST GROUP */}

        <div
          ref={groupRef}
          className="
            flex shrink-0 gap-4 pr-4
            sm:gap-5 sm:pr-5
            px-6 sm:px-10 lg:px-16
          "
        >
          {items.map((feature) => (
            <FeatureCard key={`first-${feature.number}`} feature={feature} />
          ))}
        </div>

        {/* DUPLICATE GROUP */}

        <div
          aria-hidden="true"
          className="
            flex shrink-0 gap-4 pr-4
            sm:gap-5 sm:pr-5
            px-6 sm:px-10 lg:px-16
          "
        >
          {items.map((feature) => (
            <FeatureCard key={`second-${feature.number}`} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ======================================================
// MAIN COMPONENT
// ======================================================

export default function Features() {
  const { language } = useLanguage()

  // ----------------------------------------------------
  // LOCALIZED FEATURES
  // ----------------------------------------------------

  const localizedFeatures =
    language === 'en'
      ? features.map((feature, index) => ({
          ...feature,
          category: englishFeatures[index][0],
          title: englishFeatures[index][1],
          description: englishFeatures[index][2],
        }))
      : features

  // ----------------------------------------------------
  // RENDER
  // ----------------------------------------------------

  return (
    <section
      id="benefits"
      data-theme="light"
      className="
        relative flex min-h-screen
        w-full flex-col justify-center
        overflow-hidden bg-white
        py-24 text-black
      "
      style={{
        colorScheme: 'light',
      }}
    >
      {/* BACKGROUND */}

      <div className="pointer-events-none absolute inset-0 z-0">
        <GridBackground />
      </div>

      {/* BRAND INTRO */}

      <div
        className="
        relative z-10 mx-auto
        mb-10 w-full max-w-[1500px]
        px-6 text-center
        sm:mb-14
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
            {language === 'en'
              ? 'Lubrix is a professional CRM for oil-change centers. Manage all branches in one system and control your business quickly and efficiently.'
              : 'Lubrix — moy almashtirish shoxobchalari uchun professional CRM. Barcha filiallaringizni yagona tizimda boshqaring. Biznesingizni oson, tez va samarali nazorat qiling.'}
          </p>
        </motion.div>
      </div>

      {/* SECTION HEADER */}

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
            {language === 'en' ? '01 — 12 / Our ecosystem' : '01 — 12 / Ekotizimimiz'}
          </span>

          <h3
            className="
            text-[35px] font-normal
            leading-tight tracking-[-0.055em]
            sm:text-[46px]
            lg:text-[54px]
          "
          >
            {language === 'en' ? 'All capabilities.' : 'Barcha imkoniyatlar.'}
          </h3>
        </div>

        <p
          className="
          max-w-[340px] pb-1
          text-[13px] leading-[1.9]
          text-[#888888]
        "
        >
          {language === 'en'
            ? 'All the tools you need to grow your business. In one complete platform.'
            : 'Biznesingizni rivojlantirish uchun kerak bo‘lgan barcha vositalar. Bitta mukammal platformada.'}
        </p>
      </div>

      {/* INFINITE CAROUSEL */}

      <InfiniteCarousel items={localizedFeatures} />

      {/* BOTTOM INTERACTION INDICATOR */}

      <div
        className="
        relative z-10 mx-auto
        mt-9 flex w-full max-w-[1500px]
        items-center justify-center gap-3
        px-6
      "
      >
        <ArrowLeftRight size={14} strokeWidth={1.4} className="text-[#999999]" />

        <span
          className="
          text-[10px] uppercase
          tracking-[0.22em]
          text-[#999999]
        "
        >
          {language === 'en' ? 'Drag to explore · 12 features' : 'Surib ko‘ring · 12 imkoniyat'}
        </span>
      </div>
    </section>
  )
}
