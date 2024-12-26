import Button from '@/components/button/Button';
import SingleNotification from '@/components/singleNotification/SingleNotification'
import React from 'react'

const notifications = [
    {
        id: 1,
        title: "About Event",
        description: "A high-quality product in excellent condition.",
        createdat: {
            seconds: 1632398400
        }
    },
    {
        id: 2,
        title: "Meeting Reminder",
        description: "Don't forget the team meeting tomorrow at 10 AM.",
        createdat: {
            seconds: 1632484800
        }
    },
    {
        id: 3,
        title: "Sale Alert",
        description: "Flash sale starts now! Don't miss out.",
        createdat: {
            seconds: 1632571200
        }
    },
    {
        id: 4,
        title: "Maintenance Notice",
        description: "Scheduled maintenance will occur this Saturday.",
        createdat: {
            seconds: 1632657600
        }
    },
    {
        id: 5,
        title: "Welcome Message",
        description: "Welcome to our platform! Explore and enjoy.",
        createdat: {
            seconds: 1632744000
        }
    }
];

// console.log(notifications);


function Notifications() {
  return (
    <>
        <div className='flex flex-col gap-4 m-5 p-5 bg-gray-100 rounded-lg'>
            <p className='text-xl font-semibold'>Notification</p>
            {
                notifications.map(notification => (
                    <SingleNotification notification={notification} key={notification.id} />
                ))
            }

            <div className='w-40 m-auto mt-5'>
                <Button variant='black' size='block'>Load more</Button>
            </div>
        </div>
        <div className='bg-gray-200 w-[95%] h-[1px] m-auto my-10'></div>
    </>
  )
}

export default Notifications