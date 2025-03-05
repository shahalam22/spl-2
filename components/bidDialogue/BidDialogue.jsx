import React from 'react'
import './BidDialogue.css'
import Button from '../button/Button'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updatePost } from '@/redux/features/postsSlice'
import { fetchAllOfCurrentEvent } from '@/redux/features/eventSlice'

function BidDialogue({onClose, userId, eventId, postId, product}) {
  const dispatch = useAppDispatch()

  const [bid, setBid] = React.useState({
    bidAmount: 0,
    status: 'pending',
    user_id: userId,
    event_id: eventId,
    post_id: postId
  })

  // const handleChange = (e) => {
  //   setBid({...bid, [e.target.name]: e.target.value})
  // }
  const setBidAmount = (e) => {
    setBid({...bid, bidAmount: e.target.value})
  }

  const handlePlaceBid = async () => {
    if(bid.bidAmount < product.bidAmount){
      alert('Bid amount should be greater than the current bid amount');
    }else{
      const updatedProduct = {...product, bidAmount: bid.bidAmount}
      // console.log(product.post_id, updatedProduct);
      await dispatch(updatePost({postId: product.post_id, postData: updatedProduct})).unwrap();
      await dispatch(fetchAllOfCurrentEvent(eventId)).unwrap().then(()=>onClose());
    }
    // console.log(bid);
  }

  return (
    <>
    {/* <div className='fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center' onClick={onClose}></div> */}
        <div className='dialogue p-6 flex flex-col gap-2 items-center max-w-72 rounded-lg' onClick={(e)=>e.stopPropagation()}>
            <h1 className='font-bold text-lg'>Bid for the Resource</h1>
            <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="bid" className='text-sm'>Rise value to -</label>
                <input className='border border-gray-200 rounded-md px-2' type="number" id="bid" name="bidAmount" onChange={setBidAmount}/>
            </div>
            <div className='flex gap-2 w-full mt-2'>
                <Button variant='black' size='block' onClick={handlePlaceBid}>Place Bid</Button>
                <div onClick={onClose}>
                  <Button variant='red' size='block'>Cancel</Button>
                </div>
            </div>
        </div>
    </>
  )
}

export default BidDialogue