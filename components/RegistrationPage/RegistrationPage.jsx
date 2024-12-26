'use client'
import React from 'react'
import './RegistrationPage.css'
import Image from 'next/image'
import regImage from '@/public/reg_page.jpg'
import logo from '@/public/c4clogo_transparent.png'
import Button from '../button/Button'
import Link from 'next/link'
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa'

function RegistrationPage({onClose}) {
  return (
    <>
        <div className='fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center'>
            <div className='relative register-container bg-white'>
                <button className='absolute top-4 right-4 bg-black hover:bg-white text-white hover:text-black border-black w-8 h-8 rounded-lg' onClick={onClose}>X</button>
                <div className='register-content'>
                    <Image className='max-w-52 mx-auto' src={logo} alt='logo'/>
                    <form>
                        <div className='register-form'>
                            <div className='register-label-input'>
                                <label className='register-label' htmlFor="username">Username</label>
                                <input className='register-input' type="text" id="username" name="username" required/>
                            </div>
                            <div className='register-label-input'>
                                <label className='register-label' htmlFor="email">Email</label>
                                <input className='register-input' type="email" id="email" name="email" required/>
                            </div>
                            <div className='register-label-input'>
                                <label className='register-label' htmlFor="pass">Enter Password</label>
                                <input className='register-input' type="password" id="pass" name="pass" required/>
                            </div>
                            <div className='register-label-input'>
                                <label className='register-label' htmlFor="con_pass">Confirm Password</label>
                                <input className='register-input' type="password" id="con_pass" name="con_pass" required/>
                            </div>
                            <Button variant='cyan' size='block'>Register</Button>
                        </div>
                    </form>
                    <br />
                    <div className='register-social'>
                        <p className='text-[14px]'>Already have a account? <Link href={'/'}><span className='text-cyan-500 hover:text-cyan-300'>Log In</span></Link></p>
                        <Button variant='black' size='block'>
                            <div className='social-button'>
                                <FaGoogle/>
                                Sign in with Google
                            </div>
                        </Button>
                        <Button variant='black' size='block'>
                            <div className='social-button'>
                                <FaFacebook/>
                                Sign in with Facebook
                            </div>
                        </Button>
                        <Button variant='black' size='block'>
                            <div className='social-button'>
                                <FaApple/>
                                Sign in with Apple
                            </div>
                        </Button>
                    </div>
                </div>
                <div className='register-image hidden md:block'>
                    <Image src={regImage} alt='registration_image'/>
                </div>
            </div>
        </div>
    </>
  )
}

export default RegistrationPage