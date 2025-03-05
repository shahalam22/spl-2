import React from 'react'
import Button from '../button/Button'
import { FaTrash } from 'react-icons/fa'
import SingleNotification from '../singleNotification/SingleNotification'
import { useDispatch } from 'react-redux'
import { deleteNotification, updateMarkAsRead } from '@/redux/features/notificationSlice'

function NotificationCard({notification}) {
    const dispatch = useDispatch()

    const time = new Date(notification.createdAt).toLocaleTimeString()

    const [viewNotification, setViewNotification] = React.useState(false)
    // const toggleViewNotification = () => { setViewNotification(!viewNotification)}
    const showViewNotification = () => { 
        setViewNotification(true)
        dispatch(updateMarkAsRead(notification.notification_id));
    }

    const closeViewNotification = () => { setViewNotification(false) }

    const handleDelete = () => {
        console.log(notification.notification_id);
        
        try{
            dispatch(deleteNotification(notification.notification_id))
        }catch(error){
            console.error('Failed to delete notification:', error)
        }
    }

    // Read and Unread Notification er color ki hobe oita define kore deya lagbe
    // const classNameBasedOnRead = notification.isRead?'bg-white':'bg-gray-200'

  return (
    <>
        <div className={'flex justify-between py-4 px-6 rounded-2xl shadow-md bg-white'} onClick={showViewNotification}>
            <div className='flex items-center gap-4'>
                <img className='w-10 h-10 rounded-3xl' src="/grant1.jpg" alt="product" />
                <div className='flex flex-col gap-1 items-start justify-center'>
                    <p className='font-semibold'>{notification.title}</p>
                    <p className='text-sm'>{(notification.content.length > 40) ? (notification.content.substring(0,41) + "...") : notification.content}</p>
                </div>
            </div>
            <div className='flex gap-4 items-center'>
                <p>{time}</p>
                <div className='m-auto'>
                    <Button variant='red' size='block' onClick={handleDelete}>
                            <FaTrash size={20}/>
                    </Button>
                </div>
            </div>
        </div>
        {
            viewNotification && <SingleNotification onClose={closeViewNotification} notification={notification} />
        }
    </>
  )
}

export default NotificationCard