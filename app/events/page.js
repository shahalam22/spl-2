// THIS IS EVENTS PAGE. PATH: app\events\page.js

'use client'
import Button from '@/components/button/Button'
import EventCard from '@/components/eventCard/EventCard';
import EventForm from '@/components/eventForm/EventForm';
import Header from '@/components/header/Header';
import HeaderAuth from '@/components/headerAuth/HeaderAuth';
import { fetchAllEvents } from '@/redux/features/eventSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect, useRef } from 'react'
import {FaSearch} from 'react-icons/fa'


function Events() {
  const dispatch = useAppDispatch();
  const { events, loading, error, participatedEvents } = useAppSelector((state) => state.events)

  // console.log(participatedEvents);
  

  const authenticated = useAppSelector((state) => !!state.auth.user)
  const userId = useAppSelector((state) => state.auth.user?.user_id) || 0;
  const [openForm, setOpenForm] = React.useState(false)

  const refToMyEvents = useRef(null);
  const refToOtherEvents = useRef(null);

  const scrollToMyEvents = () => {
    refToMyEvents.current.scrollIntoView({ behavior: 'smooth' });
  }
  const scrollToOtherEvents = () => {
    refToOtherEvents.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    dispatch(fetchAllEvents(userId));
  }, []);

  // console.log(events, participatedEvents);
  

  // console.log(participatedEvents);

  const handleOpenForm = () => {setOpenForm(true)}
  const handleCloseForm = () => {setOpenForm(false)}

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
        { authenticated ? <HeaderAuth /> : <Header /> }
        <div className='flex flex-col items-center mt-10 mb-24'>
            <div className='flex justify-between items-center w-[100%] px-12'>
              <h1 className='text-3xl font-semibold'>Events</h1>
              {
                authenticated && (
                    <div className='flex gap-2'>
                      <div className='w-24'>
                      <Button variant='black' size='block' onClick={() => handleOpenForm()}>Add Event</Button>
                      </div>
                      <div className='w-24'>
                        <Button variant='black' size='block' onClick={scrollToMyEvents}>Your Events</Button>
                      </div>
                      <div className='w-24'>
                      <Button variant='black' size='block' onClick={scrollToOtherEvents}>Event Posts</Button>
                      </div>
                    </div>
                )
              }
            </div>
            
            
            <div ref={refToOtherEvents} className="flex justify-center items-center">
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-[100%] p-5'>
                    {
                        events.filter(event => ((event.user_id !== userId) && ( !(participatedEvents ?? []).some(participated => participated.event_id === event.event_id)))).map((event) => (
                            <EventCard 
                              key={event.event_id} 
                              variant={'viewcard'} 
                              event={event}/>
                        ))
                    }
                </div>
            </div>
            

            {/* DASHBOARD E DEYA ACHE */}
            {
              authenticated && (
                <>
                  <div className='w-[85%] h-[1px] bg-gray-300'/>
                  <h1 ref={refToMyEvents} className='text-2xl mt-5 font-semibold'>My Events</h1>
                  <div className="flex justify-center items-center">
                      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-[100%] p-5'>
                          {
                            events.filter(event => event.user_id === userId).map((event) => (
                                <EventCard 
                                  key={event.event_id} 
                                  variant={'editcard'} 
                                  event={event}
                                />
                            ))
                          }
                      </div>
                  </div>
                </>
              )
            }
            <div className='w-[85%] h-[1px] bg-gray-300'/>
        </div>
        {
          openForm && <EventForm onClose={handleCloseForm}/>
        }
    </>
  )
}

export default Events