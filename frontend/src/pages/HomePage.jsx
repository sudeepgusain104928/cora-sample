import PageLayout from '../components/layout/PageLayout'
import CareerSection from '../components/sections/CareerSection'
import Hero from '../components/sections/Hero'
import LocationFinder from '../components/sections/LocationFinder'
import NewsSection from '../components/sections/NewsSection'
import PainGrid from '../components/sections/PainGrid'
import ReferralSection from '../components/sections/ReferralSection'
import Testimonials from '../components/sections/Testimonials'

export default function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <PainGrid />
      <LocationFinder />
      <CareerSection />
      <ReferralSection />
      <Testimonials />
      <NewsSection />
    </PageLayout>
  )
}
