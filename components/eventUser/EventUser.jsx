import React from 'react'
import Button from '../button/Button'
import {FaEnvelope, FaTrash} from 'react-icons/fa'


function EventUser({user, isOwner}) {
  return (
    <>
        <div className='flex justify-between py-4 px-6 rounded-2xl bg-white shadow-md'>
            <div className='flex items-center gap-4'>
                <img className='w-10 h-10 rounded-3xl' src="/grant1.jpg" alt="product" />
                <p className='font-semibold'>{user.username}</p>
            </div>
            <div className='flex gap-4'>
                <Button variant='black' size='block'>
                    <div className='px-2'>
                        <FaEnvelope size={20}/>
                    </div>
                </Button>
                {
                    isOwner && (
                        <Button variant='red' size='block'>
                            <div className='px-2'>
                                <FaTrash size={20}/>
                            </div>
                        </Button>
                    )
                }
            </div>
        </div>
    </>
  )
}

export default EventUser