import React from 'react'
import Marquee from 'react-fast-marquee'
import logo1 from '../../../assets/brands/amazon.png'
import logo2 from '../../../assets/brands/amazon_vector.png'
import logo3 from '../../../assets/brands/casio.png'
import logo4 from '../../../assets/brands/moonstar.png'
import logo5 from '../../../assets/brands/randstad.png'
import logo6 from '../../../assets/brands/start-people 1.png'
import logo7 from '../../../assets/brands/start.png'

const logos = [logo1,logo2,logo3,logo4,logo5,logo6,logo7]

const SalesTeams = () => {
  return (
    <section className='bg-gray-100 py-12'>
      <div className='text-center mb-8 px-4'>
        <h2 className='text-3xl font-bold'>
          We have helped thousands of sales teams
        </h2>
      </div>

      <Marquee
        pauseOnHover={true}
        gradient={false}
        speed={50}
        className='flex items-center gap-10'
      >
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Logo ${index + 1}`}
            className='h-8 mx-6 w-auto'
          />
        ))}
      </Marquee>
    </section>
  )
}

export default SalesTeams
