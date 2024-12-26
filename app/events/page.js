'use client'
import Button from '@/components/button/Button'
import EventCard from '@/components/eventCard/EventCard';
import EventForm from '@/components/eventForm/EventForm';
import React from 'react'
import {FaSearch} from 'react-icons/fa'

const events = [
    {
      id: 1,
      category: "office_supply",
      location: "Chicago",
      title: "Carpentry Service",
      description: "A high-quality product in excellent condition.",
      image: "grant1.jpg",
    },
    {
      id: 2,
      category: "material",
      location: "San Antonio",
      title: "Vintage Desk Chair",
      description: "A high-quality product in excellent condition.",
      image: "grant2.jpg",
    },
    {
      id: 3,
      category: "equipment",
      location: "San Antonio",
      title: "Running Shoes",
      description: "Affordable and ready for immediate use.",
      image: "grant3.jpg",
    },
    {
      id: 4,
      category: "cloth",
      location: "New York",
      title: "Construction Material",
      description: "Lightly used with minimal signs of wear.",
      image: "grant4.jpg",
    },
  ];

function Events() {

  const authenticated = true

  const [openForm, setOpenForm] = React.useState(false)

  const handleOpenForm = () => {
    setOpenForm(true)
  }

  const handleCloseForm = () => {
    setOpenForm(false)
  }

  return (
    <>
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
                        <Button variant='black' size='block'>Your Events</Button>
                      </div>
                      <div className='w-24'>
                      <Button variant='black' size='block'>Event Posts</Button>
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
            <div className="flex justify-center items-center">
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-[100%] p-5'>
                    {
                        events.map((event) => (
                            <EventCard key={event.id} variant={authenticated?'editcard':'viewcard'} eventid={event.id}/>
                        ))
                    }
                </div>
            </div>
            <div className='w-[85%] h-[1px] bg-gray-300'/>
        </div>
        {
          openForm && <EventForm onClose={handleCloseForm}/>
        }
    </>
  )
}

export default Events