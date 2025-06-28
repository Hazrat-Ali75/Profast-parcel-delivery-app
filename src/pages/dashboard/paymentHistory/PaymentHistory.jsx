import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../loadingSpinner/LoadingSpinner'

const PaymentHistory = () => {
  const { user } = useContext(AuthContext)
  const axiosSecure = useAxiosSecure()

  const { isPending, data: paymentData = [] } = useQuery({
    queryKey: ['payments', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`)
      return res.data
    }
  })

  console.log(paymentData)

  if (isPending) {
    return <LoadingSpinner></LoadingSpinner>
  }

  return (
    <div className='w-11/12 mx-auto py-5'>
      <h1 className='text-center text-3xl md:text-5xl font-bold text-gray-800 mb-8'>
        Payment History
      </h1>

      {paymentData.length > 0 ? (
        <>
          {/* Table for large screens */}
          <div className='hidden md:block overflow-x-auto'>
            <div className='bg-white shadow-lg rounded-xl overflow-hidden'>
              <table className='min-w-full table-auto text-sm md:text-base'>
                <thead className='bg-gradient-to-r from-green-100 to-green-200 text-green-900'>
                  <tr>
                    <th className='px-6 py-4 text-left'>#</th>
                    <th className='px-6 py-4 text-left'>Parcel ID</th>
                    <th className='px-6 py-4 text-left'>Amount</th>
                    <th className='px-6 py-4 text-left'>Transaction ID</th>
                  </tr>
                </thead>
                <tbody className='text-gray-700 divide-y divide-gray-200'>
                  {paymentData.map((payment, index) => (
                    <tr
                      key={payment.transactionId}
                      className='hover:bg-gray-50 transition-colors duration-200'
                    >
                      <td className='px-6 py-4 font-medium'>{index + 1}</td>
                      <td className='px-6 py-4 font-semibold text-blue-600 whitespace-nowrap'>
                        {payment.parcelId}
                      </td>
                      <td className='px-6 py-4 font-semibold text-green-600'>
                        ${payment.amount}
                      </td>
                      <td className='px-6 py-4 break-all max-w-xs text-gray-500'>
                        {payment.transactionId}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card layout for mobile */}
          <div className='block md:hidden space-y-4'>
            {paymentData.map((payment, index) => (
              <div
                key={payment.transactionId}
                className='bg-white rounded-lg shadow-md p-4 space-y-2'
              >
                <p className='text-sm text-gray-600'>#{index + 1}</p>
                <p>
                  <span className='font-semibold text-gray-700'>
                    Parcel ID:
                  </span>{' '}
                  <span className='text-blue-600'>{payment.parcelId}</span>
                </p>
                <p>
                  <span className='font-semibold text-gray-700'>Amount:</span>{' '}
                  <span className='text-green-600'>${payment.amount}</span>
                </p>
                <p className='break-words'>
                  <span className='font-semibold text-gray-700'>
                    Transaction ID:
                  </span>{' '}
                  <span className='text-gray-500'>{payment.transactionId}</span>
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className='text-center text-gray-500 mt-10 text-lg'>
          No payment records found.
        </div>
      )}
    </div>
  )
}

export default PaymentHistory
