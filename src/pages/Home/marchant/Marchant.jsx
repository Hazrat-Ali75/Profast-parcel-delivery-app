import React from 'react'
import locationMarchant from '../../../assets/location-merchant.png'
import marchantBg from '../../../assets/be-a-merchant-bg.png'

const Marchant = () => {
  return (
    <div
      className='bg-[#067A87]  bg-no-repeat ] rounded-4xl'
      style={{ backgroundImage: `url(${marchantBg})` }}
    >
      <div className='flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-6 py-12 lg:px-20'>
        {/* Left content */}
        <div className='w-full lg:w-3/5 text-white text-center lg:text-left'>
          <h2 className='text-2xl md:text-4xl font-bold mb-4'>
            Merchant and Customer Satisfaction is Our First Priority
          </h2>
          <p className='mb-6 text-sm md:text-base text-gray-300'>
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Profast courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
            <button className='bg-color-green text-color-darkgreen  font-semibold px-5 py-2 rounded-4xl hover:bg-green-500 transition'>
              Be a Merchant
            </button>
            <button className='border border-color-green text-color-green px-5 py-2 rounded-4xl hover:bg-color-darkgreen hover:text-white transition'>
              Earn with Profast Courier
            </button>
          </div>
        </div>

        {/* Right image */}
        <div className='w-full lg:w-2/5 flex justify-center'>
          <img
            src={locationMarchant}
            alt='Merchant Location'
            className='max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full'
          />
        </div>
      </div>
    </div>
  )
}

export default Marchant

