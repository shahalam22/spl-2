import React from 'react'
import './SingleEventPage.css'
import Button from '../button/Button'
import Image from 'next/image'
import { FaLocationArrow, FaSearchLocation, FaShare } from 'react-icons/fa'
import { useAppSelector } from '@/redux/hooks'


function SingleEventPage({onClose, eventId, isEditCard}) {
  const event = useAppSelector((state) => state.events.events.find((event) => event.event_id === eventId));

  return (
    <div className='fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center' onClick={onClose}>
      <div className='flex flex-col gap-4 p-5 max-w-[750px] m-auto event-page rounded-xl' onClick={(e)=>e.stopPropagation()}>
        <img className='rounded-2xl max-h-[280px]' src={`/${event.image}`} alt="event_banner" />
        <div className='flex flex-col md:flex-row gap-5 items-center'>
            <div className='w-[100%] md:w-[50%]'>
                <div>
                    <h1 className='text-3xl font-semibold'>{event.title}</h1>
                    {/* <div className='flex gap-2 my-2'>
                        {
                            event.category.map((category, index) => (
                                <img className='w-8' key={index} src={`/${category}.jpg`} alt={category} />
                            ))
                        }
                    </div> */}
                </div>
                <div className='flex flex-col gap-2 mt-10'>
                    <p><span className='font-bold text-lg'>Description: </span>{event.description}</p>
                    <p><span className='font-bold text-lg'>Max Audience: </span>{event.max_participant}</p>
                </div>
            </div>
            <div className='w-[100%] md:w-[50%] mt-6 md:mt-0 flex flex-col gap-4 items-center'>
                <div className='flex flex-col items-center bg-gray-100 p-5 rounded-2xl w-[100%]'>
                    <p className='font-bold text-lg mb-2'>Event Schedule</p>
                    <p><span className='font-bold'>Date:</span> {new Date(event.date).toLocaleDateString()}</p>
                    <p><span className='font-bold'>Start Time:</span> {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {event.timezone}</p>
                    <p><span className='font-bold'>Duration:</span> {Math.round((new Date(event.endTime) - new Date(event.startTime)) / (1000 * 60))} minutes</p>
                </div>
                <div className='flex flex-col items-center bg-yellow-100 p-5 rounded-2xl w-[100%]'>
                  <p className='font-bold text-lg'>Location </p>
                  <p>{event.location.street+", "+event.location.city}</p>  
                  <p>{event.location.state+", "+event.location.country}</p>  
                </div>
                {
                  !isEditCard && (
                    <div className='flex w-[100%] gap-1'>
                        <div className='w-[50%]'>
                          <Button variant='black' size='block'>Register</Button>
                        </div>
                        <div className='w-[50%] flex gap-1 justify-between'>
                          <Button variant='cyan' size='block'>
                            <div className='flex items-center justify-center gap-1'>
                              <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 512 512"><path fill="#ffffff" d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"/></svg>
                              Message
                            </div>
                          </Button>
                          <Button variant='red' size='block'>
                            <div className='flex items-center justify-center gap-3'>
                              <FaShare />
                              Share
                            </div>
                          </Button>
                        </div>
                    </div>
                  )
                }
            </div>
        </div>
      </div>
    </div>
  )
}

export default SingleEventPage