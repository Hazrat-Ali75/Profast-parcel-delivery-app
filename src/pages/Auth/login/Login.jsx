import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import { Link, useLocation, useNavigate } from 'react-router'
import { AuthContext } from '../../../context/AuthContext'

const Login = () => {
  const { setUser, handleLogin,handleRegisterGoogle} = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const navigate = useNavigate()
  const location = useLocation()

  const onSubmit = data => {
    handleLogin(data.email,data.password)
    .then(useCredentails=>{
      const user = useCredentails.user
      setUser(user)
      navigate(`${location.state ? location.state : '/'}`);
      console.log(user)
    })
    .catch(error=>{
      console.log(error.code)
    })
  }

  const handleGoogleLogin = () =>{
    handleRegisterGoogle()
    .then(res=> {
       setUser(res.user)
       navigate(`${location.state ? location.state : '/'}`);
       console.log(res.user)
    })
    .catch(err=>{
      console.log(err.code)
    })
  }

  return (
    <div className=' flex items-center  px-4'>
      <div className='card w-full max-w-sm bg-white  rounded-lg'>
        <div className='card-body space-y-2'>
          {/* Heading */}
          <h1 className='text-3xl md:text-4xl font-bold text-color-darkgreen '>
            Welcome Back
          </h1>
          <p className=' text-[16px] text-color-darkgreen'>
            Login with Profast
          </p>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
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

            <div className=''>
              <Link className='link link-hover text-sm text-color-darkgreen'>
                Forgot password?
              </Link>
            </div>

            <button
              type='submit'
              className='btn bg-color-green hover:bg-green-600 text-white w-full mt-2'
            >
              Login
            </button>
          </form>
          <p>
            Don't Have any account?{' '}
            <Link className='text-color-green text-[17px]' to='/register'>
              Register
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

export default Login
