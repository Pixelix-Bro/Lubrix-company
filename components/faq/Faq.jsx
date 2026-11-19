'use client'

import { useRef, useState } from 'react'

import { motion, MotionConfig } from 'framer-motion'
import { ArrowUpRight, Plus } from 'lucide-react'

import GlassSurface from '@/components/GlassSurface'
import BlackBackground from '@/components/ui/BlackBackground'
import { useLanguage } from '@/lib/i18n'

// ======================================================
// LUBRIX — FAQ (DARK, PREMIUM)
// ======================================================

const FAQ_DATA = [
  {
    id: 'lubrix-nima',
    category: 'Platforma',
    question: 'Lubrix CRM nima va u qanday ishlaydi?',
    answer:
      'Lubrix — moy almashtirish shoxobchalari va avtoservislar uchun yaratilgan zamonaviy boshqaruv tizimi. U mijozlar, avtomobillar, xizmatlar, ombor, moliya va biznes jarayonlarini yagona platformada boshqarish imkonini beradi.',
  },
  {
    id: 'mijozlar-tarixi',
    category: 'Mijozlar',
    question: 'Mijozlar va avtomobillar tarixini saqlash mumkinmi?',
    answer:
      'Ha. Har bir mijoz va uning avtomobili haqida ma’lumotlarni saqlashingiz, avvalgi tashriflar, bajarilgan xizmatlar va texnik xizmat ko‘rsatish tarixini kuzatishingiz mumkin.',
  },
  {
    id: 'tekshiruv',
    category: 'Xizmatlar',
    question: '15 punktli tekshiruv tizimi qanday ishlaydi?',
    answer:
      'Avtomobilga xizmat ko‘rsatish jarayonida 15 ta muhim tekshiruv punktini qayd etish mumkin. Bu avtomobil holatini tizimli nazorat qilish va mijozga aniq ma’lumot taqdim etishga yordam beradi.',
  },
  {
    id: 'filiallar',
    category: 'Boshqaruv',
    question: 'Bir nechta filialni bitta tizimda boshqarish mumkinmi?',
    answer:
      'Ha. Filiallar faoliyatini yagona tizim orqali boshqarish, ularning ish jarayonlarini kuzatish va biznes faoliyatini markazlashgan holda nazorat qilish mumkin.',
  },
  {
    id: 'ai-assistant',
    category: 'AI Assistant',
    question: 'Lubrix AI Assistant qanday yordam beradi?',
    answer:
      'AI Assistant biznes jarayonlari bilan ishlashda aqlli yordamchi sifatida xizmat qiladi. U tizimdagi ma’lumotlardan foydalanib, kerakli ma’lumotlarni topish va ish jarayonlarini soddalashtirishga yordam beradi.',
  },
]

// Google qidiruvida FAQ ko‘rinishi uchun (SEO)
const makeFaqJsonLd = (items) =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }).replace(/</g, '\\u003c')

const EASE = [0.22, 1, 0.36, 1]
const pad = (n) => String(n).padStart(2, '0')

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80'

// ======================================================
// FAQ ITEM
// ======================================================

