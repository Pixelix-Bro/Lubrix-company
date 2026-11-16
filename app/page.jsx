import Hero from '@/components/Hero/Hero'
import Welcome from '@/components/section-welcom/Welcome'
import SectionThree from '../components/section3/SectionThree'
import Sectionfour from '../components/section4/Sectionfour'

export default function home() {
  return (
    <div>
      <Hero />
      <Welcome />
      <SectionThree />
      <Sectionfour />
    </div>
  )
}
