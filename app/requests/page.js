'use client'
import Button from '@/components/button/Button'
import RequestCard from '@/components/requestCard/RequestCard'
import RequestForm from '@/components/requestForm/RequestForm'
import React from 'react'
import {FaSearch} from 'react-icons/fa'

const requests = [
    {
      id: 1,
      category: "office_supply",
      condition: "used",
      exchangeOption: "free",
      location: "Chicago",
      title: "Carpentry Service",
      description: "A high-quality product in excellent condition.",
    },
    {
      id: 2,
      category: "office_supply",
      condition: "used",
      exchangeOption: "free",
      location: "Chicago",
      title: "Carpentry Service",
      description: "A high-quality product in excellent condition.",
    },
    {
      id: 3,
      category: "office_supply",
      condition: "used",
      exchangeOption: "free",
      location: "Chicago",
      title: "Carpentry Service",
      description: "A high-quality product in excellent condition.",
    },
    {
      id: 4,
      category: "office_supply",
      condition: "used",
      exchangeOption: "free",
      location: "Chicago",
      title: "Carpentry Service",
      description: "A high-quality product in excellent condition.",
    },
    {
      id: 5,
      category: "office_supply",
      condition: "used",
      exchangeOption: "free",
      location: "Chicago",
      title: "Carpentry Service",
      description: "A high-quality product in excellent condition.",
    },
    {
      id: 6,
      category: "office_supply",
      condition: "used",
      exchangeOption: "free",
      location: "Chicago",
      title: "Carpentry Service",
      description: "A high-quality product in excellent condition.",
    },
]

function Requests() {

    const authenticated = true

    const [openForm, setOpenForm] = React.useState(false)

    const openRequestForm = () => {
        setOpenForm(true)
    }

    const closeRequestForm = () => {
        setOpenForm(false)
    }

  return (
    <>
        <div className='flex flex-col items-center mt-10 mb-24'>
            <div className='flex justify-between items-center w-[100%] px-12'>
              <h1 className='text-3xl font-semibold'>Requests</h1>
              {
                authenticated && (
                    <div className='flex gap-2'>
                      <div className='w-28'>
                        <Button variant='black' size='block' onClick={openRequestForm}>Add Request</Button>
                      </div>
                      <div className='w-28'>
                        <Button variant='black' size='block'>Your Requests</Button>
                      </div>
                      <div className='w-28'>
                        <Button variant='black' size='block'>Request Posts</Button>
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
                <div className='flex gap-2 justify-between mt-2'>
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
                </div>
            </div>
            <div className='w-[85%] h-[1px] bg-gray-300'/>
            <div className="flex justify-center items-center">
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-[100%] p-5'>
                    {
                        requests.map((request) => (
                            <RequestCard key={request.id} category={request.category} condition={request.condition} description={request.description} exchangeOption={request.exchangeOption} location={request.location} title={request.title} variant={authenticated?'editcard':'viewcard'}/>
                        ))
                    }
                </div>
            </div>
            <div className='w-[85%] h-[1px] bg-gray-300'/>
        </div>
        {
          openForm && <RequestForm onClose={closeRequestForm}/>
        }
    </>
  )
}

export default Requests