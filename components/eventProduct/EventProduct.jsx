import React from 'react'
import './EventProduct.css'
import Button from '../button/Button'

const product = {
    title: 'Surplus sole',
    asking_price: 1000,
    current_bid: 2000,
}

function EventProduct({product, onClickBid}) {
  return (
    <>
        <div className='flex justify-between py-4 px-6 rounded-2xl bg-white shadow-md'>
            <div className='flex items-center gap-4'>
                <img className='w-10 h-10 rounded-3xl' src="/grant1.jpg" alt="product" />
                <p className='font-semibold'>{product.title}</p>
            </div>
            <div className='flex gap-10 items-center'>
                <div className='flex gap-4'>
                    <p><span className='text-cyan-500 font-semibold'>Ask </span>{product.asking_price}</p>
                    <p><span className='text-red-500 font-semibold'>Bid </span>{product.current_bid}</p>
                </div>
                <div className='flex gap-2'>
                    <div onClick={onClickBid}>
                        <Button variant='black' size='sm'>Bid</Button>
                    </div>
                    <Button variant='cyan' size='sm'>Chat</Button>
                </div>
            </div>
        </div>
    </>
  )
}

export default EventProduct