'use client'

import GlassSurface from '@/components/GlassSurface'
import SpecularButton from '@/components/ui/SpecularButton'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [active, setActive] = useState(false)
  const [texte, setTexte] = useState(false)

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

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const menu = [
    { name: 'Home', link: '#home' },
    { name: 'About', link: '#about' },
    { name: 'Plans', link: '#plans' },
    { name: 'Contact', link: '#contact' },
  ]

  return (
    <div className="fixed top-0 left-0 z-[80] w-full flex justify-center p-[10px]">
      <div
        className={`
          relative transition-all duration-500 ease-in-out
          ${active ? 'w-[65%]' : 'w-full'}
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
          backgroundOpacity={active ? 0.1 : 0.04}
          saturation={1.2}
          redOffset={0}
          greenOffset={10}
          blueOffset={20}
          refraction
          renderer="auto"
          className="absolute inset-0 z-0 pointer-events-none"
        />

        {/* NAVBAR CONTENT */}
        <div className="absolute inset-0 z-10 flex w-full h-full items-center justify-between px-5">
          {/* LOGO */}
          <Image
            src={texte ? '/Logob.png' : '/logo.png'}
            alt="Lubrix"
            width={180}
            height={40}
            className="w-[160px] object-contain shrink-0 transition-all duration-500"
          />

          {/* LINKS */}
          <nav
            className={`
              relative z-20 flex items-center gap-7
              whitespace-nowrap transition-colors duration-500
              ${texte ? 'text-black' : 'text-white'}
            `}
          >
            {menu.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className="
                  relative py-2
                  transition-all duration-300
                  hover:opacity-60
                  after:absolute after:left-0 after:bottom-0
                  after:h-[1px] after:w-0
                  after:bg-current after:transition-all
                  after:duration-300
                  hover:after:w-full
                "
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* BUTTONS */}
          <div className="relative z-20 flex shrink-0 items-center gap-3">
            <Link target="_blank" href="https://app.lubrix.uz/login">
              <SpecularButton
                size="sm"
                radius={40}
                tint="#ffffff"
                tintOpacity={0}
                textColor={texte ? '#000' : '#fff'}
                lineColor={texte ? '#000' : '#fff'}
                baseColor="#525252"
                intensity={1.9}
                idleIntensity={0.55}
                shineSize={10}
                shineFade={90}
                thickness={1.2}
                glow={1}
                followMouse
                proximity={250}
              >
                Login
              </SpecularButton>
            </Link>

            <Link target="_blank" href="https://app.lubrix.uz/plans">
              <SpecularButton
                size="sm"
                radius={40}
                tint="#ffffff"
                tintOpacity={0}
                textColor={texte ? '#000' : '#fff'}
                lineColor={texte ? '#000' : '#fff'}
                baseColor="#525252"
                intensity={1.9}
                idleIntensity={0.55}
                shineSize={10}
                shineFade={90}
                thickness={1.2}
                glow={1}
                followMouse
                proximity={250}
              >
                Sign up
              </SpecularButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
