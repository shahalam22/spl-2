'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import regImage from '@/public/reg_page.jpg';
import logo from '@/public/c4clogo_transparent.png';
import Button from '@/components/button/Button';
import Link from 'next/link';
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { registerUser } from '@/redux/features/authSlice';

const SOCIAL_LOGIN_BUTTONS = [
  { icon: <FaGoogle />, label: 'Sign in with Google' },
  { icon: <FaFacebook />, label: 'Sign in with Facebook' },
  { icon: <FaApple />, label: 'Sign in with Apple' },
];

function Registration() {
  const [formData, setFormData] = useState({ username:"", email: "", password: "", confirmPassword: "" });
  const dispatch = useAppDispatch(); // Add dispatcher hook
  const { loading, error } = useAppSelector((state) => state.auth); // Access loading and error states
  const router = useRouter();

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // console.log(e.target.value);
    
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dispatch the loginUser action with form data
      // console.log(formData);
      
      
      const result = await dispatch(registerUser(formData));

      // Check if the action was fulfilled (successful login)
      if (registerUser.fulfilled.match(result)) {
        router.push("/"); // Redirect to home on success
      }
    } catch (err) {
      console.error("Registration error:", err); // Log any unexpected errors
    }
  };

  return (
    <div
      className="fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"
      onClick={() => router.push('/')}
    >
      <div
        className="relative flex flex-col md:flex-row bg-white rounded-2xl max-w-[900px] max-h-[600px] w-full p-5 pb-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 bg-black hover:bg-white text-white hover:text-black border border-black w-8 h-8 rounded-lg"
          onClick={() => router.push('/')}
          aria-label="Close"
        >
          X
        </button>

        {/* Registration Content */}
        <div className="flex flex-col w-full md:w-1/2">
          <Image className="max-w-[200px] mx-auto mb-5" src={logo} alt="logo" />
          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col justify-center items-center gap-3 w-[90%] mx-auto">
              <FormInput 
                label="Enter Username" 
                id="username" 
                name="username" 
                type="text"
                value={formData.username}
                onChange={handleInputChange} 
                required
              />
              <FormInput 
                label="Enter Email" 
                id="email" 
                name="email" 
                type="email"
                value={formData.email}
                onChange={handleInputChange} 
                required
              />
              <FormInput 
                label="Enter Password" 
                id="password"
                name="password" 
                type="password"
                value={formData.password}
                onChange={handleInputChange} 
                required
              />
              <FormInput 
                label="Confirm Password" 
                id="confirmPassword" 
                name="confirmPassword" 
                type="password" 
                value={formData.confirmPassword} 
                onChange={handleInputChange}
                required 
              />
              {/* <Button variant="cyan" size="block" type="submit">
                Register
              </Button> */}
              <Button variant="cyan" size="block" type="submit" disabled={loading}>
                {loading ? "Creating Account..." : "Register"}
              </Button>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </form>

          {/* Social Login Section */}
          <div className="flex flex-col items-center gap-3 w-[90%] mx-auto mt-5">
            <p className="text-sm">
              Already have an account?{' '}
              <Link href={'/'}>
                <span className="text-cyan-500 hover:text-cyan-300">Log In</span>
              </Link>
            </p>
            {SOCIAL_LOGIN_BUTTONS.map(({ icon, label }, index) => (
              <Button key={index} variant="black" size="block">
                <div className="flex justify-center items-center gap-2 w-full h-8 px-2 cursor-pointer">
                  {icon}
                  {label}
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Registration Image */}
        <div className="hidden md:block w-1/2">
          <Image
            className="rounded-r-2xl object-cover w-full h-full"
            src={regImage}
            alt="registration_image"
          />
        </div>
      </div>
    </div>
  );
}

// Reusable Form Input Component
function FormInput({ label, id, name, type, value, onChange, required }) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-normal mb-1" htmlFor={id}>
        {label}
      </label>
      <input
        className="w-full h-8 px-2 border border-gray-300 rounded-md"
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

export default Registration;
