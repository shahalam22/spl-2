import React from 'react'
import './EventProduct.css'
import Button from '../button/Button'
import SingleResourcePage from '../singleResourcePage/SingleResourcePage'
import ResourceForm from '../resourceForm/ResourceForm'
import { useAppDispatch } from '@/redux/hooks'
import { deletePost } from '@/redux/features/postsSlice'


function EventProduct({product, onClickBid, variant}) {
    const dispatch = useAppDispatch()
    const [showCard, setShowCard] = React.useState(false)
    const [showEdit, setShowEdit] = React.useState(false)

    const toggleCardDetails = () => setShowCard((prev) => !prev)
    const toggleEditDetails = () => setShowEdit((prev) => !prev)

    const handleDelete = async () => {
      
      try {
        dispatch(deletePost(product.post_id));
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }

  return (
    <>
        <div className='flex justify-between py-4 px-6 rounded-2xl bg-white shadow-md' onClick={toggleCardDetails}>
            <div className='flex items-center gap-4'>
                <img className='w-10 h-10 rounded-3xl' src="/grant1.jpg" alt="product" />
                <p className='font-semibold'>{product.title}</p>
            </div>
            <div className='flex gap-10 items-center'>
                <div className='flex gap-4'>
                    <p><span className='text-cyan-500 font-semibold'>Ask : </span>{product.price}</p>
                    <p><span className='text-red-500 font-semibold'>Bid : </span>{product.bidAmount}</p>
                </div>
                <div className='flex gap-2'>
                    {
                        variant === 'viewcard' && (
                            <>
                                <div onClick={(e) => e.stopPropagation()}>
                                    <Button variant='black' size='sm' onClick={onClickBid}>Bid</Button>
                                </div>
                                <div onClick={(e) => e.stopPropagation()}>
                                    <Button variant='cyan' size='sm'>Chat</Button>
                                </div>
                            </>
                        )
                    }
                    {
                        variant === 'editcard' && (
                            <>
                                <div onClick={(e) => e.stopPropagation()}>
                                    <Button variant='black' size='sm' onClick={toggleEditDetails}>Edit</Button>
                                </div>
                                <div onClick={(e) => e.stopPropagation()}>
                                    <Button variant='red' size='sm' onClick={handleDelete}>Delete</Button>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
        {
            showCard && <SingleResourcePage onClose={toggleCardDetails} resource={product} isEditCard={variant==="editcard"?true:false}/>
        }
        {
            showEdit && <ResourceForm onClose={toggleEditDetails} data={product}/>
        }
    </>
  )
}

export default EventProduct