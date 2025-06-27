import React, { useState } from 'react'

const faqData = [
  {
    question: 'How long does delivery take?',
    answer:
      'Standard delivery usually takes 24–72 hours depending on the destination. Express delivery in Dhaka takes 4–6 hours.'
  },
  {
    question: 'Do you offer cash on delivery?',
    answer:
      'Yes, we provide cash on delivery across all districts in Bangladesh with 100% product safety guarantee.'
  },
  {
    question: 'Can I track my parcel in real-time?',
    answer:
      'Absolutely! We offer real-time parcel tracking through our web dashboard and mobile app.'
  },
  {
    question: 'How do I become a merchant partner?',
    answer:
      'You can join us as a merchant by filling out our registration form. Our support team will help you onboard quickly.'
  },
  {
    question: 'What happens if my parcel is damaged or lost?',
    answer:
      'We take full responsibility for product safety. In case of loss or damage, we offer full compensation upon verification.'
  }
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = index => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className=' py-16 px-4'>
      <div className='max-w-4xl mx-auto text-center mb-12'>
        <h2 className='text-3xl md:text-4xl font-bold mb-4 text-color-darkgreen'>
          Frequently Asked Questions
        </h2>
        <p className='text-color-textgray'>
          Got questions? We’re here to help. Find answers to common inquiries
          below.
        </p>
      </div>

      <div className='max-w-4xl mx-auto space-y-4'>
        {faqData.map((item, index) => (
          <div
            key={index}
            className={openIndex===index ? 'bg-[#8edee7] border-1 border-[#067A87] rounded-md transition-all':'border border-gray-200 rounded-md shadow-sm '}
          >
            <button
              className='w-full text-left px-6 py-4 font-semibold text-lg text-gray-800 flex justify-between items-center'
              onClick={() => toggleFAQ(index)}
            >
              {item.question}
              <span>{openIndex === index ? '˅' : '˄'}</span>
            </button>
            {openIndex === index && (
              <div className='px-6 pb-4 text-gray-600'>{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default FAQ
