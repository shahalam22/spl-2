import React from 'react'
import './SingleNotificationPage.css'

function SingleNotification({onClose, notification}) {

    const time = new Date(notification.createdAt).toLocaleTimeString()

  return (
    <>
        <div className='fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center' onClick={onClose}>
          <div className='single-request-page bg-white rounded-lg' onClick={(e)=>e.stopPropagation()}>
            <div className='w-[100%] pb-8 flex flex-col items-center gap-2 pt-5'>
              <h1 className='text-xl font-semibold'>{notification.title}</h1>
              <p>{notification.content}</p>
              <br />
              <p className='text-sm'>Sent at: {time}</p>
            </div>
          </div>
        </div>
    </>
  )
}

export default SingleNotification