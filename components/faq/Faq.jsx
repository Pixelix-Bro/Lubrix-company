'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import BlackBackground from '@/components/ui/BlackBackground'
import { useLanguage } from '@/lib/i18n'

const FAQ_DATA = [
  {
    uz: {
      question: 'Lubrix nima?',
      answer:
        'Lubrix — moy almashtirish shoxobchalari va avtoservislar uchun yaratilgan zamonaviy CRM tizimi. U mijozlar, avtomobillar, xizmatlar va biznes jarayonlarini yagona platformada boshqarish imkonini beradi.',
    },
    en: {
      question: 'What is Lubrix?',
      answer:
        'Lubrix is a modern CRM system designed for oil-change centers and auto services. It helps manage customers, vehicles, services, and business operations in one platform.',
    },
  },
  {
    uz: {
      question: 'Mijozlar va avtomobillar tarixi saqlanadimi?',
      answer:
        'Ha. Har bir mijoz va uning avtomobili haqidagi ma’lumotlar, avvalgi xizmatlar, almashtirilgan moylar va xizmat ko‘rsatish tarixi tizimda saqlanadi.',
    },
    en: {
      question: 'Are customer and vehicle records saved?',
      answer:
        'Yes. Customer and vehicle details, previous services, replaced oils, and service history are stored in the system.',
    },
  },
  {
    uz: {
      question: '15 nuqtali tekshiruv nima?',
      answer:
        'Bu avtomobilning muhim qismlarini 15 ta mezon asosida tekshirish imkoniyati. Tekshiruv natijalari mijozning xizmat tarixida saqlanadi.',
    },
    en: {
      question: 'What is the 15-point inspection?',
      answer:
        'It allows you to inspect important vehicle components using 15 criteria. Inspection results are saved in the customer service history.',
    },
  },
  {
    uz: {
      question: 'Bir nechta filialni boshqarish mumkinmi?',
      answer:
        'Ha. Barcha filiallarni yagona tizim orqali boshqarish, ularning faoliyati, xizmatlari va moliyaviy natijalarini alohida kuzatish mumkin.',
    },
    en: {
      question: 'Can I manage multiple branches?',
      answer:
        'Yes. You can manage all branches through one system and monitor their operations, services, and financial performance separately.',
    },
  },
  {
    uz: {
      question: 'AI Assistant qanday yordam beradi?',
      answer:
        'AI Assistant tizimdagi ma’lumotlarni tahlil qilish, kerakli ma’lumotlarni tez topish va kundalik ish jarayonlarini soddalashtirishga yordam beradi.',
    },
    en: {
      question: 'How does AI Assistant help?',
      answer:
        'AI Assistant helps analyze system data, quickly find relevant information, and simplify everyday operations.',
    },
  },
]

export default function FAQ() {
  const { language } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)

  const isEnglish = language === 'en'

  const questions = FAQ_DATA.map((item) => (isEnglish ? item.en : item.uz))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <section
      id="faq"
      className="relative isolate w-full overflow-hidden bg-[#050505] py-16 text-white sm:py-20 lg:py-24"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <BlackBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 md:grid-cols-[0.8fr_1.2fr] md:gap-16 lg:gap-24">
        {/* Heading */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-white/40">
            {isEnglish ? 'FAQ' : 'SAVOL-JAVOBLAR'}
          </p>

          <h2 className="max-w-sm text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
            {isEnglish ? 'Frequently asked questions' : 'Ko‘p beriladigan savollar'}
          </h2>

          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
            {isEnglish
              ? 'Everything you need to know about Lubrix.'
              : 'Lubrix haqida bilishingiz kerak bo‘lgan muhim ma’lumotlar.'}
          </p>
        </div>

        {/* Questions */}
        <div className="border-t border-white/15">
          {questions.map((item, index) => {
            const isOpen = activeIndex === index

            return (
              <div key={index} className="border-b border-white/15">
                <button
                  type="button"
                  onClick={() => setActiveIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="flex w-full items-center justify-between gap-5 py-5 text-left"
                >
                  <span className="text-sm font-medium leading-relaxed text-white/90 sm:text-base">
                    {item.question}
                  </span>

                  <span aria-hidden="true" className="shrink-0 text-xl font-light text-white/50">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: {
                          duration: 0.25,
                          ease: 'easeInOut',
                        },
                        opacity: { duration: 0.2 },
                      }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-5 pr-8 text-sm leading-7 text-white/50">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>

      {/* SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
    </section>
  )
}
