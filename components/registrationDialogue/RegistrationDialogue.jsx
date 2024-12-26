import React from 'react'
import './RegistrationDialogue.css'
import Button from '../button/Button'

function RegistrationDialogue() {
  return (
    <>
        <div className='dialogue p-6 flex flex-col gap-2 items-center max-w-72 rounded-lg'>
            <h1 className='font-bold text-lg'>Registration for the event</h1>
            <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="name" className='text-sm'>Name</label>
                <input className='border border-gray-200 rounded-md px-2' type="text" id="name" name="name" placeholder='Write here...'/>
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="email" className='text-sm'>Email</label>
                <input className='border border-gray-200 rounded-md px-2' type="email" id="email" name="email" placeholder='Write email here...'/>
            </div>
            <div className='flex gap-2 w-full mt-2'>
                <Button variant='black' size='block'>Register</Button>
                <Button variant='red' size='block'>Cancel</Button>
            </div>
        </div>
    </>
  )
}

export default RegistrationDialogue