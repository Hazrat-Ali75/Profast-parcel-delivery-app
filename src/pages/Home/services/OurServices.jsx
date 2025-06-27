import React from 'react'
import {
  FaShippingFast,
  FaMapMarkedAlt,
  FaBoxes,
  FaHandHoldingUsd,
  FaWarehouse,
  FaUndo
} from 'react-icons/fa'

const services = [
  {
    icon: <FaShippingFast className='text-4xl text-primary' />,
    title: 'Express & Standard Delivery',
    description:
      'We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.'
  },
  {
    icon: <FaMapMarkedAlt className='text-4xl text-primary' />,
    title: 'Nationwide Delivery',
    description:
      'We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.'
  },
  {
    icon: <FaBoxes className='text-4xl text-primary' />,
    title: 'Fulfillment Solution',
    description:
      'We also offer customized service with inventory management support, online order processing, packaging, and after sales support.'
  },
  {
    icon: <FaHandHoldingUsd className='text-4xl text-primary' />,
    title: 'Cash on Home Delivery',
    description:
      '100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.'
  },
  {
    icon: <FaWarehouse className='text-4xl text-primary' />,
    title: 'Corporate Service / Contract In Logistics',
    description:
      'Customized corporate services which includes warehouse and inventory management support.'
  },
  {
    icon: <FaUndo className='text-4xl text-primary' />,
    title: 'Parcel Return',
    description:
      'Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.'
  }
]

const OurServices = () => {
  return (
    <section className='bg-color-darkgreen py-12 rounded-4xl my-16'>
      <div className='max-w-7xl mx-auto px-4 text-center'>
        <h2 className='text-3xl font-bold mb-4 text-white'>Our Services</h2>
        <p className='text-gray-300 mb-10 max-w-2xl mx-auto'>
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {services.map((service, idx) => (
            <div
              key={idx}
              className='card bg-white shadow-md hover:shadow-lg transition-all'
            >
              <div className='card-body items-center text-center hover:bg-color-green rounded-lg transition-all'>
                {service.icon}
                <h3 className='card-title mt-4'>{service.title}</h3>
                <p className='text-sm text-gray-600'>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurServices
