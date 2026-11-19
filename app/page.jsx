import FAQ from '@/components/faq/Faq'
import Hero from '@/components/Hero/Hero'
import Welcome from '@/components/section-welcom/Welcome'
import SectionThree from '../components/section3/SectionThree'
import Sectionfour from '../components/section4/Sectionfour'
import Contact from '@/components/contact/Contact';
import Footer from '../components/footer/Footer';

export default function home() {
  return (
    <div>
      <Hero />
      <Welcome />
      <SectionThree />
      <Sectionfour />
      <FAQ />
      <Contact />
      <Footer/>
    </div>
  )
}
