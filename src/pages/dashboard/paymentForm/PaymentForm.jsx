import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../loadingSpinner/LoadingSpinner'
import {AuthContext} from '../../../context/AuthContext'
import Swal from 'sweetalert2'

const PaymentForm = () => {

  const stripe = useStripe()
  const elements = useElements()
  const {parcelId} = useParams();
  const {user} = useContext(AuthContext)
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()
  const [problem, setProblem] = useState('')

  const {isPending, data : parcelInfo = {}} = useQuery({
    queryKey : ['parcels', parcelId],
    queryFn : async ()=>{
      const res = await axiosSecure.get(`/parcels/${parcelId}`)
      return res.data
    }
  })

  const amount = parcelInfo.cost
  const amountInCent = amount * 100
  
  if(isPending){
     return <LoadingSpinner></LoadingSpinner>
  }
 
  // console.log(parcelInfo)
 
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
      parcelId
    })

    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card : elements.getElement(CardElement),
        billing_details : {
          name : user.displayName,
          email : user.email
        }
      }
    });

    if (result.error) {
      setProblem(result.error.message);
    } else {
      // Payment succeeded
      setProblem('')
      if(result.paymentIntent.status === 'succeeded'){
        console.log(result)
        console.log('payment is successfull')
        const transactionId = result.paymentIntent.id;
        const paymentData = {
          parcelId,
          email : user.email,
          amount,
          transactionId : transactionId,
          paymentMethod : result.paymentIntent.payment_method_types
        }
        const paymentRes = await axiosSecure.post('/payments',paymentData)
        if(paymentRes.data.insertedId){
          console.log('payment successfull')
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `payment successfull `,
            html : `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/dashboard/myParcels')
        }
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
