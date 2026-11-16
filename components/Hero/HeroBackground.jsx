'use client'

import { PredictiveArcCanvas } from '@designcodeio/threeui'

export default function HeroBackgorund() {
  return (
    <div className="w-full h-screen relative overflow-hidden -z-120">
      <PredictiveArcCanvas mode="dark" speed={2.00} hue={-61} saturation={1.0} brightness={1.0} />
    </div>
  )
}
