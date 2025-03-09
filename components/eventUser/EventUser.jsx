import React from 'react'
import Button from '../button/Button'
import {FaEnvelope, FaTrash} from 'react-icons/fa'
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';


function EventUser({user, isOwner, userId}) {
    const currentUser = useAppSelector((state) => state.auth.user);
    const router = useRouter();
    const handleMessageClick = () => {
      router.push(`/messages?currentUserId=${currentUser.user_id}&anotherUserId=${userId}`);
    }
  
    return (
    <>
        <div className='flex justify-between py-4 px-6 rounded-2xl bg-white shadow-md'>
            <div className='flex items-center gap-4'>
                <img className='w-10 h-10 rounded-3xl' src="/grant1.jpg" alt="product" />
                <p className='font-semibold'>{user.username}</p>
            </div>
            <div className='flex gap-4'>
                {
                    userId !== currentUser.user_id && (
                        <div onClick={handleMessageClick}>
                            <Button variant='black' size='block'>
                                <div className='px-2'>
                                    <FaEnvelope size={20}/>
                                </div>
                            </Button>
                        </div>
                    )
                }
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