import React from 'react'

const conversation = {
    id: 1,
    sender: 'Grant Marshall',
    receiver: 'Alexa',
    lastMessage: {
        id: 1,
        message: 'Hello, how are you doing?',
        createdAt: '2021-09-01T12:00:00'
    }
}

function SingleConversation({conversation}) {

    const time = new Date(conversation.lastMessage.createdAt)

  return (
    <>
        <div className='flex justify-between py-4 px-6 rounded-2xl bg-white shadow-md'>
            <div className='flex items-center gap-4'>
                <img className='w-10 h-10 rounded-3xl' src="/grant1.jpg" alt="product" />
                <div className='flex flex-col gap-1 items-start justify-center'>
                    <p className='font-semibold'>{conversation.sender}</p>
                    <p className='text-sm'>{(conversation.lastMessage.message.length > 40) ? (conversation.lastMessage.message.substring(0,41) + "...") : conversation.lastMessage.message}</p>
                </div>
            </div>
            <div className='flex gap-4 items-center'>
                <p>{time.getMinutes()} min ago</p>
            </div>
        </div>
    </>
  )
}

export default SingleConversation