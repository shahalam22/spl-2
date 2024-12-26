import React from 'react'
import Button from '../button/Button'
import { FaTrash } from 'react-icons/fa'

const notification = {
    id: 1,
    title: "About Event",
    description: "A high-quality product in excellent condition.",
    createdat: {
        seconds: 1632398400
    }
}

function SingleNotification({notification}) {

    const time = new Date(notification.createdat.seconds * 1000).toLocaleTimeString()

  return (
    <>
        <div className='flex justify-between py-4 px-6 rounded-2xl bg-white shadow-md'>
            <div className='flex items-center gap-4'>
                <img className='w-10 h-10 rounded-3xl' src="/grant1.jpg" alt="product" />
                <div className='flex flex-col gap-1 items-start justify-center'>
                    <p className='font-semibold'>{notification.title}</p>
                    <p className='text-sm'>{(notification.description.length > 40) ? (notification.description.substring(0,41) + "...") : notification.description}</p>
                </div>
            </div>
            <div className='flex gap-4 items-center'>
                <p>{time}</p>
                <div className='m-auto'>
                    <Button variant='red' size='block'>
                            <FaTrash size={20}/>
                    </Button>
                </div>
            </div>
        </div>
    </>
  )
}

export default SingleNotification