// 'use client';
// import Header from '@/components/header/Header';
// import HeaderAuth from '@/components/headerAuth/HeaderAuth';
// import { useAppSelector } from '@/redux/hooks'
// import React from 'react'

// function Dashboard() {
//     const authenticated = useAppSelector((state) => !!state.auth.user);

//   return (  
//     <>
//         {authenticated? <HeaderAuth/> : <Header/>}
//         <div>This is your Dashboard</div>
//     </>
//   )
// }

// export default Dashboard





















'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
// import { fetchAllPosts } from '@/redux/features/postsSlice';
// import { fetchAllEvents } from '@/redux/features/eventsSlice';
import Button from '@/components/button/Button';
import ResourceCard from '@/components/resourceCard/ResourceCard';
import RequestCard from '@/components/requestCard/RequestCard';
import EventCard from '@/components/eventCard/EventCard';
import ResourceForm from '@/components/resourceForm/ResourceForm';
import RequestForm from '@/components/requestForm/RequestForm';
import EventForm from '@/components/eventForm/EventForm';
import SingleResourcePage from '@/components/singleResourcePage/SingleResourcePage';
import SingleRequestPage from '@/components/singleRequestPage/SingleRequestPage';
import SingleEventPage from '@/components/singleEventPage/SingleEventPage';
import { fetchAllPosts } from '@/redux/features/postsSlice';
import { fetchAllEvents } from '@/redux/features/eventSlice';
import HeaderAuth from '@/components/headerAuth/HeaderAuth';

function Dashboard() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const currentUserId = user?.user_id;
  const {posts, loading: postsLoading, error: postsError} = useAppSelector((state) => state.posts);
  const { events, loading: eventsLoading, error: eventsError, participatedEvents } = useAppSelector((state) => state.events)

  const [showResourceForm, setShowResourceForm] = React.useState(false);
  const [showRequestForm, setShowRequestForm] = React.useState(false);
  const [showEventForm, setShowEventForm] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState(null);
  const [selectedEvent, setSelectedEvent] = React.useState(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      dispatch(fetchAllPosts());
      dispatch(fetchAllEvents(user.user_id));
    }
  }, [user, dispatch, router]);

  const userPosts = posts.filter((post) => (post.user_id === user?.user_id && post.event_id === null));
  const resources = userPosts.filter((post) => !post.isRequest);
  const requests = userPosts.filter((post) => post.isRequest);
  const userEvents = events.filter((event) => event.user_id === user?.user_id);

  const userBoughtedResources = posts.filter((post) => (!post.isRequest && post.event_id===null)); // Filter for resources


  const handleEditProfile = () => {
    // Placeholder for profile editing logic (could open a modal or redirect)
    alert('Edit profile functionality to be implemented');
  };

  if (postsLoading || eventsLoading) return <p className="text-center mt-10">Loading dashboard...</p>;
  if (postsError) return <p className="text-center mt-10 text-red-500">Posts Error: {postsError}</p>;
  if (eventsError) return <p className="text-center mt-10 text-red-500">Events Error: {eventsError}</p>;

  return (
    <>
      <HeaderAuth />
      <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Your Dashboard, {user?.username}!</h1>

          {/* Profile Section */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* <img
                src={user?.profilePicture || '/default-profile.png'}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              /> */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">Username: {user?.username}</h2>
                <p className="text-gray-600">User Email: {user?.email}</p>
                {/* <p className="text-sm text-gray-500 mt-1">Last Login: {new Date(user?.lastLogin).toISOString()}</p> */}
                {/* <Button
                  variant="cyan"
                  size="sm"
                  className="mt-4"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </Button> */}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          {/* <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button variant="black" size="block" onClick={() => setShowResourceForm(true)}>
              Create Resource
            </Button>
            <Button variant="black" size="block" onClick={() => setShowRequestForm(true)}>
              Create Request
            </Button>
            <Button variant="black" size="block" onClick={() => setShowEventForm(true)}>
              Create Event
            </Button>
          </div> */}

          {/* Resources Section */}
          {/* <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Resources</h2>
            {resources.length === 0 ? (
              <p className="text-gray-600">You haven’t posted any resources yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {resources.map((resource) => (
                  <ResourceCard
                    key={resource.post_id}
                    resource={resource}
                    variant="editcard"
                    onClick={() => setSelectedPost(resource)}
                  />
                ))}
              </div>
            )}
          </div> */}



          <div className='w-[85%] h-[1px] bg-gray-300'/>
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className='text-2xl mt-5 font-semibold'>You Bought</h1>
            <div className="flex justify-center items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-[100%] p-5">
                {userBoughtedResources
                .filter((resource) => resource.buyer_id === currentUserId)
                .map((resource) => (
                  <ResourceCard
                    key={resource.post_id}
                    variant={'viewcard'}
                    resource={resource}
                  />
                ))}
              </div>
            </div>
          </div>


          {/* Requests Section */}
          {/* <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Requests</h2>
            {requests.length === 0 ? (
              <p className="text-gray-600">You haven’t posted any requests yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {requests.map((request) => (
                  <RequestCard
                    key={request.post_id}
                    request={request}
                    variant="editcard"
                    onClick={() => setSelectedPost(request)}
                  />
                ))}
              </div>
            )}
          </div> */}

          {/* Events Section */}
          {/* <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Events</h2>
            {userEvents.length === 0 ? (
              <p className="text-gray-600">You haven’t created any events yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {userEvents.map((event) => (
                  <EventCard
                    key={event.event_id}
                    event={event}
                    variant="editcard"
                    onClick={() => setSelectedEvent(event)}
                  />
                ))}
              </div>
            )}
          </div> */}
          {
              participatedEvents && (
                <>
              <div className="bg-white shadow rounded-lg p-6">
                <div className='w-[85%] h-[1px] bg-gray-300'/>
                  <h1 className='text-2xl mt-5 font-semibold'>Participating Events</h1>
                  <div className="flex justify-center items-center">
                      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-[100%] p-5'>
                          {
                            participatedEvents.map((event) => (
                                <EventCard 
                                  key={event.event_id} 
                                  variant={'joincard'} 
                                  event={event}
                                />
                            ))
                          }
                      </div>
                  </div>
              </div>
                </>
              )
            }
        </div>

        {/* Modals for Forms and Single Views */}
        {showResourceForm && <ResourceForm onClose={() => setShowResourceForm(false)} />}
        {showRequestForm && <RequestForm onClose={() => setShowRequestForm(false)} />}
        {showEventForm && <EventForm onClose={() => setShowEventForm(false)} />}
        {selectedPost && !selectedPost.isRequest && (
          <SingleResourcePage postId={selectedPost.post_id} onClose={() => setSelectedPost(null)} />
        )}
        {selectedPost && selectedPost.isRequest && (
          <SingleRequestPage postId={selectedPost.post_id} onClose={() => setSelectedPost(null)} />
        )}
        {selectedEvent && <SingleEventPage eventId={selectedEvent.event_id} onClose={() => setSelectedEvent(null)} />}
      </div>
    </>
  );
}

export default Dashboard;