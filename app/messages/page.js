import React from 'react'
import SingleConversation from '@/components/singleConversation/SingleConversation'
import Button from '@/components/button/Button'
import {FaPaperPlane} from 'react-icons/fa'

const conversations = [
    {
        id: 1,
        sender: 'Grant Marshall',
        receiver: 'Alexa',
        lastMessage: {
            id: 1,
            message: 'Hello, how are you doing?',
            createdAt: '2021-09-01T12:00:00'
        }
    },
    {
        id: 2,
        sender: 'Grant Marshall',
        receiver: 'Alexa',
        lastMessage: {
            id: 1,
            message: 'Hello, how are you doing?',
            createdAt: '2021-09-01T12:00:00'
        }
    },
    {
        id: 3,
        sender: 'Grant Marshall',
        receiver: 'Alexa',
        lastMessage: {
            id: 1,
            message: 'Hello, how are you doing?',
            createdAt: '2021-09-01T12:00:00'
        }
    },
    {
        id: 4,
        sender: 'Grant Marshall',
        receiver: 'Alexa',
        lastMessage: {
            id: 1,
            message: 'Hello, how are you doing?',
            createdAt: '2021-09-01T12:00:00'
        }
    }
]

const messages = [
    {
        id: 1,
        sender: 'Grant Marshall',
        receiver: 'Alexa',
        message: 'Hello, how are you doing?',
        createdAt: '2021-09-01T12:00:00'
    },
    {
        id: 2,
        sender: 'Alexa',
        receiver: 'Grant Marshall',
        message: 'I am fine. What about you?',
        createdAt: '2021-09-01T12:00:01'
    },
    {
        id: 3,
        sender: 'Grant Marshall',
        receiver: 'Alexa',
        message: 'I am also fine. What are you doing?',
        createdAt: '2021-09-01T12:00:02'
    },
    {
        id: 4,
        sender: 'Alexa',
        receiver: 'Grant Marshall',
        message: 'I am working on a project. What about you?',
        createdAt: '2021-09-01T12:00:03'
    },
    {
        id: 5,
        sender: 'Grant Marshall',
        receiver: 'Alexa',
        message: 'I am also working on a project.',
        createdAt: '2021-09-01T12:00:04'
    },
    {
        id: 6,
        sender: 'Alexa',
        receiver: 'Grant Marshall',
        message: 'That is great. What is the project about?',
        createdAt: '2021-09-01T12:00:05'
    },
    {
        id: 7,
        sender: 'Grant Marshall',
        receiver: 'Alexa',
        message: 'It is about a social media platform.',
        createdAt: '2021-09-01T12:00:06'
    },
    {
        id: 8,
        sender: 'Alexa',
        receiver: 'Grant Marshall',
        message: 'That is awesome. I would love to know more about it.',
        createdAt: '2021-09-01T12:00:07'
    },
    {
        id: 9,
        sender: 'Grant Marshall',
        receiver: 'Alexa',
        message: 'Sure. I will tell you more about it.',
        createdAt: '2021-09-01T12:00:08'
    },
    {
        id: 10,
        sender: 'Alexa',
        receiver: 'Grant Marshall',
        message: 'Thank you.',
        createdAt: '2021-09-01T12:00:09'
    },
    {
        id: 11,
        sender: 'Grant Marshall',
        receiver: 'Alexa',
        message: 'You are welcome.',
        createdAt: '2021-09-01T12:00:10'
    }
]

function Messages() {

    const user = 'Grant Marshall'

  return (
    <>
        <div className='flex gap-2 flex-col md:flex-row'>
            <div className='w-auto md:w-[50%] flex flex-col gap-4 m-5 p-5 bg-gray-100 rounded-lg'>
                <p className='text-xl font-semibold'>Conversations</p>
                {
                    conversations.map(conversation => (
                        <SingleConversation conversation={conversation} key={conversation.id}/>
                    ))
                }

                <div className='w-40 m-auto mt-5'>
                    <Button variant='black' size='block'>Load more</Button>
                </div>
            </div>
            <div className='w-auto md:w-[50%] flex flex-col gap-4 m-5 p-5 bg-gray-100 rounded-lg'>
                <p className='text-xl font-semibold'>Chat</p>
                <div className='bg-white p-5 rounded-lg'>
                    {
                        messages.map(message => (
                            <div className={message.sender==user? 'flex gap-4 flex-row-reverse my-5 items-center': 'flex gap-4 items-center my-5'} key={message.id}>
                                <img className='w-8 h-8 rounded-full' src="/grant1.jpg" alt="userImage" />
                                <p className='bg-gray-100 px-5 py-2 rounded-full'>{message.message}</p>
                            </div>
                        ))
                    }
                    <div className='flex gap-2 items-center'>
                        <input type="text" placeholder='Type a message' className='w-full p-3 border-none bg-gray-100 rounded-lg'/>
                        <div className='w-9'><Button variant='black' size='block'><FaPaperPlane className='m-auto'/></Button></div>    
                    </div>
                </div>
            </div>
        </div>
        <div className='bg-gray-200 w-[95%] h-[1px] m-auto my-10'></div>
    </>
  )
}

export default Messages