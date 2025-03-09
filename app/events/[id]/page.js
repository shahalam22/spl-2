// THIS IS SINGLE EVENT PAGE. PATH: app\events\[id]\page.js

'use client'

import BidDialogue from '@/components/bidDialogue/BidDialogue'
import Button from '@/components/button/Button'
import EventProduct from '@/components/eventProduct/EventProduct'
import EventUser from '@/components/eventUser/EventUser'
import Header from '@/components/header/Header'
import HeaderAuth from '@/components/headerAuth/HeaderAuth'
import ResourceForm from '@/components/resourceForm/ResourceForm'
import { fetchAllOfCurrentEvent } from '@/redux/features/eventSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { FaPaperPlane } from 'react-icons/fa'



function Event() {
    const params = useParams()
    const dispatch = useAppDispatch()
    const authenticated = useAppSelector((state) => !!state.auth.user)
    const [segment, setSegment] = React.useState('participants')

    useEffect(() => {
        dispatch(fetchAllOfCurrentEvent(params.id))
    }, [dispatch])

    return (
    <>
        {authenticated ? <HeaderAuth /> : <Header />}
        <div className='flex'>
            <div className='flex flex-col gap-6 bg-black text-white w-[200px] items-center justify-center h-screen'>
                <p className='hover:bg-gray-900 w-full text-center p-2 hover:font-semibold' onClick={() => setSegment("participants")}>Participants</p>
                <p className='hover:bg-gray-900 w-full text-center p-2 hover:font-semibold' onClick={() => {
                    setSegment("products")
                }}>Products</p>
                <p className='hover:bg-gray-900 w-full text-center p-2 hover:font-semibold' onClick={() => setSegment("live_chat")}>Live Chat</p>
            </div>
            <div className='flex flex-col gap-4 w-full px-8 py-4 bg-gray-100'>
                {
                    segment === "participants" ? <Participants /> : segment === "products" ? <Products /> : <LiveChat />
                }
            </div>
        </div>
    </>
  )
}



function Participants() {
    const params = useParams();
    const dispatch = useAppDispatch();

    const { currentEvent ,currentEventParticipants } = useAppSelector((state) => state.events);
    const userId = useAppSelector((state) => state.auth.user?.user_id)

    useEffect(() => {
        dispatch(fetchAllOfCurrentEvent(params.id));
    }, []);
    
    return (
        <>
            <div className='flex flex-col gap-4 w-full'>
                <p className='text-xl font-semibold'>Participants</p>
                <div className='flex flex-col gap-4 h-screen overflow-y-auto py-2'>
                    {
                        currentEventParticipants && (
                            currentEventParticipants.map(participant => (
                                <EventUser key={participant.user_id} user={participant} isOwner={currentEvent.user_id === userId? true : false} userId = {participant.user_id}/>
                            ))
                        )
                    }
                </div>
            </div>
            {/* <div className='flex justify-center my-6 w-32 m-auto'>
                <Button variant='black' size='block'>Load More</Button>
            </div> */}

        </>
    )
}




