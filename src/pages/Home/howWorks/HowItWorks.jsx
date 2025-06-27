import React from 'react'
import {
  FaTruckPickup,
  FaMoneyBillWave,
  FaWarehouse,
  FaBuilding
} from 'react-icons/fa'

const steps = [
  {
    icon: <FaTruckPickup className='text-4xl text-color-darkgreen' />,
    title: 'Booking Pick & Drop',
    description:
      'Easily schedule a pickup from your location and get your parcel delivered to any destination with real-time tracking.'
  },
  {
    icon: <FaMoneyBillWave className='text-4xl text-color-darkgreen' />,
    title: 'Cash On Delivery',
    description:
      'Let your customers pay upon receiving the parcel. We ensure secure and timely cash collection on your behalf.'
  },
  {
    icon: <FaWarehouse className='text-4xl text-color-darkgreen' />,
    title: 'Delivery Hub',
    description:
      'Our wide network of delivery hubs ensures faster and safer deliveries to even the most remote locations.'
  },
  {
    icon: <FaBuilding className='text-4xl text-color-darkgreen' />,
    title: 'Booking SME & Corporate',
    description:
      'Tailored logistics solutions for SMEs and corporate clients with bulk delivery support and dedicated account managers.'
  }
]

const HowItWorks = () => {
  return (
    <div className='my-10 px-4 max-w-7xl mx-auto'>
      <h2 className='text-4xl font-bold  mb-8'>How It Works</h2>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {steps.map((step, index) => (
          <div
            key={index}
            className='card bg-base-100 shadow-md hover:shadow-xl transition duration-300'
          >
            <div className='card-body items-center text-center'>
              {step.icon}
              <h3 className='card-title mt-4 text-color-darkgreen'>{step.title}</h3>
              <p className='text-sm text-gray-600'>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HowItWorks
