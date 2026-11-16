import Hero from '@/components/Hero/Hero'
import Welcome from '@/components/section-welcom/Welcome'
import SectionThree from '../components/section3/SectionThree'

export default function home() {
  return (
    <div>
      <Hero />
      <Welcome />
      <SectionThree />
    </div>
  )
}
