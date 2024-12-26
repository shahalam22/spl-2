import React from 'react'
import './BidDialogue.css'
import Button from '../button/Button'

function BidDialogue({onClose}) {
  return (
    <>
    {/* <div className='fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center' onClick={onClose}></div> */}
        <div className='dialogue p-6 flex flex-col gap-2 items-center max-w-72 rounded-lg' onClick={(e)=>e.stopPropagation()}>
            <h1 className='font-bold text-lg'>Bid for the Resource</h1>
            <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="bid" className='text-sm'>Rise value to -</label>
                <input className='border border-gray-200 rounded-md px-2' type="number" id="bid" name="bid"/>
            </div>
            <div className='flex gap-2 w-full mt-2'>
                <Button variant='black' size='block'>Place Bid</Button>
                <div onClick={onClose}>
                  <Button variant='red' size='block'>Cancel</Button>
                </div>
            </div>
        </div>
    </>
  )
}

export default BidDialogue