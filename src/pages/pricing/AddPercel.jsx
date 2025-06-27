import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLoaderData } from 'react-router'
import { AuthContext } from '../../context/AuthContext'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const generateTrackingID = () => {
  const date = new Date()
  const datePart = date.toISOString().split('T')[0].replace(/-/g, '')
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase()
  return `PCL-${datePart}-${rand}`
}


const AddParcel = () => {
  const { register, handleSubmit, reset, watch } = useForm()
  const {user} = useContext(AuthContext)
  const axiosSecure = useAxiosSecure()

  const serviceCenters = useLoaderData()

  // Extract unique regions
  const uniqueRegions = [...new Set(serviceCenters.map(w => w.region))]

  const [senderRegion, setSenderRegion] = useState('')
  const [receiverRegion, setReceiverRegion] = useState('')

  const getDistrictByRegions = region => {
    return [
      ...new Set(
        serviceCenters
          .filter(center => center.region === region)
          .map(center => center.district)
      )
    ]
  }

  const parcelType = watch('parcelType')
  // const senderRegion = watch('senderRegion')
  // const receiverRegion = watch('receiverRegion')

  const onSubmit = data => {
    const weight = parseFloat(data.weight)
    let basePrice = 0
    let extraPrice = 0
    const isSameDistrict = data.senderWarehouse === data.receiverWarehouse

    if (parcelType === "document") {
      basePrice = isSameDistrict ? 60 : 80
    } else {
      if (weight <= 3) {
        basePrice = isSameDistrict ? 110 : 150
      } else {
        const extraKg = weight - 3
        const perKgCharge = extraKg * 40
        basePrice = isSameDistrict ? 110 : 150
        const districtExtra = isSameDistrict ? 0 : 40
        extraPrice = perKgCharge + districtExtra
      }
    }

    const totalCost = basePrice + extraPrice

    const parcelData = {
      ...data,
      cost: totalCost,
      payment_status: 'unpaid',
      delivery_status: 'not_collected',
      created_by: user.email,
      creation_date: new Date().toISOString(),
      tracking_id: generateTrackingID()
    }


    axiosSecure.post('/parcels',parcelData)
    .then(res=>{
      console.log(res.data)
    })
    .catch(err=>{
      console.log(err)
    })

    // console.log('Submitted Data:', parcelData)
    // reset()
  }

  return (
    <div className='w-full bg-white rounded-4xl px-8 md:px-20 py-12 md:py-20 mt-10 mb-30'>
      <h1 className='text-4xl font-extrabold mb-4'>Add Parcel</h1>
      <hr className='border border-gray-300 mb-6' />
      <h2 className='text-2xl font-semibold mb-4'>Enter Your Parcel Details</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Parcel Name */}
        <div className='form-control mb-6'>
          <label className='label'>Parcel Name</label>
          <br />
          <input
            type='text'
            {...register('parcelName', { required: true })}
            className='input input-bordered md:w-[30%]'
            placeholder='Enter parcel name'
          />
        </div>

        {/* Parcel Type */}
        <div className='mb-6'>
          <label className='label'>Parcel Type</label>
          <div className='flex gap-6 mt-1'>
            <label className='label cursor-pointer'>
              <input
                type='radio'
                value='document'
                {...register('parcelType', { required: true })}
                className='radio checked:bg-blue-500'
              />
              <span className='label-text ml-2'>Document</span>
            </label>
            <label className='label cursor-pointer'>
              <input
                type='radio'
                value='non-document'
                {...register('parcelType', { required: true })}
                className='radio checked:bg-blue-500'
              />
              <span className='label-text ml-2'>Non-document</span>
            </label>
          </div>
        </div>

        {/* Weight */}
        <div className='form-control mb-6'>
          <label className='label'>Add Weight (kg)</label>
          <br />
          <input
            type='number'
            step='0.01'
            {...register('weight')}
            className='input input-bordered md:w-[30%]'
            placeholder='Enter weight in kg'
            disabled={parcelType !== 'non-document'}
          />
          {parcelType === 'document' && (
            <p className='text-sm text-gray-500 mt-1'>
              Weight input is disabled for document parcels.
            </p>
          )}
        </div>

        <hr className='border border-gray-300 mb-6' />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mb-8'>
          {/* Sender Details */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Sender Details</h3>
            <div className='form-control mb-4'>
              <label className='label'>Name</label>
              <input
                type='text'
                {...register('senderName')}
                className='input input-bordered w-full'
              />
            </div>
            <div className='form-control mb-4'>
              <label className='label'>Contact Number</label>
              <input
                type='number'
                {...register('senderContact')}
                className='input input-bordered w-full'
              />
            </div>
            <div className='form-control mb-4'>
              <label className='label'>Sender Region</label>
              <select
                {...register('senderRegion')}
                onChange={e => setSenderRegion(e.target.value)}
                className='select select-bordered w-full'
              >
                <option value=''>Select Region</option>
                {uniqueRegions.map(region => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
            <div className='form-control mb-4'>
              <label className='label'>Service Center</label>
              <select
                {...register('senderWarehouse')}
                className='select select-bordered w-full'
              >
                <option value=''>Select Center</option>
                {getDistrictByRegions(senderRegion).map(dist => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>
            <div className='form-control mb-4'>
              <label className='label'>Pickup Instruction</label>
              <textarea
                {...register('pickupInstruction')}
                className='textarea textarea-bordered w-full'
              />
            </div>
          </div>

          {/* Receiver Details */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Receiver Details</h3>
            <div className='form-control mb-4'>
              <label className='label'>Name</label>
              <input
                type='text'
                {...register('receiverName')}
                className='input input-bordered w-full'
              />
            </div>
            <div className='form-control mb-4'>
              <label className='label'>Contact Number</label>
              <input
                type='number'
                {...register('receiverContact')}
                className='input input-bordered w-full'
              />
            </div>
            <div className='form-control mb-4'>
              <label className='label'>Receiver Region</label>
              <select
                {...register('receiverRegion')}
                onChange={e => setReceiverRegion(e.target.value)}
                className='select select-bordered w-full'
              >
                <option value=''>Select Region</option>
                {uniqueRegions.map(region => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
            <div className='form-control mb-4'>
              <label className='label'>Service Center</label>
              <select
                {...register('receiverWarehouse')}
                className='select select-bordered w-full'
              >
                <option value=''>Select Center</option>
                {getDistrictByRegions(receiverRegion).map(dist => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>
            <div className='form-control mb-4'>
              <label className='label'>Delivery Instruction</label>
              <textarea
                {...register('deliveryInstruction')}
                className='textarea textarea-bordered w-full'
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className='text-left'>
          <button
            type='submit'
            className='btn bg-color-green rounded-full text-white px-8'
          >
            Submit Parcel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddParcel
