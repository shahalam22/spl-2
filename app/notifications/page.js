// THIS IS NOTIFICATION PAGE. PATH: app\notifications\page.js

'use client';
import Button from '@/components/button/Button';
import Header from '@/components/header/Header';
import HeaderAuth from '@/components/headerAuth/HeaderAuth';
import NotificationCard from '@/components/notificationCard/NotificationCard';
import SingleNotification from '@/components/singleNotification/SingleNotification'
import { fetchNotifications } from '@/redux/features/notificationSlice';
import { useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';


function Notifications() {
    const dispatch = useDispatch();
    const authenticated = useAppSelector((state) => !!state.auth.user);
    const { notifications, loading, error } = useAppSelector((state) => state.notifications);
    useEffect(() => {
      dispatch(fetchNotifications());
    }, [dispatch]);
  
    console.log(notifications);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
    <>
        { authenticated ? <HeaderAuth /> : <Header /> }
        <div className='flex flex-col gap-4 m-5 p-5 bg-gray-100 rounded-lg'>
            <p className='text-xl font-semibold'>Notification</p>
            {
                notifications.map(notification => (
                    <NotificationCard notification={notification} key={notification.notification_id} />
                ))
            }
        </div>
        <div className='bg-gray-200 w-[95%] h-[1px] m-auto my-10'></div>
        {

        }
    </>
  )
}

export default Notifications