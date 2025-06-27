import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import { useParams } from 'react-router'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../loadingSpinner/LoadingSpinner'

const PaymentForm = () => {

  const stripe = useStripe()
  const elements = useElements()
  const {id} = useParams();
  const axiosSecure = useAxiosSecure()
  const [problem, setProblem] = useState('')

  const {isPending, data : parcelInfo = {}} = useQuery({
    queryKey : ['parcels', id],
    queryFn : async ()=>{
      const res = await axiosSecure.get(`/parcels/${id}`)
      return res.data
    }
  })

  const amount = parcelInfo.cost
  const amountInCent = amount * 100
  
  if(isPending){
     return <LoadingSpinner></LoadingSpinner>
  }
 
  console.log(parcelInfo)
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return
    }

    const card = elements.getElement(CardElement)
    if (!card) {
      return
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    })

    if (error) {
      setProblem(error.message)
    } else {
        setProblem('')
      console.log('paymentMethod', paymentMethod)
    }

    const res = await axiosSecure.post('/create-payment-intent',{
      amount : amountInCent,
      id
    })

    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card : elements.getElement(CardElement),
        billing_details : {
          name : 'Hazrat Ali'
        }
      }
    });

    if (result.error) {
      setProblem(result.error.message);
    } else {
      // Payment succeeded
      if(result.paymentIntent.status === 'succeeded'){
        console.log('payment is successfull')
      }
    }

    console.log(res)
  }

  return (
    <form
      className='space-y-4 p-4 max-w-md mx-auto bg-white shadow-md rounded-md'
      onSubmit={handleSubmit}
    >
      <CardElement className='p-3 border border-gray-300 rounded-md'></CardElement>
      <button
        type='submit'
        className='btn bg-color-green text-color-darkgreen w-full '
        disabled={!stripe}
      >
        Pay ${amount}
      </button>
      {problem && <p className='text-red-500 text-sm'>{problem}</p>}
    </form>
  )
}

export default PaymentForm
