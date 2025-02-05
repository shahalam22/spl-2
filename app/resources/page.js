// THIS IS RESOURCES PAGE. PATH: app\resources\page.js


'use client'
import Button from '@/components/button/Button'
import ResourceCard from '@/components/resourceCard/ResourceCard'
import ResourceForm from '@/components/resourceForm/ResourceForm'
import React from 'react'
import {FaSearch} from 'react-icons/fa'

const resources = [
    {
      id: 1,
      category: "Office Supply",
      condition: "used",
      exchangeOption: "free",
      location: "Chicago",
      title: "Carpentry Service",
      description: "A high-quality product in excellent condition.",
      price: 338,
      image: "grant1.jpg",
    },
    {
      id: 2,
      category: "office_supply",
      condition: "used",
      exchangeOption: "free",
      location: "Chicago",
      title: "Carpentry Service",
      description: "A high-quality product in excellent condition.",
      price: 338,
      image: "grant2.jpg",
    },
    {
      id: 3,
      category: "office_supply",
      condition: "used",
      exchangeOption: "free",
      location: "Chicago",
      title: "Carpentry Service",
      description: "A high-quality product in excellent condition.",
      price: 338,
      image: "grant3.jpg",
    },
    {
      id: 4,
      category: "office_supply",
      condition: "used",
      exchangeOption: "free",
      location: "Chicago",
      title: "Carpentry Service",
      description: "A high-quality product in excellent condition.",
      price: 338,
      image: "grant4.jpg",
    },
    {
      id: 5,
      category: "office_supply",
      condition: "used",
      exchangeOption: "free",
      location: "Chicago",
      title: "Carpentry Service",
      description: "A high-quality product in excellent condition.",
      price: 338,
      image: "grant5.jpg",
    },
    {
      id: 6,
      category: "office_supply",
      condition: "used",
      exchangeOption: "free",
      location: "Chicago",
      title: "Carpentry Service",
      description: "A high-quality product in excellent condition.",
      price: 338,
      image: "grant6.jpg",
    },
]

function Resources() {

  const authenticated = true

  const [showForm, setShowForm] = React.useState(false)

  const openForm = () => {
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
  }

  return (
    <>
        <div className='flex flex-col items-center mt-10 mb-24'>
            <div className='flex justify-between items-center w-[100%] px-12'>
              <h1 className='text-3xl font-semibold'>Resources</h1>
              {
                authenticated && (
                    <div className='flex gap-2'>
                      <div className='w-28'>
                        <Button variant='black' size='block' onClick={openForm}>Add Resource</Button>
                      </div>
                      <div className='w-30'>
                        <Button variant='black' size='block'>Your Resources</Button>
                      </div>
                      <div className='w-30'>
                        <Button variant='black' size='block'>Resource Posts</Button>
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
                        resources.map((resource) => (
                            <ResourceCard key={resource.id} category={resource.category} condition={resource.condition} description={resource.description} exchangeOption={resource.exchangeOption} image={resource.image} location={resource.location} price={resource.price} title={resource.title} variant={authenticated?`editcard`:`viewcard`}/>
                        ))
                    }
                </div>
            </div>
            <div className='w-[85%] h-[1px] bg-gray-300'/>
        </div>
        {
          showForm && <ResourceForm onClose={closeForm}/>
        }
    </>
  )
}

export default Resources