'use client'

import GridBackground from '@/components/ui/GridBackground'
import { gsap } from 'gsap'
import { ArrowUpRight, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import GlassSurface from '../GlassSurface'

const CONTACTS = [
  {
    label: 'EMAIL',
    value: 'hello@lubrix.uz',
    href: 'mailto:hello@lubrix.uz',
    icon: Mail,
  },
  {
    label: 'TELEFON',
    value: '+998 90 000 00 00',
    href: 'tel:+998900000000',
    icon: Phone,
  },
  {
    label: 'MANZIL',
    value: 'Toshkent, O‘zbekiston',
    href: 'https://www.google.com/maps/search/?api=1&query=Tashkent%2C%20Uzbekistan',
    icon: MapPin,
    external: true,
  },
]

const INITIAL_FORM = {
  name: '',
  email: '',
  message: '',
}

const INPUT_CLASS =
  'w-full rounded-[13px] border border-white/70 bg-white/45 px-4 py-[15px] text-[13px] text-[#171717] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl transition-all duration-300 placeholder:text-neutral-400 hover:border-black/15 hover:bg-white/65 focus:border-black/25 focus:bg-white/85 focus:shadow-[0_0_0_3px_rgba(0,0,0,0.035),inset_0_1px_0_rgba(255,255,255,0.9)]'

export default function Contact() {
  const sectionRef = useRef(null)

  const [form, setForm] = useState(INITIAL_FORM)
  const [status, setStatus] = useState('')

  // GSAP animation
  useEffect(() => {
    const section = sectionRef.current

    if (!section) return

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray('.contact-reveal')

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (prefersReducedMotion) {
        gsap.set(elements, {
          clearProps: 'all',
        })
        return
      }

      gsap.fromTo(
        elements,
        {
          autoAlpha: 0,
          y: 24,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.075,
          ease: 'power3.out',
          clearProps: 'transform',
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  // Form input handler
  const updateField = (event) => {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))

    setStatus('')
  }

  // Form submit
  const handleSubmit = (event) => {
    event.preventDefault()

    const name = form.name.trim()
    const email = form.email.trim()
    const message = form.message.trim()

    if (!name || !email || !message) {
      setStatus('Iltimos, barcha maydonlarni to‘ldiring.')
      return
    }

    if (name.length < 2 || message.length < 5) {
      setStatus('Ma’lumotlarni to‘g‘ri kiriting.')
      return
    }

    const subject = encodeURIComponent(`Lubrix — yangi murojaat: ${name}`)

    const body = encodeURIComponent(`Ism: ${name}\nEmail: ${email}\n\nXabar:\n${message}`)

    const mailto = `mailto:hello@lubrix.uz?subject=${subject}&body=${body}`

    setStatus('Email dasturingizda xabar tayyorlanmoqda.')

    window.location.href = mailto
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      data-theme="light"
      aria-labelledby="contact-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#f5f5f2] text-[#111] selection:bg-black selection:text-white lg:min-h-[100svh]"
    >
      {/* Interactive grid */}
      <GridBackground cell={56} />

      {/* Atmospheric light */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <div className="absolute -left-[15%] -top-[25%] h-[650px] w-[650px] rounded-full bg-white/90 blur-[140px]" />

        <div className="absolute -bottom-[30%] -right-[10%] h-[700px] w-[700px] rounded-full bg-[#deded9]/65 blur-[150px]" />

        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40" />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-6 sm:px-10 lg:px-16 xl:px-24 p-[20px] pt-[50px] pb-[50px] justify-center">
        <main className="flex items-center flex-col lg:flex-row md:gap-[100px] lg:gap-[250px] ">
          {/* Left side */}
          <div className="flex flex-col w-full">
            <h1
              id="contact-title"
              className="contact-reveal max-w-[750px] text-[clamp(3.3rem,7vw,4.3rem)] font-medium leading-[0.94] tracking-[-0.085em]"
            >
              Har bir yaxshi g‘oya
              <br />
              <span className="text-[#bdbdb8]">suhbatdan.</span>
            </h1>

            <p className="contact-reveal mt-8 max-w-[370px] text-[13px] leading-[1.9] text-neutral-500 sm:text-[14px]">
              Biznesingizni yangi bosqichga olib chiqish haqida gaplashamiz. Savollaringiz va
              takliflaringizni kutamiz.
            </p>

            {/* Contact details */}
            <div className="mt-12 flex max-w-full flex-col gap-4">
              {CONTACTS.map((item) => {
                const Icon = item.icon

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    aria-label={`${item.label}: ${item.value}`}
                    className="contact-reveal group flex items-center justify-between  rounded-[50px] border-y border-black/[0.09] p-4 shadow-lg backdrop-blur-3xl transition-all duration-300 hover:border-black/30 hover:bg-white/30"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/80 bg-white/55 shadow-[0_2px_12px_rgba(0,0,0,0.025)] backdrop-blur-xl transition-all duration-300 group-hover:bg-white group-hover:shadow-md">
                        <Icon
                          size={16}
                          strokeWidth={1.5}
                          className="text-neutral-500 transition-colors group-hover:text-black"
                        />
                      </span>

                      <div>
                        <span className="mb-1 block text-[8px] font-semibold tracking-[0.18em] text-neutral-400">
                          {item.label}
                        </span>

                        <span className="block text-[12px] font-medium tracking-[-0.02em] text-neutral-800 sm:text-[13px]">
                          {item.value}
                        </span>
                      </div>
                    </div>

                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.5}
                      className="text-neutral-300 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-black"
                    />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Right side — Glass form */}
          <div className="contact-reveal relative w-full lg:pl-2 xl:pl-8 backdrop-blur-[5px]">
            {/* Glass surface */}
            <GlassSurface
              width="100%"
              height="100%"
              borderRadius={27}
              borderWidth={0.07}
              brightness={50}
              opacity={0.93}
              blur={11}
              displace={2}
              distortionScale={-180}
              backgroundOpacity={0.04}
              saturation={1.2}
              redOffset={0}
              greenOffset={10}
              blueOffset={20}
              refraction
              renderer="auto"
              className="pointer-events-none absolute inset-0 z-0"
            />

            {/* Form container */}
            <div className="relative z-[1] overflow-hidden rounded-[27px] border  border-white/90 p-6 shadow-[0_25px_90px_rgba(0,0,0,0.065),inset_0_1px_0_rgba(255,255,255,0.95)] sm:p-9 lg:p-10">
              {/* Glass reflections */}
              <div className="pointer-events-none absolute inset-0 rounded-[27px] bg-gradient-to-br from-white/45 via-white/10 to-transparent" />

              <div className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full border border-white/50 bg-white/15 blur-2xl" />

              <div className="relative z-10">


                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Name */}
                  <label className="block">
                    <span className="mb-2.5 block pl-1 text-[10px] font-medium text-neutral-600">
                      Ismingiz
                    </span>

                    <input
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      minLength={2}
                      maxLength={80}
                      value={form.name}
                      onChange={updateField}
                      placeholder="Ismingizni kiriting"
                      className={INPUT_CLASS}
                    />
                  </label>

                  {/* Email */}
                  <label className="block">
                    <span className="mb-2.5 block pl-1 text-[10px] font-medium text-neutral-600">
                      Elektron pochta
                    </span>

                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={120}
                      value={form.email}
                      onChange={updateField}
                      placeholder="name@example.com"
                      className={INPUT_CLASS}
                    />
                  </label>

                  {/* Message */}
                  <label className="block">
                    <span className="mb-2.5 block pl-1 text-[10px] font-medium text-neutral-600">
                      Xabaringiz
                    </span>

                    <textarea
                      name="message"
                      required
                      minLength={5}
                      maxLength={2000}
                      rows={3}
                      value={form.message}
                      onChange={updateField}
                      placeholder="Loyihangiz haqida yozing..."
                      className={`${INPUT_CLASS} min-h-[112px] resize-none leading-6`}
                    />

                    <span className="mt-2 block pr-1 text-right text-[9px] tabular-nums text-neutral-400">
                      {form.message.length} / 2000
                    </span>
                  </label>

                  {/* Submit */}
                  <div className="flex flex-col gap-4 pt-1">
                    <button
                      type="submit"
                      className="group inline-flex h-[50px] w-full items-center justify-between rounded-full bg-[#111] pl-6 pr-2 text-[10px] font-medium tracking-wide text-white shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-700 hover:shadow-[0_12px_30px_rgba(0,0,0,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black active:scale-[0.99]"
                    >
                      Yuborish
                      <span className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white/[0.14] transition-transform duration-300 group-hover:rotate-45">
                        <ArrowUpRight size={15} strokeWidth={1.5} />
                      </span>
                    </button>

                    {/* Status message */}
                    <p
                      role="status"
                      aria-live="polite"
                      className="min-h-[16px] text-center text-[10px] text-neutral-500"
                    >
                      {status}
                    </p>
                  </div>
                </form>

                {/* Bottom information */}
                <div className="mt-5 flex items-center gap-3 border-t border-black/[0.07] pt-5">
                  <Send size={13} strokeWidth={1.5} className="text-neutral-400" />

                  <span className="text-[9px] tracking-wide text-neutral-500">
                    Sizning g‘oyangiz biz uchun muhim.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  )
}
