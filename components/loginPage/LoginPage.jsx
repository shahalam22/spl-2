import React from 'react';
import './LoginPage.css';
import Image from 'next/image';
import loginImage from '@/public/login_page.jpg';
import logo from '@/public/c4clogo_transparent.png';
import Button from '../button/Button';
import Link from 'next/link';
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa';

const SOCIAL_LOGIN_BUTTONS = [
  { icon: <FaGoogle />, label: 'Login with Google' },
  { icon: <FaFacebook />, label: 'Login with Facebook' },
  { icon: <FaApple />, label: 'Login with Apple' },
];

function LoginPage({ onClose }) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className='fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center' onClick={onClose}>
      <div className='relative login-container bg-white' onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          className='absolute top-4 right-4 bg-black hover:bg-white text-white hover:text-black border-black w-8 h-8 rounded-lg'
          onClick={onClose}
          aria-label='Close'
        >
          X
        </button>

        {/* Login Content */}
        <div className='login-content'>
          <Image className='max-w-52 mx-auto' src={logo} alt='logo' />
          <form onSubmit={handleFormSubmit}>
            <div className='login-form'>
              <FormInput label='Username' id='username' name='username' type='text' required />
              <FormInput label='Enter Password' id='pass' name='pass' type='password' required />
              <Button variant='cyan' size='block' type='submit'>
                Login
              </Button>
            </div>
          </form>

          {/* Social Login Section */}
          <div className='login-social'>
            <p className='text-[14px]'>
              Doesn't have an account?{' '}
              <Link href={'/'}>
                <span className='text-cyan-500 hover:text-cyan-300'>Sign In</span>
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

        {/* Login Image */}
        <div className='login-image hidden md:block'>
          <Image src={loginImage} alt='login_image' />
        </div>
      </div>
    </div>
  );
}

// Reusable Form Input Component
const FormInput = ({ label, id, name, type, required }) => (
  <div className='login-label-input'>
    <label className='login-label' htmlFor={id}>
      {label}
    </label>
    <input className='login-input' type={type} id={id} name={name} required={required} />
  </div>
);

export default LoginPage;