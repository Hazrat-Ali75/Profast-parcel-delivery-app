import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import { Link, useLocation, useNavigate } from 'react-router'
import { AuthContext } from '../../../context/AuthContext'
import axios from 'axios'
import { useState } from 'react'

const Register = () => {
  const { setUser, handleRegister, handleRegisterGoogle, handleUpdateUser } =
    useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const [imageUrl, setImageUrl] = useState('')

  const navigate = useNavigate()
  const location = useLocation()

  const onSubmit = data => {
    handleRegister(data.email, data.password)
    .then(useCredentials => {
        const user = useCredentials.user
        // setUser(user)
        // console.log(user)

        handleUpdateUser({ displayName: data.name, photoURL: imageUrl })
          .then(() => {
            setUser({ ...user, displayName: data.name, photoURL: imageUrl })
            navigate(`${location.state ? location.state : '/'}`)
            console.log(user)
          })
          .catch(err => {
            console.log(err.code)
          })
      })
      .catch(err => {
        console.log(err.code)
      })
  }

  const handleGoogleLogin = () => {
    handleRegisterGoogle()
      .then(res => {
        setUser(res.user)
        navigate(`${location.state ? location.state : '/'}`)
        console.log(res.user)
      })
      .catch(err => {
        console.log(err.code)
      })
  }

  const handleImageUpload = async e => {
    e.preventDefault()
    const image = e.target.files[0]
    const formData = new FormData()
    formData.append('image', image)
    const imageUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_UPLOAD_KEY
    }`
    const res = await axios.post(imageUrl, formData)
    setImageUrl(res.data.data.url)
    console.log(res.data.data.url)
    // console.log(file)
  }

  return (
    <div className=' flex items-center  px-4'>
      <div className='card w-full max-w-sm bg-white  rounded-lg'>
        <div className='card-body space-y-2'>
          {/* Heading */}
          <h1 className='text-3xl md:text-4xl font-bold text-color-darkgreen '>
            Create an Account
          </h1>
          <p className=' text-[16px] text-color-darkgreen'>
            Register with Profast
          </p>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
            <div>
              <label className='label text-color-darkgreen'>Name</label>
              <input
                type='text'
                {...register('name')}
                className='input input-bordered w-full'
                placeholder='Enter your name'
              />
            </div>
            <div>
              <label className='label text-color-darkgreen'>
                Upload your photo
              </label>
              <input
                type='file'
                onChange={handleImageUpload}
                className='input input-bordered w-full'
                placeholder='Enter your photo'
              />
            </div>
            <div>
              <label className='label text-color-darkgreen'>Email</label>
              <input
                type='email'
                {...register('email')}
                className='input input-bordered w-full'
                placeholder='Enter your email'
              />
            </div>

            <div>
              <label className='label text-color-darkgreen'>Password</label>
              <input
                type='password'
                {...register('password', {
                  required: true,
                  minLength: 6,
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/,
                    message:
                      'Password must contain at least 1 uppercase, 1 lowercase, and 1 special character'
                  }
                })}
                className='input input-bordered w-full'
                placeholder='Enter your password'
              />

              {errors.password?.type === 'required' && (
                <span className='text-orange-600 pt-1'>
                  This field is required
                </span>
              )}

              {errors.password?.type === 'minLength' && (
                <span className='text-orange-600 pt-1'>
                  Password length must be at least 6
                </span>
              )}

              {errors.password?.type === 'pattern' && (
                <span className='text-orange-600 pt-1'>
                  {errors.password.message}
                </span>
              )}
            </div>

            <button className='btn bg-color-green hover:bg-green-600 text-white w-full mt-2'>
              Login
            </button>
          </form>
          <p>
            Already have an account?{' '}
            <Link className='text-color-green text-[17px]' to='/login'>
              Login
            </Link>
          </p>

          {/* Divider */}
          <div className='divider text-gray-400 text-sm'>or</div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className='btn bg-gray-200 text-color-darkgreen w-full flex items-center justify-center gap-2'
          >
            <FcGoogle className='text-xl' />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register