function Products() {
    const params = useParams();
    const dispatch = useAppDispatch();

    const { currentEvent, currentEventProducts } = useAppSelector((state) => state.events);
    const userId = useAppSelector((state) => state.auth.user?.user_id)

    useEffect(() => {
        dispatch(fetchAllOfCurrentEvent(params.id));
    }, [dispatch]);

    const triggerEventDispatch = () => {
        dispatch(fetchAllOfCurrentEvent(params.id));
    }

    const [showResourceForm, setShowResourceForm] = React.useState(false)
    const openResourceForm = () => {
        setShowResourceForm(true);
        triggerEventDispatch();
    }
    const closeResourceForm = () => {
        setShowResourceForm(false);
        triggerEventDispatch();
    }

    return (
        <>
            <div className='flex flex-col gap-4 w-full'>
                <div className='flex justify-between items-center'>
                    <p className='text-xl font-semibold'>Products</p>
                    <div className='w-40'>
                        <Button variant="black" size="block" onClick={openResourceForm}>Add New Resource</Button>
                    </div>
                </div>
                <div className='flex flex-col gap-4 py-2'>
                    <p>Resources</p>
                    {
                        currentEventProducts && (
                            currentEventProducts.filter((product) => !userId || product.user_id != userId).map(product => (
                                <EventProduct key={product.post_id} product={product} variant="viewcard"/>
                            ))
                        )
                    }
                </div>
                <div className='flex flex-col gap-4 py-2'>
                    <p>My Resources</p>
                    {
                        currentEventProducts && (
                            currentEventProducts.filter((product) => product.user_id === userId).map(product => (
                                <EventProduct key={product.post_id} product={product} variant="editcard"/>
                            ))
                        )
                    }
                </div>
            </div>
            {/* <div className='flex justify-center my-6 w-32 m-auto'>
                <Button variant='black' size='block'>Load More</Button>
            </div> */}
            {showResourceForm && <ResourceForm onClose={closeResourceForm} eventId={currentEvent.event_id}/>}
        </>
    )
}



const live_chat = [
    {
        id: 1,
        sender: 'Grant Marshall',
        message: 'Hello, I am interested in this product',
        createdAt: 1000000000,
    },
    {
        id: 2,
        sender: 'Alexa',
        message: 'Hello, I am interested in this product',
        createdAt: 1000000005,
    },
    {
        id: 3,
        sender: 'John Doe',
        message: 'Hello, I am interested in this product',
        createdAt: 1000000011,
    },
    {
        id: 4,
        sender: 'Jane Doe',
        message: 'Hello, I am interested in this product',
        createdAt: 1000000021,
    },
    {
        id: 5,
        sender: 'Grant Marshall',
        message: 'Hello, I am interested in this product',
        createdAt: 1000000031,
    },
    {
        id: 6,
        sender: 'Grant Marshall',
        message: 'Hello, I am interested in this product',
        createdAt: 1000000000,
    },
    {
        id: 7,
        sender: 'Alexa',
        message: 'Hello, I am interested in this product',
        createdAt: 1000000005,
    },
    {
        id: 8,
        sender: 'John Doe',
        message: 'Hello, I am interested in this product',
        createdAt: 1000000011,
    },
    {
        id: 9,
        sender: 'Jane Doe',
        message: 'Hello, I am interested in this product',
        createdAt: 1000000021,
    },
    {
        id: 10,
        sender: 'Grant Marshall',
        message: 'Hello, I am interested in this product',
        createdAt: 1000000031,
    }
]

function LiveChat() {
    const user ='Grant Marshall'

    return (
        <>
            <div className='flex flex-col gap-4 w-full'>
                <p className='text-xl font-semibold'>Live Chat</p>
                <div className='h-screen flex flex-col gap-5 pt-10 pb-6 px-8 bg-white p-4 rounded-2xl'>
                    <div className='h-screen overflow-y-auto flex flex-col gap-5 pt-10 pb-6 px-8 '>
                        {
                            live_chat.map(message => (
                                <div className={message.sender === user ? 'flex flex-row-reverse gap-4 items-center':'flex gap-4 items-center'}>
                                    <div className='w-8 h-8 rounded-full bg-gray-300'></div>
                                    <div className={message.sender === user ? 'flex flex-col items-end':'flex flex-col items-start'}>
                                        <p className='text-sm text-gray-500'>{message.sender}</p>
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='flex gap-2 items-center mt-4'>
                        <input type="text" placeholder='Type a message' className='w-full p-3 border-none bg-gray-100 rounded-lg'/>
                        <div className='w-9'><Button variant='black' size='block'><FaPaperPlane className='m-auto'/></Button></div>    
                    </div>
                </div>
            </div>
        </>
    )
}

export default Event