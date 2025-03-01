// THIS IS REQUESTS PAGE. PATH: app\requests\page.js


'use client'
import Button from '@/components/button/Button'
import Header from '@/components/header/Header'
import HeaderAuth from '@/components/headerAuth/HeaderAuth'
import RequestCard from '@/components/requestCard/RequestCard'
import RequestForm from '@/components/requestForm/RequestForm'
import { fetchAllPosts } from '@/redux/features/postsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import React, { useEffect, useRef } from 'react'
import {FaSearch} from 'react-icons/fa'


function Requests() {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.posts);
  const authenticated = useAppSelector((state) => !!state.auth.user);
  const userId = useAppSelector((state) => state.auth.user?.user_id);

  const [openForm, setOpenForm] = React.useState(false)
  const openRequestForm = () => { setOpenForm(true)}
  const closeRequestForm = () => { setOpenForm(false)}

  const refToMyRequests = useRef(null);
  const refToOtherRequests = useRef(null);
  const scrollToMyRequests = () => {
    refToMyRequests.current.scrollIntoView({ behavior: 'smooth' });
  }
  const scrollToOtherRequests = () => {
    refToOtherRequests.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  const requests = posts.filter((post) => post.isRequest); // Filter for requests

  if (loading) return <p>Loading requests...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
        {authenticated ? <HeaderAuth /> : <Header />}
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
                        <Button variant='black' size='block' onClick={scrollToMyRequests}>Your Requests</Button>
                      </div>
                      <div className='w-28'>
                        <Button variant='black' size='block' onClick={scrollToOtherRequests}>Request Posts</Button>
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
            <h1 ref={refToOtherRequests} className='text-2xl mt-5 font-semibold'>Requests</h1>
            <div className="flex justify-center items-center">
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-[100%] p-5'>
                    {
                        requests.filter((request) => request.user_id !== userId).map((request) => (
                            <RequestCard key={request.post_id} request={request} variant={'viewcard'}/>
                        ))
                    }
                </div>
            </div>
            {
              authenticated && (
                <>
                  <div className='w-[85%] h-[1px] bg-gray-300'/>
                  <h1 ref={refToMyRequests} className='text-2xl mt-5 font-semibold'>My Requests</h1>
                  <div className="flex justify-center items-center">
                      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-[100%] p-5'>
                          {
                            requests.filter((request) => request.user_id === userId).map((request) => (
                                  <RequestCard key={request.post_id} request={request} variant={'editcard'}/>
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
          openForm && <RequestForm onClose={closeRequestForm}/>
        }
    </>
  )
}

export default Requests