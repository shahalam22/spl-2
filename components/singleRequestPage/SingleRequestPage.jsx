import React from 'react'
import './SingleRequestPage.css'
import Button from '../button/Button'
import Image from 'next/image'
import { FaLocationArrow, FaSearchLocation, FaShare } from 'react-icons/fa'
import { useAppSelector } from '@/redux/hooks'


function SingleRequestPage({onClose, requestId, isEditCard}) {
  const request = useAppSelector((state) => state.posts.posts.find((post) => post.post_id === requestId));

  // console.log(request);
  
  return (
    <div className='fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center' onClick={onClose}>
      <div className='single-request-page rounded-lg' onClick={(e)=>e.stopPropagation()}>
        <div className='single-request-page-right w-[100%] flex flex-col gap-2 pt-5'>
          <h1 className='font-bold text-2xl'>{request.title}</h1>
          <div className='single-request-page-right-tags flex gap-2 justify-start'>
            <img className='max-w-[80px] max-h-6 rounded-lg' src={`/${getCategoryName(request.category_id-1)}`} alt="cat_image" />
            {/* <img className='max-h-6 rounded-lg' src={`/${request.condition_id}.jpg`} alt="condition_image" /> */}
          </div>
          <div className='text-normal mt-4 flex flex-col'>
            <p className='font-bold'>Description:</p>
            <p className='text-sm'>{request.description}</p>
          </div>
          <div className='text-normal flex flex-col'>
            <p className='font-bold'>Pickup Availability</p>
            <p className='text-sm'><span className='font-bold'>Date: </span>{request.pickup.date}</p>
            <p className='text-sm'><span className='font-bold'>Time: </span>{request.pickup.time}</p>
          </div>
          <div className='single-resource-page-left-location bg-[#FFBF61] py-2 px-4 rounded-lg flex items-center gap-2 w-fit mt-4'>
              <svg className='card-view-footer-icon' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
              <p className='text-sm'>{request.location.state+", "+request.location.country}</p>
          </div>
          <div className='bg-blue-400 rounded-xl'>
            <div className='py-2 px-4'>
              <p className='font-bold'>Impact Info</p>
              <p className='text-sm'>{request.impactinfo}</p>
            </div>
          </div>
          {
            !isEditCard && (
              <div className='w-[100%] flex gap-2 mt-2'>
                {/* <div className='w-[50%]'>
                  <Button variant='black' size='block'>Provide this resource</Button>
                </div>
                <div className='w-[50%] flex gap-1'> */}
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
                {/* </div> */}
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}


const getCategoryName = (id) => {
  switch (id) {
    case 1:
      return 'food_text.jpg';
    case 2:
      return 'cloth_text.jpg';
    case 3:
      return 'equipment_text.jpg';
    case 4:
      return 'service_text.jpg';
    case 5:
      return 'office_supply_text.jpg';
    case 6:
      return 'furniture_text.jpg';
    case 7:
      return 'material_text.jpg';
    default:
      return 'unknown';
  }
};


export default SingleRequestPage



  // {
  //      title: "Carpentry Service",
  //      description: "A high-quality product in excellent condition.",
  //      price: 338,
  //      quantity: 1,
  //      category: "office_supply",
  //      condition: "used",
  //      pickup: {
  //         date: "2022-03-30",
  //         time: "12:00",
  //      },
  //      delivery: "Local delivery available within a 10 mile radius (delivery fee may apply)",
  //      location: "Chicago",
  //      impactinfo: "This service will help you build a strong foundation for your project.",
  //      images: ["/public/grant1.jpg", "/public/grant2.jpg", "/public/grant3.jpg"],
  // }