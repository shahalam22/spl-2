'use client'
import Image from 'next/image'
import logo from '@/public/c4clogo_transparent.png'
import React from 'react'
import Link from 'next/link'
import Button from '../button/Button'
import RegistrationPage from '../RegistrationPage/RegistrationPage'
import LoginPage from '../loginPage/LoginPage'

function Header() {

    const [registerPage, setRegisterPage] = React.useState(false)
    const [loginPage, setLoginPage] = React.useState(false)

    const showRegisterPage = () => {
        setRegisterPage(true)
    }

    const showLoginPage = () => {
        setLoginPage(true)
    }

    const closeRegisterPage = () => {
        setRegisterPage(false)
    }

    const closeLoginPage = () => {
        setLoginPage(false)
    }

  return (
    <>
        <div className='flex justify-between items-center p-4 md:p-8 mr-2 md:mr-5'>
            <Link href={'/'} className='cursor-pointer'>
                <Image onClick={'/'} src={logo} alt='logo' className='max-w-40'/>
            </Link>
            <div className='hidden gap-4 md:flex md:gap-4 lg:gap-16 md:justify-center'>
                <Link href={'/'} className='hover:text-gray-500'>Home</Link>
                <Link href={'/category'} className='hover:text-gray-500'>Category</Link>
                <Link href={'/resources'} className='hover:text-gray-500'>Resources</Link>
                <Link href={'/requests'} className='hover:text-gray-500'>Requests</Link>
                <Link href={'/events'} className='hover:text-gray-500'>Events</Link>
            </div>
            <div className='flex items-center gap-2'>
                <Button variant='cyan' size='sm' onClick={showLoginPage}>
                    <div className='flex items-center justify-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="14" width="12.25" viewBox="0 0 448 512"><path fill='#ffffff' d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
                        <p>Login</p>
                    </div>
                </Button>
                <Button variant='black' size='sm' onClick={showRegisterPage}>Sign In</Button>
            </div>
        </div>
        {
            registerPage && <RegistrationPage onClose={closeRegisterPage}/>
        }
        {
            loginPage && <LoginPage onClose={closeLoginPage}/>
        }
    </>
  )
}

export default Header