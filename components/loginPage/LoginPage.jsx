import React from 'react'
import './LoginPage.css'
import Image from 'next/image'
import loginImage from '@/public/login_page.jpg'
import logo from '@/public/c4clogo_transparent.png'
import Button from '../button/Button'
import Link from 'next/link'
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa'

function LoginPage({onClose}) {
  return (
    <>
        <div className='fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center' onClick={onClose}>
            <div className='relative login-container bg-white' onClick={(e)=>e.stopPropagation()}>
            <button className='absolute top-4 right-4 bg-black hover:bg-white text-white hover:text-black border-black w-8 h-8 rounded-lg' onClick={onClose}>X</button>
                <div className='login-content'>
                    <Image className='max-w-52 mx-auto' src={logo} alt='logo'/>
                    <form>
                        <div className='login-form'>
                            <div className='login-label-input'>
                                <label className='login-label' htmlFor="username">Username</label>
                                <input className='login-input' type="text" id="username" name="username" required/>
                            </div>
                            {/* <div className='login-label-input'>
                                <label className='login-label' htmlFor="email">Email</label>
                                <input className='login-input' type="email" id="email" name="email" required/>
                            </div> */}
                            <div className='login-label-input'>
                                <label className='login-label' htmlFor="pass">Enter Password</label>
                                <input className='login-input' type="password" id="pass" name="pass" required/>
                            </div>
                            {/* <div className='login-label-input'>
                                <label className='login-label' htmlFor="con_pass">Confirm Password</label>
                                <input className='login-input' type="password" id="con_pass" name="con_pass" required/>
                            </div> */}
                            <Button variant='cyan' size='block'>Login</Button>
                        </div>
                    </form>
                    <br />
                    <div className='login-social'>
                        <p className='text-[14px]'>Doesn't have account? <Link href={'/'}><span className='text-cyan-500 hover:text-cyan-300'>Sign In</span></Link></p>
                        <Button variant='black' size='block'>
                            <div className='social-button'>
                                <FaGoogle/>
                                Login with Google
                            </div>
                        </Button>
                        <Button variant='black' size='block'>
                            <div className='social-button'>
                                <FaFacebook/>
                                Login with Facebook
                            </div>
                        </Button>
                        <Button variant='black' size='block'>
                            <div className='social-button'>
                                <FaApple/>
                                Login with Apple
                            </div>
                        </Button>
                    </div>
                </div>
                <div className='login-image hidden md:block'>
                    <Image src={loginImage} alt='registration_image'/>
                </div>
            </div>
        </div>
    </>
  )
}

export default LoginPage