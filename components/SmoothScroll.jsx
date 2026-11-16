'use client'

import { ReactLenis } from 'lenis/react'


export default function SmoothScroll({ children }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 0.5,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
        infinite: false,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
