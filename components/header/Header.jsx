'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Button from '../button/Button'
import logo from '@/public/c4clogo_transparent.png'
import { useRouter } from 'next/navigation'

const navigationLinks = [
  { path: '/', label: 'Home' },
  { path: '/category', label: 'Category' },
  { path: '/resources', label: 'Resources' },
  { path: '/requests', label: 'Requests' },
  { path: '/events', label: 'Events' },
]

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="14" width="12.25" viewBox="0 0 448 512">
    <path fill='#ffffff' d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
  </svg>
)

function Header() {

  const router = useRouter();

  return (
    <>
      <header className='flex justify-between items-center p-4 md:p-8 mr-2 md:mr-5'>
        <Link href='/'>
          <Image 
            src={logo} 
            alt='Company logo' 
            className='max-w-40 cursor-pointer'
          />
        </Link>

        <nav className='hidden md:flex gap-4 lg:gap-16'>
          {navigationLinks.map(({ path, label }) => (
            <Link 
              key={path}
              href={path}
              className='hover:text-gray-500 transition-colors'
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className='flex items-center gap-2'>
          <Button 
            variant='cyan' 
            size='sm' 
            onClick={() => router.push('/login')}
            aria-label="Login"
          >
            <div className='flex items-center justify-center gap-2'>
              <UserIcon />
              <span>Login</span>
            </div>
          </Button>
          
          <Button 
            variant='black' 
            size='sm' 
            onClick={() => router.push('/register')}
            aria-label="Sign up"
          >
            Sign Up
          </Button>
        </div>
      </header>
    </>
  )
}

export default Header