'use client'

import { useLanguage } from '@/lib/i18n'
import { ArrowUpRight, ArrowUp } from 'lucide-react'

const nav = [
  { labelUz: 'Bosh sahifa', labelEn: 'Home', href: '#' },
  { labelUz: 'Mahsulotlar', labelEn: 'Products', href: '#benefits' },
  { labelUz: 'Biz haqimizda', labelEn: 'About us', href: '#about' },
  { labelUz: 'Aloqa', labelEn: 'Contact', href: '#contact' },
]

const socials = [
  { label: 'Telegram', href: 'https://t.me/lubrix' },
  { label: 'Instagram', href: 'https://instagram.com/lubrix' },
]

const linkClass =
  'inline-flex w-fit items-center gap-1 text-[12px] text-neutral-500 transition-colors duration-200 hover:text-white'

export default function Footer() {
  const { language } = useLanguage()
  const isEn = language === 'en'

  return (
    <footer className="border-t border-white/[0.08] bg-black text-white">
      <div className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <a
              href="#"
              className="inline-block text-lg font-semibold tracking-[-0.07em]"
              style={{ fontFamily: 'Michroma, Arial, sans-serif' }}
            >
              LUBRIX
            </a>

            <p className="mt-2 max-w-[220px] text-xs leading-relaxed text-neutral-500">
              {isEn
                ? 'Modern management solutions for oil-change centers and auto services.'
                : 'Moy almashtirish shoxobchalari va avtoservislar uchun zamonaviy boshqaruv tizimi.'}
            </p>

            <a
              href="mailto:hello@lubrix.uz"
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-neutral-400 transition-colors hover:text-white"
            >
              hello@lubrix.uz
              <ArrowUpRight size={12} />
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-3 text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-600">
              {isEn ? 'Pages' : 'Sahifalar'}
            </h3>

            <ul className="flex flex-col gap-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={linkClass}>
                    {isEn ? item.labelEn : item.labelUz}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="mb-3 text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-600">
              {isEn ? 'Social' : 'Ijtimoiy'}
            </h3>

            <ul className="flex flex-col gap-2.5">
              {socials.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {item.label}
                    <ArrowUpRight size={12} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-600">
              {isEn ? 'Contact' : 'Aloqa'}
            </h3>

            <ul className="flex flex-col gap-2.5">
              <li>
                <a href="tel:+998900000000" className={linkClass}>
                  +998
                </a>
              </li>

              <li>
                <a
                  href="https://maps.google.com/?q=Namangan,Uzbekistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {isEn ? 'Namangan, Uzbekistan' : 'Namangan, O‘zbekiston'}
                  <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/[0.08] pt-4">
          <span className="text-[10px] text-neutral-600">© 2026 Lubrix</span>

          <span className="hidden text-[10px] text-neutral-600 sm:block">Uzbekistan</span>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 text-[10px] text-neutral-500 transition-colors hover:text-white"
          >
            {isEn ? 'Back to top' : 'Tepaga'}
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  )
}
