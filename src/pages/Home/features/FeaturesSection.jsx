import React from 'react'
import feature1 from '../../../assets/live-tracking.png'
import feature2 from '../../../assets/safe-delivery.png'
import feature3 from '../../../assets/safe-delivery.png'

const items = [
  {
    image: feature1,
    title: 'Live Parcel Tracking',
    description:
      'We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.'
  },
  {
    image: feature2,
    title: '100% Safe Delivery',
    description:
      'We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.'
  },
  {
    image: feature3,
    title: '24/7 Call Center Support',
    description:
      'Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.'
  }
]

const FeaturesSection = () => {
  return (
    <section className=' py-15 '>
      <div className='space-y-12'>
        {items.map((item, index) => (
          <div
            key={index}
            className='w-full flex flex-col lg:flex-row bg-white items-center justify-between px-4 lg:px-12 rounded-4xl'
          >
            {/* Image */}
            <div className='w-full lg:w-[25%] mb-4 lg:mb-0 p-7'>
              <img
                src={item.image}
                alt={item.title}
                className='w-[220] md:w-full h-[170px] md:h-[270px] object-fit mx-auto md:mx-0'
              />
            </div>

            {/* Vertical Divider */}
            <div className='hidden lg:flex h-40 border-l-2 border-dashed border-gray-400 mx-6 '></div>

            {/* Text */}
            <div className='w-full lg:w-[75%] text-center lg:text-left pb-6 md:pb-0 '>
              <h3 className='text-2xl font-bold mb-2 text-color-darkgreen'>{item.title}</h3>
              <p className=' text-sm text-color-textgray'>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection
