import React from 'react'
import Banner from '../banner/Banner'
import HowItWorks from '../howWorks/HowItWorks'
import OurServices from '../services/OurServices'
import SalesTeams from '../salesteams/SalesTeams'
import FeaturesSection from '../features/FeaturesSection'
import Marchant from '../marchant/Marchant'
import CenteredCarousel from '../reviews/CenteredCarousel'
import FAQ from '../Faq/Faq'


const Home = () => {
  return (
    <div>
      <div className='my-10'>
        <Banner></Banner>
      </div>
      <HowItWorks></HowItWorks>
      <OurServices></OurServices>
      <SalesTeams></SalesTeams>
      <FeaturesSection></FeaturesSection>
      <div className='my-15'>
        <Marchant></Marchant>
      </div>
      <CenteredCarousel></CenteredCarousel>
      <FAQ></FAQ>
    </div>
  )
}

export default Home
