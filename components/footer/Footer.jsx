import Image from 'next/image'
import logo from '@/public/c4clogo_transparent.png'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPaperPlane } from 'react-icons/fa'
import React from 'react'
import Button from '../button/Button'
import './Footer.css'
import Link from 'next/link'

function Footer() {
  return (
    <>
        <div className='footer'>
            <div className='footer-content'>
                <div className='footer-logo'>
                    <Image src={logo} alt='logo' className='max-w-52'/>
                    <p className='text-xs'>Social Handles</p>
                    <div className='socialmedia-links'>
                        <FaFacebook  size={25}/>
                        <FaInstagram  size={25}/>
                        <FaTwitter  size={25}/>
                        <FaYoutube  size={25}/>
                    </div>
                </div>
                <div className='vertical-line'></div>
                <div className='footer-links'>
                    <p>Links</p>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/'}>Categories</Link>
                    <Link href={'/'}>Resources</Link>
                    <Link href={'/'}>Requests</Link>
                    <Link href={'/'}>Events</Link>
                </div>
            </div>
            <div className='footer-contact'>
                <div className='feedback-title'>
                    <FaPaperPlane />
                    <p>Send Feedback</p>
                </div>
                <div className='feedback-form'>
                    <input className='w-[90%] m-auto border border-cyan' type="text" name="feedback"/>
                    <Button variant='cyan' size='block'>Submit</Button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Footer