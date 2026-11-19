import HeroBackgorund from '@/components/Hero/HeroBackground'
import { TextHoverEffect } from '@/components/ui/text-hover-effect'

export default function Hero() {
  return (
    <div id="home">
      <HeroBackgorund />
      <div className="absolute h-full flex justify-center  items-center top-0 bottom-0 text-white">
        <div className="h-[50%] w-dvw relative ">
          <TextHoverEffect text={'LUBRIX'} />
        </div>
      </div>
    </div>
  )
}
