// THIS IS SINGLE EVENT PAGE. PATH: app\events\[id]\page.js

'use client'

import BidDialogue from '@/components/bidDialogue/BidDialogue'
import Button from '@/components/button/Button'
import EventProduct from '@/components/eventProduct/EventProduct'
import EventUser from '@/components/eventUser/EventUser'
import Header from '@/components/header/Header'
import HeaderAuth from '@/components/headerAuth/HeaderAuth'
import { useAppSelector } from '@/redux/hooks'
import React from 'react'
import { FaPaperPlane } from 'react-icons/fa'



function Event() {

    const authenticated = useAppSelector((state) => !!state.auth.user)
    
    const [segment, setSegment] = React.useState('participants')

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



const participants = [
    {
        id: 1,
        name: 'Grant Marshall',
        email: 'grant_marshall@gmail.com',
        phone: '08023456789',
        role: 'Admin'
    },
    {
        id: 2,
        name: 'Alexa',
        email: 'alexa@gmail.com',
        phone: '08023456789',
        role: 'User'
    },
    {
        id: 3,
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        phone: '08023456789',
        role: 'User'
    },
    {
        id: 4,
        name: 'Jane Doe',
        email: 'johndoe@gmail.com',
        phone: '08023456789',
        role: 'User'
    },
    {
        id: 5,
        name: 'Jane Doe',
        email: 'johndoe@gmail.com',
        phone: '08023456789',
        role: 'User'
    },
    {
        id: 6,
        name: 'Jane Doe',
        email: 'johndoe@gmail.com',
        phone: '08023456789',
        role: 'User'
    },
    {
        id: 7,
        name: 'Jane Doe',
        email: 'johndoe@gmail.com',
        phone: '08023456789',
        role: 'User'
    },
    {
        id: 8,
        name: 'Jane Doe',
        email: 'johndoe@gmail.com',
        phone: '08023456789',
        role: 'User'
    },
    {
        id: 9,
        name: 'Jane Doe',
        email: 'johndoe@gmail.com',
        phone: '08023456789',
        role: 'User'
    },
    {
        id: 10,
        name: 'Jane Doe',
        email: 'johndoe@gmail.com',
        phone: '08023456789',
        role: 'User'
    }
]

function Participants() {
    return (
        <>
            <div className='flex flex-col gap-4 w-full'>
                <p className='text-xl font-semibold'>Participants</p>
                <div className='flex flex-col gap-4 h-screen overflow-y-auto py-2'>
                    {
                        participants.map(participant => (
                            <EventUser key={participant.id} user={participant}/>
                        ))
                    }
                </div>
            </div>
            {/* <div className='flex justify-center my-6 w-32 m-auto'>
                <Button variant='black' size='block'>Load More</Button>
            </div> */}

        </>
    )
}



const products = [
    {
        id: 1,
        title: 'Surplus sole',
        asking_price: 1000,
        current_bid: 2000,
    },
    {
        id:2,
        title: 'Second hand shoe',
        asking_price: 500,
        current_bid: 1000,
    },
    {
        id: 3,
        title: 'New shoe',
        asking_price: 2000,
        current_bid: 3000,
    },
    {
        id: 4,
        title: 'New shoe',
        asking_price: 2000,
        current_bid: 3000,
    },
    {
        id: 5,
        title: 'Used office shoe',
        asking_price: 500,
        current_bid: 1000,
    },
    {
        id: 6,
        title: 'New shoe',
        asking_price: 2000,
        current_bid: 3000,
    },
    {
        id: 7,
        title: 'New shoe',
        asking_price: 2000,
        current_bid: 3000,
    },
    {
        id: 8,
        title: 'Used office shoe',
        asking_price: 500,
        current_bid: 1000,
    },
    {
        id: 9,
        title: 'New shoe',
        asking_price: 2000,
        current_bid: 3000,
    },
    {
        id: 10,
        title: 'New shoe',
        asking_price: 2000,
        current_bid: 3000,
    }
]

function Products() {
    
    const [show, setShow] = React.useState(false)

    return (
        <>
            <div className='flex flex-col gap-4 w-full'>
                <p className='text-xl font-semibold'>Products</p>
                <div className='flex flex-col gap-4 h-screen overflow-y-auto py-2'>
                    {
                        products.map(product => (
                            <EventProduct key={product.id} onClickBid={() => setShow(true)} product={product}/>
                        ))
                    }
                </div>
            </div>
            {/* <div className='flex justify-center my-6 w-32 m-auto'>
                <Button variant='black' size='block'>Load More</Button>
            </div> */}
            {
                show && <div className='fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center' onClick={() => setShow(false)}>
                    <BidDialogue onClose={() => setShow(false)}/>
                </div>
            }
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