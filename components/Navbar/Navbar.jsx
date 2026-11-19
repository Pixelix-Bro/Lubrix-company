'use client'

import GlassSurface from '@/components/GlassSurface'
import SpecularButton from '@/components/ui/SpecularButton'
import { useLanguage } from '@/lib/i18n'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [active, setActive] = useState(false)
  const [texte, setTexte] = useState(false)
  const [open, setOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 50)

      const navbarPoint = 100
      const sections = document.querySelectorAll('[data-theme]')

      let currentTheme = 'dark'

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()

        if (rect.top <= navbarPoint && rect.bottom > navbarPoint) {
          currentTheme = section.getAttribute('data-theme')
        }
      })

      setTexte(currentTheme === 'light')
    }

    const handleResize = () => {
      handleScroll()
      // desktop o'lchamga o'tganda mobil menyuni yopamiz
      if (window.innerWidth >= 1024) setOpen(false)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Mobil menyu ochiq bo'lganda sahifa scroll bo'lmasin, Escape bilan yopilsin
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const menu =
    language === 'en'
      ? [
          { name: 'Home', link: '#home' },
          { name: 'About', link: '#about' },
          { name: 'Why Us', link: '#why' },
          { name: 'Benefits', link: '#benefits' },
          { name: 'FAQ', link: '#faq' },
          { name: 'Contact', link: '#contact' },
        ]
      : [
          { name: 'Bosh', link: '#home' },
          { name: 'Biz haqimiz', link: '#about' },
          { name: 'Afzalliklar', link: '#why' },
          { name: 'Imtiyozlar', link: '#benefits' },
          { name: 'FAQ', link: '#faq' },
          { name: 'Aloqa', link: '#contact' },
        ]

  const buttonProps = {
    size: 'sm',
    radius: 40,
    tint: '#ffffff',
    tintOpacity: 0,
    textColor: texte ? '#000' : '#fff',
    lineColor: texte ? '#000' : '#fff',
    baseColor: '#525252',
    intensity: 1.9,
    idleIntensity: 0.55,
    shineSize: 10,
    shineFade: 90,
    thickness: 1.2,
    glow: 1,
    followMouse: true,
    proximity: 250,
  }

  return (
    <div className="fixed top-0 left-0 z-[80] w-full flex justify-center p-[10px]">
      {/* FULLSCREEN MOBILE MENU */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`
          fixed inset-0 z-0 lg:hidden
          h-[100dvh] w-full
          backdrop-blur-2xl backdrop-saturate-150
          transition-all duration-200 ease-in-out
          ${texte ? 'bg-white/75 text-black' : 'bg-black/70 text-white'}
          ${open ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}
        `}
      >
        <div className="flex h-full w-full flex-col justify-between overflow-y-auto px-8 pt-[120px] pb-[calc(2rem+env(safe-area-inset-bottom))]">
          <nav className="flex flex-col">
            {menu.map((item, i) => (
              <a
                key={item.name}
                href={item.link}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${150 + i * 70}ms` : '0ms' }}
                className={`
                  border-b border-current/15 py-5 text-4xl font-medium
                  transition-all duration-200 ease-out
                  active:opacity-60
                  ${open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
                `}
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div
            style={{ transitionDelay: open ? `${150 + menu.length * 70}ms` : '0ms' }}
            className={`
              mt-10 flex items-center gap-3
              transition-all duration-200 ease-out
              ${open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
            `}
          >
            <button
              type="button"
              aria-label={language === 'en' ? 'Switch to Uzbek' : 'Switch to English'}
              onClick={() => setLanguage(language === 'en' ? 'uz' : 'en')}
              className="h-11 rounded-full border border-current/20 px-4 text-sm font-medium"
            >
              {language === 'en' ? 'UZ' : 'EN'}
            </button>

            <Link target="_blank" href="https://app.lubrix.uz/login" onClick={() => setOpen(false)}>
              <SpecularButton {...buttonProps}>
                {language === 'en' ? 'Log in' : 'Kirish'}
              </SpecularButton>
            </Link>

            <Link target="_blank" href="https://app.lubrix.uz/plans" onClick={() => setOpen(false)}>
              <SpecularButton {...buttonProps}>
                {language === 'en' ? 'Sign up' : "Ro'yxatdan o'tish"}
              </SpecularButton>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`
          relative z-10 transition-all duration-200 ease-in-out
          ${active ? 'w-[94%] md:w-[88%] xl:w-[65%]' : 'w-full'}
        `}
        style={{ height: active ? 76 : 82 }}
      >
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
          backgroundOpacity={active || open ? 0.1 : 0.04}
          saturation={1.2}
          redOffset={0}
          greenOffset={10}
          blueOffset={20}
          refraction
          renderer="auto"
          className="absolute inset-0 z-0 pointer-events-none"
        />

        {/* NAVBAR CONTENT */}
        <div className="absolute inset-0 z-10 flex w-full h-full items-center justify-between px-4 sm:px-5">
          {/* LOGO */}
          <Image
            src={texte ? '/Logob.png' : '/logo.png'}
            alt="Lubrix"
            width={180}
            height={40}
            className="w-[120px] sm:w-[140px] lg:w-[160px] object-contain shrink-0 transition-all duration-200"
          />

          {/* LINKS (desktop) */}
          <nav
            className={`
              relative z-20 hidden lg:flex items-center gap-7
              whitespace-nowrap transition-colors duration-200
              ${texte ? 'text-black' : 'text-white'}
            `}
          >
            {menu.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className="
                  relative py-2
                  transition-all duration-200
                  hover:opacity-60
                  after:absolute after:left-0 after:bottom-0
                  after:h-[1px] after:w-0
                  after:bg-current after:transition-all
                  after:duration-200
                  hover:after:w-full
                "
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* BUTTONS (desktop) */}
          <div className="relative z-20 hidden lg:flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label={language === 'en' ? 'Switch to Uzbek' : 'Switch to English'}
              onClick={() => setLanguage(language === 'en' ? 'uz' : 'en')}
              className={`h-10 min-w-10 rounded-full border px-3 text-xs font-semibold transition-opacity hover:opacity-70 ${texte ? 'border-black/20 text-black' : 'border-white/20 text-white'}`}
            >
              {language === 'en' ? 'UZ' : 'EN'}
            </button>

            <Link target="_blank" href="https://app.lubrix.uz/login">
              <SpecularButton {...buttonProps}>
                {language === 'en' ? 'Log in' : 'Kirish'}
              </SpecularButton>
            </Link>

            <Link target="_blank" href="https://app.lubrix.uz/plans">
              <SpecularButton {...buttonProps}>
                {language === 'en' ? 'Sign up' : "Ro'yxatdan o'tish"}
              </SpecularButton>
            </Link>
          </div>

          {/* HAMBURGER (mobil / planshet) */}
          <button
            type="button"
            aria-label={
              open
                ? language === 'en'
                  ? 'Close menu'
                  : 'Menyuni yopish'
                : language === 'en'
                  ? 'Open menu'
                  : 'Menyuni ochish'
            }
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={`
              relative z-20 flex lg:hidden shrink-0
              h-10 w-10 items-center justify-center rounded-full
              transition-colors duration-200
              ${texte ? 'text-black' : 'text-white'}
            `}
          >
            <span className="relative block h-[14px] w-[22px]">
              <span
                className={`
                  absolute left-0 h-[1.5px] w-full rounded-full bg-current
                  transition-all duration-200
                  ${open ? 'top-[6px] rotate-45' : 'top-0'}
                `}
              />
              <span
                className={`
                  absolute left-0 top-[6px] h-[1.5px] w-full rounded-full bg-current
                  transition-all duration-200
                  ${open ? 'opacity-0' : 'opacity-100'}
                `}
              />
              <span
                className={`
                  absolute left-0 h-[1.5px] w-full rounded-full bg-current
                  transition-all duration-200
                  ${open ? 'top-[6px] -rotate-45' : 'top-[12px]'}
                `}
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
