'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/i18n'

export default function CustomIntro() {
  const { language } = useLanguage()
  const [index, setIndex] = useState(0)
  const [finished, setFinished] = useState(false)

  const words =
    language === 'en'
      ? ['WELCOME!', 'This is LUBRIX.', 'Smart management for your business.']
      : ['XUSH KELIBSIZ!', 'Bu — LUBRIX.', 'Biznesingiz uchun aqlli boshqaruv.']

  useEffect(() => {
    setIndex(0)
    const timers = []

    words.forEach((_, i) => {
      const timer = setTimeout(() => {
        if (i === words.length - 1) {
          const finishTimer = setTimeout(() => {
            setFinished(true)
          }, 2200)

          timers.push(finishTimer)
        } else {
          setIndex(i + 1)
        }
      }, i * 3000)

      timers.push(timer)
    })

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <AnimatePresence>
      {!finished && (
        <motion.section
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black"
          exit={{
            opacity: 0,
            filter: 'blur(20px)',
            scale: 1.05,
          }}
          transition={{
            duration: 1.2,
            ease: 'easeInOut',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={index}
              className="flex flex-wrap justify-center px-6 text-center text-4xl font-sans font-semibold tracking-tight text-white md:text-8xl"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.035,
                  },
                },
                exit: {
                  transition: {
                    staggerChildren: 0.02,
                    staggerDirection: -1,
                  },
                },
              }}
            >
              {words[index].split('').map((char, i) => (
                <motion.span
                  key={`${index}-${i}`}
                  className="inline-block whitespace-pre"
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 60,
                      scale: 0.7,
                      rotateX: -70,
                      filter: 'blur(20px)',
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      rotateX: 0,
                      filter: 'blur(0px)',
                      transition: {
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                    exit: {
                      opacity: 0,
                      y: -50,
                      scale: 1.2,
                      filter: 'blur(20px)',
                      transition: {
                        duration: 0.5,
                      },
                    },
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h1>
          </AnimatePresence>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