function FaqItem({ item, index, isOpen, onToggle }) {
  const buttonId = `faq-trigger-${item.id}`
  const panelId = `faq-panel-${item.id}`

  // Kursor ostida yengil yorug'lik (spotlight)
  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <li
      onPointerMove={handlePointerMove}
      className="group/item relative border-b backdrop-blur-3xl rounded-[50px] p-[20px] overflow-hidden border-white/10"
    >
      {/* Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/item:opacity-100"
        style={{
          background:
            'radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.055), transparent 70%)',
        }}
      />

      {/* Ochiq savol belgisi: chap chiziq */}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-0 h-full w-px origin-top bg-white transition-transform duration-700 ${
          isOpen ? 'scale-y-100' : 'scale-y-0'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
      />

      <h3>
        <button
          id={buttonId}
          data-faq-trigger
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className={`group relative flex w-full items-start gap-5 py-7 pl-0 text-left sm:gap-8 sm:py-9 sm:pl-4 ${focusRing} focus-visible:-outline-offset-2`}
        >
          <span
            className={`pt-[9px] text-[11px] tabular-nums tracking-[0.15em] transition-colors duration-500 ${
              isOpen ? 'text-white' : 'text-white/30'
            }`}
          >
            {pad(index + 1)}
          </span>

          <span className="flex-1">
            <span className="mb-3 flex items-center gap-2 text-[11px] tracking-[0.08em] text-white/40">
              <span
                aria-hidden="true"
                className={`h-1 w-1 rounded-full transition-all duration-500 ${
                  isOpen ? 'bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.6)]' : 'bg-white/25'
                }`}
              />
              {item.category}
            </span>

            <span
              className={`block text-[20px] font-normal leading-[1.3] tracking-[-0.04em] transition-all duration-500 sm:text-[25px] ${
                isOpen
                  ? 'translate-x-0 text-white'
                  : 'text-white/55 group-hover:translate-x-1 group-hover:text-white'
              }`}
            >
              {item.question}
            </span>
          </span>

          <span
            aria-hidden="true"
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
              isOpen
                ? 'rotate-[135deg] border-white bg-white text-black'
                : 'border-white/15 text-white/60 group-hover:border-white group-hover:bg-white group-hover:text-black'
            }`}
          >
            <Plus size={17} strokeWidth={1.3} />
          </span>
        </button>
      </h3>

      {/* Javob: grid-rows bilan silliq ochiladi (layout sakramaydi) */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows]  duration-700 ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)',
          visibility: isOpen ? 'visible' : 'hidden',
          transitionProperty: 'grid-template-rows, visibility',
          transitionDelay: isOpen ? '0s' : '0s, 0.7s',
        }}
      >
        <div className="overflow-hidden">
          <p
            className={`max-w-[580px] pb-10 pl-[41px] pr-14 text-[14px] leading-[1.95] text-white/60 transition-all duration-700 sm:pl-[77px] sm:text-[15px] ${
              isOpen ? 'translate-y-0 opacity-100 delay-100' : '-translate-y-2 opacity-0'
            }`}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </li>
  )
}

// ======================================================
// MAIN COMPONENT
// ======================================================

export default function FAQ() {
  const { language } = useLanguage()
  const [openId, setOpenId] = useState(FAQ_DATA[0].id)
  const listRef = useRef(null)

  const openIndex = FAQ_DATA.findIndex((item) => item.id === openId)

  const english = [
    ['Platform', 'What is Lubrix CRM and how does it work?', 'Lubrix is a modern management system designed for oil-change centers and auto services. It brings customers, vehicles, services, inventory, finance, and business processes into one platform.'],
    ['Customers', 'Can I save customer and vehicle history?', 'Yes. You can store information about each customer and vehicle, and track previous visits, completed services, and maintenance history.'],
    ['Services', 'How does the 15-point inspection system work?', 'You can record 15 important inspection points during the vehicle service process. It helps monitor vehicle condition systematically and gives the customer clear information.'],
    ['Management', 'Can I manage multiple branches in one system?', 'Yes. You can manage branch operations in one system, monitor their workflows, and oversee the whole business centrally.'],
    ['AI Assistant', 'How does the Lubrix AI Assistant help?', 'The AI Assistant supports your daily business workflows. It helps you find useful information and simplify operations using data from the system.'],
  ]

  const localizedFaq = FAQ_DATA.map((item, index) =>
    language === 'en'
      ? { ...item, category: english[index][0], question: english[index][1], answer: english[index][2] }
      : item
  )

  const toggle = (id) => setOpenId((current) => (current === id ? null : id))

  // Klaviatura: ↑ ↓ Home End
  const handleKeyDown = (event) => {
    const keys = ['ArrowDown', 'ArrowUp', 'Home', 'End']
    if (!keys.includes(event.key)) return

    const buttons = Array.from(listRef.current?.querySelectorAll('[data-faq-trigger]') ?? [])
    const current = buttons.indexOf(document.activeElement)
    if (current === -1) return

    event.preventDefault()

    let next = current
    if (event.key === 'ArrowDown') next = (current + 1) % buttons.length
    if (event.key === 'ArrowUp') next = (current - 1 + buttons.length) % buttons.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = buttons.length - 1

    buttons[next].focus()
  }

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="faq"
        data-theme="dark"
        aria-labelledby="faq-heading"
        style={{ backgroundColor: '#050505', color: '#FFFFFF', colorScheme: 'dark' }}
        className="relative w-full overflow-hidden bg-[#050505] py-24 text-white sm:py-28 lg:py-36"
      >
        <BlackBackground />

        {/* Yuqori va pastki yumshoq o'tish */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050505] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: makeFaqJsonLd(localizedFaq) }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-[1500px] gap-14 px-6 sm:px-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-24 lg:px-16">
          {/* ==========================================
              LEFT — HEADING (sticky)
          ========================================== */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: EASE }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <h2
              id="faq-heading"
              className="text-[38px] font-normal leading-[1.05] tracking-[-0.06em] sm:text-[50px] lg:text-[64px]"
            >
              {language === 'en' ? 'Frequently asked questions.' : 'Ko‘p so‘raladigan savollar.'}
            </h2>

            <p className="mt-6 max-w-[340px] text-[14px] leading-[1.9] text-white/50">
              {language === 'en'
                ? 'Short, clear answers to the most important questions about Lubrix.'
                : 'Lubrix haqida eng muhim savollarga qisqa va aniq javoblar.'}
            </p>

            {/* Jonli hisoblagich: qaysi savol ochiq */}
            <div className="mt-10 flex max-w-[340px] items-center gap-4" aria-hidden="true">
              <span className="text-[11px] tabular-nums tracking-[0.15em] text-white">
                {openIndex === -1 ? '––' : pad(openIndex + 1)}
              </span>
              <div className="relative h-px flex-1 overflow-hidden bg-white/10">
                <GlassSurface
                  width="100%"
                  height="100%"
                  borderRadius={50}
                  borderWidth={0.07}
                  brightness={50}
                  opacity={0.93}
                  blur={11}
                  displace={2}
                  distortionScale={-180}
                  saturation={1.2}
                  redOffset={0}
                  greenOffset={10}
                  blueOffset={20}
                  refraction
                  renderer="auto"
                  className="absolute inset-0 z-0 pointer-events-none w-full"
                />
                <motion.div
                  className="absolute inset-y-0 left-0 bg-white"
                  initial={false}
                  animate={{
                    width:
                      openIndex === -1 ? '0%' : `${((openIndex + 1) / FAQ_DATA.length) * 100}%`,
                  }}
                  transition={{ duration: 0.7, ease: EASE }}
                />
              </div>
              <span className="text-[11px] tabular-nums tracking-[0.15em] text-white/30">
                {pad(FAQ_DATA.length)}
              </span>
            </div>

            <a
              href="#contact"
              className={`group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[13px] font-medium text-black transition-all duration-300 hover:gap-3 hover:opacity-90 ${focusRing}`}
            >
              {language === 'en' ? 'Have another question?' : 'Boshqa savolingiz bormi?'}
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>

          {/* ==========================================
              RIGHT — ACCORDION
          ========================================== */}

          <motion.ul
            ref={listRef}
            onKeyDown={handleKeyDown}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.85, ease: EASE }}
            className="border-t flex flex-col gap-[20px] border-white/10"
          >
            {FAQ_DATA.map((item, index) => {
              const english = [
                [
                  'Platform',
                  'What is Lubrix CRM and how does it work?',
                  'Lubrix is a modern management system designed for oil-change centers and auto services. It brings customers, vehicles, services, inventory, finance, and business processes into one platform.',
                ],
                [
                  'Customers',
                  'Can I save customer and vehicle history?',
                  'Yes. You can store information about each customer and vehicle, and track previous visits, completed services, and maintenance history.',
                ],
                [
                  'Services',
                  'How does the 15-point inspection system work?',
                  'You can record 15 important inspection points during the vehicle service process. It helps monitor vehicle condition systematically and gives the customer clear information.',
                ],
                [
                  'Management',
                  'Can I manage multiple branches in one system?',
                  'Yes. You can manage branch operations in one system, monitor their workflows, and oversee the whole business centrally.',
                ],
                [
                  'AI Assistant',
                  'How does the Lubrix AI Assistant help?',
                  'The AI Assistant supports your daily business workflows. It helps you find useful information and simplify operations using data from the system.',
                ],
              ]
              const localized =
                language === 'en'
                  ? {
                      ...item,
                      category: english[index][0],
                      question: english[index][1],
                      answer: english[index][2],
                    }
                  : item
              return (
                <FaqItem
                  key={item.id}
                  item={localized}
                  index={index}
                  isOpen={openId === item.id}
                  onToggle={() => toggle(item.id)}
                />
              )
            })}
          </motion.ul>
        </div>
      </section>
    </MotionConfig>
  )
}
