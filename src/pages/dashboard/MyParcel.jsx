import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyParcel = () => {
  const { user } = useContext(AuthContext)
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['my-parcels', user.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/parcels?email=${user.email}`)
      return response.data
    }
  })

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`)
        .then(res=>{
            console.log(res.data)
            if(res.data.deletedCount){
                Swal.fire('Deleted!', 'Your parcel has been deleted.', 'success');
            }
            refetch()
        }).catch(err=>{
            Swal.fire(`${err}`);
        }) 
      }
    });
  };

  const handlePayment = (id) =>{
    navigate(`/dashboard/payment/${id}`)
  }

  return (
    <div className='w-11/12 mx-auto'>
      <h2 className='text-2xl md:text-4xl font-bold text-color-darkgreen mb-8 text-center'>
        My Parcels
      </h2>
      <div className='overflow-x-auto md:w-[90%] mx-auto'>
        {parcels.length === 0 ? (
          <div className='text-center text-gray-500 text-lg py-10'>
            📦 No parcel found.
          </div>
        ) : (
          <table className='table table-zebra w-full'>
            <thead className='bg-base-200'>
              <tr>
                <th>Parcel Name</th>
                <th>Type</th>
                <th>Delivery Status</th>
                <th>Cost</th>
                <th>Payment Status</th>
                <th>Created At</th>
                <th className='text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map(parcel => (
                <tr key={parcel._id}>
                  <td>{parcel.parcelName}</td>
                  <td className='capitalize'>{parcel.parcelType}</td>
                  <td className='capitalize'>{parcel.delivery_status}</td>
                  <td className='capitalize'>৳{parcel.cost}</td>
                  <td className='capitalize'>{parcel.payment_status}</td>
                  <td>{new Date(parcel.creation_date).toLocaleDateString()}</td>
                  <td className='flex gap-2 justify-center'>
                    <button
                    //   onClick={() => onDetails(parcel)}
                      className='btn btn-sm btn-info text-white'
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handlePayment(parcel._id)}
                      className='btn btn-sm btn-warning text-white'
                    >
                      Pay
                    </button>
                    <button
                      onClick={() => handleDelete(parcel._id)}
                      className='btn btn-sm btn-error text-white'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default MyParcel
