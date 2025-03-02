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
  const { events, loading, error } = useAppSelector((state) => state.events)
  const authenticated = useAppSelector((state) => !!state.auth.user)
  const userId = useAppSelector((state) => state.auth.user?.user_id)
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
    dispatch(fetchAllEvents());
  }, [dispatch]);

  // console.log(events);

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
            <div className='mt-2 w-[100%] py-5 px-12'>
                <div className='flex justify-between'>
                    <input className='border w-[100%] border-gray-100 pl-2 rounded-md bg-gray-100 h-10' type="text" placeholder='Search the Resource'/>
                    <div className='w-12'>
                        <Button variant='black' size='block'><FaSearch className='m-auto' size={16}/></Button>
                    </div>
                </div>
                {/* <div className='flex gap-2 justify-between mt-2'>
                    <select className='border w-[100%] border-gray-100 pl-2 rounded-md bg-gray-100 h-10' name="category" id="category">
                        <option value="food">Food</option>
                        <option value="cloth">Cloth</option>
                        <option value="equipment">Equipment</option>
                        <option value="service">Service</option>
                        <option value="office_supply">Office Supply</option>
                        <option value="furniture">Furniture</option>
                        <option value="material">Material</option>
                    </select>
                    <select className='border w-[100%] border-gray-100 pl-2 rounded-md bg-gray-100 h-10' name="condition" id="condition">
                        <option value="new">New</option>
                        <option value="used">Used</option>
                        <option value="surplus">Surplus</option>
                        <option value="expired">Date Expired</option>
                    </select>
                </div> */}
            </div>
            <div className='w-[85%] h-[1px] bg-gray-300'/>
            <h1 ref={refToOtherEvents} className='text-2xl mt-5 font-semibold'>Events</h1>
            <div className="flex justify-center items-center">
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-[100%] p-5'>
                    {
                        events.filter(event => event.user_id !== userId).map((event) => (
                            <EventCard 
                              key={event.event_id} 
                              variant={'viewcard'} 
                              event={event}/>
                        ))
                    }
                </div>
            </div>
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
                          {/* {
                            events.filter((event)=>{
                              event.user_id === userId
                            }).length === 0 && <p>No events found</p>
                          } */}
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