import React, { useState } from 'react'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2'
import { FaQuoteLeft } from 'react-icons/fa'

const reviews = [
  {
    id: 1,
    text: 'A posture corrector works by providing support and gentle alignment...',
    name: 'Awlad Hossin',
    title: 'Senior Product Designer',
    image: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: 2,
    text: 'A posture corrector helped reduce my back pain while sitting for long hours.',
    name: 'Rasel Ahamed',
    title: 'CTO',
    image: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  {
    id: 3,
    text: 'I feel more confident and pain-free after using this for just a few weeks.',
    name: 'Nasir Uddin',
    title: 'CEO',
    image: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    id: 4,
    text: 'It’s an essential daily accessory for anyone who sits a lot.',
    name: 'Kazi Rifat',
    title: 'UX Consultant',
    image: 'https://randomuser.me/api/portraits/men/4.jpg'
  },
  {
    id: 5,
    text: 'Great for posture improvement and daily confidence boost!',
    name: 'Mehedi Hasan',
    title: 'Health Advisor',
    image: 'https://randomuser.me/api/portraits/men/5.jpg'
  },
  {
    id: 6,
    text: 'This product truly changed my workspace comfort for the better.',
    name: 'Sabrina Rahman',
    title: 'Product Manager',
    image: 'https://randomuser.me/api/portraits/women/6.jpg'
  },
  {
    id: 7,
    text: 'I noticed significant improvement in my posture within weeks.',
    name: 'Faisal Islam',
    title: 'Software Engineer',
    image: 'https://randomuser.me/api/portraits/men/7.jpg'
  },
  {
    id: 8,
    text: 'Highly recommend for those suffering from neck and shoulder pain.',
    name: 'Tanvir Hossain',
    title: 'Business Analyst',
    image: 'https://randomuser.me/api/portraits/men/8.jpg'
  },
  {
    id: 9,
    text: 'Comfortable, durable, and effective—my daily must-have accessory!',
    name: 'Nusrat Jahan',
    title: 'Graphic Designer',
    image: 'https://randomuser.me/api/portraits/women/9.jpg'
  },
  {
    id: 10,
    text: 'Helps me maintain focus and avoid fatigue throughout the workday.',
    name: 'Mahbub Chowdhury',
    title: 'Consultant',
    image: 'https://randomuser.me/api/portraits/men/10.jpg'
  },
  {
    id: 11,
    text: 'Perfect for remote workers who spend long hours at their desk.',
    name: 'Anika Siddique',
    title: 'Marketing Specialist',
    image: 'https://randomuser.me/api/portraits/women/11.jpg'
  },
  {
    id: 12,
    text: 'Lightweight design makes it easy to wear all day without discomfort.',
    name: 'Arif Chowdhury',
    title: 'Freelancer',
    image: 'https://randomuser.me/api/portraits/men/12.jpg'
  },
  {
    id: 13,
    text: 'I love how it supports my back during long study sessions.',
    name: 'Shamim Akhter',
    title: 'Student',
    image: 'https://randomuser.me/api/portraits/women/13.jpg'
  },
  {
    id: 14,
    text: 'Makes sitting for long hours less stressful on my spine.',
    name: 'Imran Hossain',
    title: 'Entrepreneur',
    image: 'https://randomuser.me/api/portraits/men/14.jpg'
  },
  {
    id: 15,
    text: 'A simple yet effective solution for better posture and wellbeing.',
    name: 'Rina Ahmed',
    title: 'Physiotherapist',
    image: 'https://randomuser.me/api/portraits/women/15.jpg'
  }
]


const CenteredCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1)

  const goPrev = () => {
    setCurrentIndex(prev => (prev === 0 ? reviews.length - 1 : prev - 1))
  }

  const goNext = () => {
    setCurrentIndex(prev => (prev === reviews.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className='bg-gray-100 py-16 px-4 overflow-hidden'>
      <div className='text-center mb-10'>
        <h2 className='text-3xl font-bold'>What Our Customers Are Saying</h2>
        <p className='text-gray-600 max-w-xl mx-auto mt-4'>
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>

      <div className='relative max-w-7xl mx-auto overflow-hidden'>
        <div
          className='flex transition-transform duration-700 ease-in-out'
          style={{
            transform: `translateX(calc(-${currentIndex * 33.33}% + 33.33%))`
          }}
        >
          {reviews.map((card, index) => {
            const isCenter = index === currentIndex
            return (
              <div
                key={card.id}
                className={`min-w-[33.33%] px-4 h-[300px] transition-all duration-500 ${
                  isCenter
                    ? '+scale-y-125 opacity-100 -translate-y-2 z-10'
                    : 'scale-95 opacity-50'
                }`}
              >
                <div className='bg-white rounded-xl shadow-lg px-6 py-8 h-[270px]'>
                  <FaQuoteLeft className='text-3xl text-cyan-300 mb-4' />
                  <p className='text-sm text-gray-600 mb-4'>{card.text}</p>
                  <hr className='border-dashed border-gray-300 mb-4' />
                  <div className='flex items-center gap-4'>
                    <img
                      src={card.image}
                      alt={card.name}
                      className='w-12 h-12 rounded-full object-cover'
                    />
                    <div>
                      <h4 className='font-semibold text-sm'>{card.name}</h4>
                      <p className='text-xs text-gray-500'>{card.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className='mt-10 flex justify-center gap-6'>
        <button
          onClick={goPrev}
          className='w-10 h-10 flex items-center justify-center rounded-full border bg-lime-400 hover:bg-lime-500 text-white shadow'
        >
          <HiArrowLeft className='text-xl' />
        </button>
        <button
          onClick={goNext}
          className='w-10 h-10 flex items-center justify-center rounded-full bg-lime-400 hover:bg-lime-500 text-white shadow'
        >
          <HiArrowRight className='text-xl' />
        </button>
      </div>
    </section>
  )
}

export default CenteredCarousel






