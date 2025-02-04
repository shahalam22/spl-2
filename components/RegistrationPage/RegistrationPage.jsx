'use client';
import React from 'react';
import './RegistrationPage.css';
import Image from 'next/image';
import regImage from '@/public/reg_page.jpg';
import logo from '@/public/c4clogo_transparent.png';
import Button from '../button/Button';
import Link from 'next/link';
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa';

const SOCIAL_LOGIN_BUTTONS = [
  { icon: <FaGoogle />, label: 'Sign in with Google' },
  { icon: <FaFacebook />, label: 'Sign in with Facebook' },
  { icon: <FaApple />, label: 'Sign in with Apple' },
];

function RegistrationPage({ onClose }) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className='fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center' onClick={onClose}>
      <div className='relative register-container bg-white' onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          className='absolute top-4 right-4 bg-black hover:bg-white text-white hover:text-black border-black w-8 h-8 rounded-lg'
          onClick={onClose}
          aria-label='Close'
        >
          X
        </button>

        {/* Registration Content */}
        <div className='register-content'>
          <Image className='max-w-52 mx-auto' src={logo} alt='logo' />
          <form onSubmit={handleFormSubmit}>
            <div className='register-form'>
              <FormInput label='Username' id='username' name='username' type='text' required />
              <FormInput label='Email' id='email' name='email' type='email' required />
              <FormInput label='Enter Password' id='pass' name='pass' type='password' required />
              <FormInput label='Confirm Password' id='con_pass' name='con_pass' type='password' required />
              <Button variant='cyan' size='block' type='submit'>
                Register
              </Button>
            </div>
          </form>

          {/* Social Login Section */}
          <div className='register-social'>
            <p className='text-[14px]'>
              Already have an account?{' '}
              <Link href={'/'}>
                <span className='text-cyan-500 hover:text-cyan-300'>Log In</span>
              </Link>
            </p>
            {SOCIAL_LOGIN_BUTTONS.map(({ icon, label }, index) => (
              <Button key={index} variant='black' size='block'>
                <div className='social-button'>
                  {icon}
                  {label}
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Registration Image */}
        <div className='register-image hidden md:block'>
          <Image src={regImage} alt='registration_image' />
        </div>
      </div>
    </div>
  );
}

// Reusable Form Input Component
const FormInput = ({ label, id, name, type, required }) => (
  <div className='register-label-input'>
    <label className='register-label' htmlFor={id}>
      {label}
    </label>
    <input className='register-input' type={type} id={id} name={name} required={required} />
  </div>
);

export default RegistrationPage;