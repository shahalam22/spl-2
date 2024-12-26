import Image from 'next/image'
import logo from '@/public/c4clogo_black_transparent.png'
import React from 'react'
import Link from 'next/link'
import Button from '../button/Button'

function HeaderAuth() {
  return (
    <>
        <div className='flex justify-between items-center p-4 md:p-8 bg-black text-white'>
            <Link href={'/'} className='cursor-pointer'>
                <Image src={logo} alt='logo' className='max-w-44'/>
            </Link>
            <div className='hidden gap-4 md:flex md:gap-4 lg:gap-16 md:justify-center'>
                <Link href={'/'} className='hover:text-gray-200'>Dashboard</Link>
                <Link href={'/resources'} className='hover:text-gray-200'>Resources</Link>
                <Link href={'/requests'} className='hover:text-gray-200'>Requests</Link>
                <Link href={'/events'} className='hover:text-gray-200'>Events</Link>
            </div>
            <div className='flex items-center gap-3 md:gap-8 px-4 md:px-8'>
                <Link href={'/notifications'} className='cursor-pointer'>
                    <button className="group">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512" className="fill-white group-hover:fill-gray-200 transition-colors"><path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9l.3-.5z"/></svg>
                    </button>
                </Link>
                <Link href={'/messages'} className='cursor-pointer'>
                    <button className="group">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512" className="fill-white group-hover:fill-gray-200 transition-colors"><path d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z"/></svg>
                    </button>
                </Link>
                <button>
                    <div className='bg-white h-10 w-10 rounded-full'>
                    </div>
                </button>
                <button className="group">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512" className="fill-white group-hover:fill-gray-200 transition-colors"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></svg>
                </button>
            </div>
        </div>
    </>
  )
}

export default HeaderAuth