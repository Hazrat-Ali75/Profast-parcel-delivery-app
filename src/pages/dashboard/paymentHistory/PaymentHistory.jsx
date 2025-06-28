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
    <div className='overflow-x-auto w-11/12 mx-auto py-5'>
      <h1 className='text-center text-2xl md:text-4xl font-bold pb-5'>
        Payment History
      </h1>

      {paymentData.length > 0 ? (
        <div className='w-full'>
          <table className='table w-full min-w-[700px] text-sm md:text-base'>
            <thead>
              <tr className='bg-gray-100'>
                <th>#</th>
                <th>Parcel ID</th>
                <th>Amount</th>
                <th>Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {paymentData.map((payment, index) => (
                <tr key={payment.transactionId}>
                  <td>{index + 1}</td>
                  <td className='whitespace-nowrap'>{payment.parcelId}</td>
                  <td>${payment.amount}</td>
                  <td className='break-all max-w-xs'>
                    {payment.transactionId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='text-center text-gray-500 mt-4'>
          No payment records found.
        </div>
      )}
    </div>
  )
}

export default PaymentHistory
