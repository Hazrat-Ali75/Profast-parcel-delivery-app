import React from 'react'
import {Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from './paymentForm/PaymentForm'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PAYMENT_KEY)
const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm>   
      </PaymentForm>
    </Elements>
  )
}

export default Payment
