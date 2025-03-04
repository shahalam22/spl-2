import React from 'react'
import './SingleResourcePage.css'
import Button from '../button/Button'
import Image from 'next/image'
import { FaLocationArrow, FaSearchLocation, FaShare } from 'react-icons/fa'
import { useAppSelector } from '@/redux/hooks'


function SingleResourcePage({onClose, resource, isEditCard}) {
  // const resource = useAppSelector((state) => state.posts.posts.find((post) => post.post_id === resourceId));

  return (
    <div className='fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center' onClick={onClose}>
      <div className='single-resource-page rounded-lg' onClick={(e)=>e.stopPropagation()}>
        <div className='single-resource-page-left'>
          <div className='single-resource-page-left-image'>
            {
              resource && (
                <>
                  <img className='rounded-md' src={`/${resource.images[0]}`} alt='image'/>
                  <div className='flex justify-between'>
                    {resource.images.map((image, index) => {
                      return (
                        <img className='w-[30%] rounded-md' key={index} src={`/${image}`} alt='image'/>
                      )
                    })}
                  </div>
                </>
              )
            }
          </div>
          <div className='single-resource-page-left-loc-price'>
            <div className='single-resource-page-left-price flex items-baseline gap-2'>
              <p className='font-normal'>Price:</p>
              <p className='text-2xl font-bold'>${resource.price}</p>
            </div>
            <div className='single-resource-page-left-quantity flex items-baseline gap-2 mb-5'>
              <p className='font-normal'>Quantity:</p>
              <p className='text-2xl font-bold'>{resource.quantity}</p>
            </div>
            <div className='single-resource-page-left-location bg-[#FFBF61] py-2 px-4 rounded-lg flex items-center gap-2 w-fit'>
              <svg className='card-view-footer-icon' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
              <p className='text-sm'>{resource.location.street+", "+resource.location.state+", "+resource.location.city+", "+resource.location.country}</p>
            </div>
            
          </div>
          {
            !isEditCard && (
              <div className='single-resource-page-left-buttons'>
                <div className='w-[50%]'>
                  <Button variant='black' size='block'>Request this resource</Button>
                </div>
                <div className='w-[50%] flex gap-1'>
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
        <div className='single-resource-page-right w-[50%] flex flex-col gap-2 pt-5'>
          <h1 className='font-bold text-2xl'>{resource.title}</h1>
          <div className='single-resource-page-right-tags flex gap-2 justify-start'>
            <img className='max-w-[80px] max-h-6 rounded-xl' src={`/${resource.category_id}_text.jpg`} alt="cat_image" />
            <img className='max-h-6 rounded-lg' src={`/${resource.condition}.jpg`} alt="condition_image" />
          </div>
          <div className='text-normal mt-4 flex flex-col'>
            <p className='font-bold'>Description:</p>
            <p className='text-sm'>{resource.description}</p>
          </div>
          <div className='text-normal flex flex-col'>
            <p className='font-bold'>Pickup Availability</p>
            <p className='text-sm'><span className='font-bold'>Date: </span>{resource.pickup.date}</p>
            <p className='text-sm'><span className='font-bold'>Time: </span>{resource.pickup.time}</p>
          </div>
          <div className='text-normal flex flex-col'>
            <p className='font-bold'>Delivery Option</p>
            <p className='text-sm'>{resource.delivery}</p>
          </div>
          <div className='bg-blue-400 rounded-xl mt-4'>
            <div className='py-2 px-4'>
              <p className='font-bold'>Impact Info</p>
              <p className='text-sm'>{resource.impactinfo}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleResourcePage