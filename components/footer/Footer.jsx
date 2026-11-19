'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const nav = [
  { label: 'Bosh sahifa', href: '#' },
  { label: 'Mahsulotlar', href: '#products' },
  { label: 'Biz haqimizda', href: '#about' },
  { label: 'Aloqa', href: '#contact' },
]

const socials = [
  { label: 'Telegram', href: 'https://t.me/lubrix' },
  { label: 'Instagram', href: 'https://instagram.com/lubrix' },
]

const linkClass =
  'group flex w-fit items-center gap-1.5 text-[13px] tracking-[-0.02em] text-neutral-400 transition-colors duration-300 hover:text-white'

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.ft-letter', { yPercent: 110 })
      gsap.set('.ft-fade', { autoAlpha: 0, y: 14 })

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power4.out' },
      })

      tl.to('.ft-fade', {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.07,
        clearProps: 'transform',
      })
      tl.to('.ft-letter', { yPercent: 0, duration: 1.2, stagger: 0.07 }, 0.15)

      const start = () =>
        ScrollTrigger.create({
          trigger: footerRef.current,
          start: 'top 92%',
          once: true,
          onEnter: () => tl.play(),
        })

      if (document.fonts?.ready) document.fonts.ready.then(start)
      else start()
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-black text-white">
      <div className="mx-auto w-full max-w-[1500px] px-6 sm:px-10 lg:px-16 xl:px-20">
        {/* Yuqori qism */}
        <div className="grid grid-cols-2 gap-10 border-b border-neutral-900 py-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-16 lg:py-14">
          <div className="ft-fade col-span-2 lg:col-span-1">
            <p className="max-w-[260px] text-[13px] leading-[1.8] text-neutral-500">
              Texnika uchun ishonchli moylash yechimlari. Biz bilan bog‘laning.
            </p>

            <a
              href="mailto:hello@lubrix.uz"
              className="group mt-5 inline-flex items-center gap-2 border-b border-neutral-800 pb-1 text-[13px] tracking-[-0.02em] transition-colors duration-300 hover:border-white"
            >
              hello@lubrix.uz
              <ArrowUpRight
                size={14}
                strokeWidth={1.4}
                className="text-neutral-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
              />
            </a>
          </div>

          <div className="ft-fade">
            <h3 className="mb-5 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-600">
              Sahifalar
            </h3>
            <ul className="flex flex-col gap-3">
              {nav.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className={linkClass}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="ft-fade">
            <h3 className="mb-5 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-600">
              Ijtimoiy
            </h3>
            <ul className="flex flex-col gap-3">
              {socials.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noreferrer" className={linkClass}>
                    {label}
                    <ArrowUpRight
                      size={12}
                      strokeWidth={1.4}
                      className="text-neutral-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="ft-fade">
            <h3 className="mb-5 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-600">
              Aloqa
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="tel:+998900000000" className={linkClass}>
                  +998 90 000 00 00
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Tashkent,Uzbekistan"
                  target="_blank"
                  rel="noreferrer"
                  className={linkClass}
                >
                  Toshkent, O‘zbekiston
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Katta yozuv */}
        <div
          aria-hidden="true"
          className="select-none overflow-hidden whitespace-nowrap py-6 lg:py-8"
          style={{
            fontFamily: 'Michroma, Arial, sans-serif',
            fontSize: 'clamp(3rem, 14vw, 14rem)',
            letterSpacing: '-0.07em',
            lineHeight: 1,
            paddingBottom: '0.1em',
          }}
        >
          {'LUBRIX'.split('').map((char, i) => (
            <span key={i} className="ft-letter inline-block text-white">
              {char}
            </span>
          ))}
        </div>

        {/* Pastki qator */}
        <div className="ft-fade flex items-center justify-between gap-4 border-t border-neutral-900 py-4 text-[9px] uppercase tracking-[0.15em] text-neutral-600">
          <span>© 2026 Lubrix</span>
          <span className="hidden sm:block">Uzbekistan</span>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 uppercase tracking-[0.15em] transition-colors duration-300 hover:text-white"
          >
            Tepaga
            <ArrowUp
              size={12}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  )
}
