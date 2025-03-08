'use client';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { fetchAllPosts } from '@/redux/features/postsSlice';
import Button from '@/components/button/Button';
import ResourceCard from '@/components/resourceCard/ResourceCard';
import ResourceForm from '@/components/resourceForm/ResourceForm';
import { FaSearch } from 'react-icons/fa';
import HeaderAuth from '@/components/headerAuth/HeaderAuth';
import Header from '@/components/header/Header';

function Resources() {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.posts);
  const authenticated = useAppSelector((state) => !!state.auth.user);
  const userId = useAppSelector((state) => state.auth.user?.user_id);
  const [showForm, setShowForm] = useState(false);

  const refToMyResources = useRef(null);
  const refToOtherResources = useRef(null);

  const scrollToMyResources = () => {
    refToMyResources.current.scrollIntoView({ behavior: 'smooth' });
  }
  const scrollToOtherResources = () => {
    refToOtherResources.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  const resources = posts.filter((post) => (!post.isRequest && post.event_id===null)); // Filter for resources

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  if (loading) return <p>Loading resources...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      { authenticated ? <HeaderAuth /> : <Header /> }
      <div className="flex flex-col items-center mt-10 mb-24">
        <div className="flex justify-between items-center w-[100%] px-12">
          <h1 className="text-3xl font-semibold">Resources</h1>
          {authenticated && (
            <div className="flex gap-2">
              <div className="w-28">
                <Button variant="black" size="block" onClick={openForm}>
                  Add Resource
                </Button>
              </div>
              <div className="w-30">
                <Button variant="black" size="block" onClick={scrollToMyResources}>
                  Your Resources
                </Button>
              </div>
              <div className="w-30">
                <Button variant="black" size="block" onClick={scrollToOtherResources}>
                  Resource Posts
                </Button>
              </div>
            </div>
          )}
        </div>
        {/* <div className='mt-2 w-[100%] py-5 px-12'>
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
        </div> */}
        
        {/* <div className='w-[85%] h-[1px] bg-gray-300'/> */}
        {/* <h1 ref={refToOtherResources} className='text-2xl mt-5 font-semibold'>Resources</h1> */}
        <div ref={refToOtherResources} className="flex justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-[100%] p-5">
            {resources
            .filter((resource) => (!userId || resource.user_id != userId) && resource.buyer_id === null)
            .map((resource) => (
              <ResourceCard
                key={resource.post_id}
                variant={'viewcard'}
                resource={resource}
              />
            ))}
          </div>
        </div>
        
        {/* DASHBOARD E DEYA */}
        {
          authenticated && (
            <>
              <div className='w-[85%] h-[1px] bg-gray-300'/>
              <h1 ref={refToMyResources} className='text-2xl mt-5 font-semibold'>My Resources</h1>
              <div className="flex justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-[100%] p-5">
                  {resources
                  .filter((resource) => resource.user_id === userId)
                  .map((resource) => (
                    <ResourceCard
                      key = {resource.post_id}
                      variant={'editcard'}
                      resource={resource}
                    />
                  ))}
                  {
                    resources.filter((resource) => resource.user_id === userId).length === 0 && <p className=''>There is no resources found.</p>
                  }
                </div>
              </div>
            </>
          )
        }

        {/* <div className='w-[85%] h-[1px] bg-gray-300'/>
        <h1 ref={refToOtherResources} className='text-2xl mt-5 font-semibold'>You Bought</h1>
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-[100%] p-5">
            {resources
            .filter((resource) => resource.buyer_id === userId)
            .map((resource) => (
              <ResourceCard
                key={resource.post_id}
                variant={'viewcard'}
                resource={resource}
              />
            ))}
          </div>
        </div> */}

        <div className='w-[85%] h-[1px] bg-gray-300'/>
      </div>
      {showForm && <ResourceForm onClose={closeForm} />}
    </>
  );
}

export default Resources;