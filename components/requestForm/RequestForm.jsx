import React, { useState } from 'react'
import './RequestForm.css'
import Button from '../button/Button'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { createPost, fetchAllPosts, updatePost } from '@/redux/features/postsSlice';

function RequestForm({onClose, data}) {

    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.auth.user?.user_id);

    const [formData, setFormData] = useState({
        title: data? data.title : "",
        category_id: data? data.category_id : "",
        description: data? data.description : "",
        impactinfo: data? data.impactinfo : "",
        isRequest: data? data.isRequest : true,
        location: { city: data? data.location.city : "", country: data? data.location.country : "", state: data? data.location.state : "", street: data? data.location.street : "", zip: data? data.location.zip : "" },
        pickup: { date: data? data.pickup.date : "", time: data? data.pickup.time : "" },
        condition: "",
        delivery: "",
        images: [],
        price: 0,
        quantity: 0,
        status: "available",
        user_id: data ? data.user_id : userId,
        event_id: data ? data.event_id : "",
    })

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => {
        const keys = name.split(".");
        if (keys.length > 1) {
          return {
            ...prev,
            [keys[0]]: {
              ...prev[keys[0]],
              [keys[1]]: value,
            },
          };
        }
        return { ...prev, [name]: value };
      });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(data);
        
        if(data){
            dispatch(updatePost({postId: data.post_id, postData: formData})).then(()=> onClose());
        }else{
            dispatch(createPost(formData)).then(()=> onClose());
        }
        dispatch(fetchAllPosts());
    }
    

  return (
    <div className='fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center' onClick={onClose}>
        <div className='request-form' onClick={(e)=>e.stopPropagation()}>
            <h1 className='text-2xl font-semibold'>Create New Request Post</h1>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <div className='request-form-container'>
                    <div className='request-form-left'>
                        <div className='request-form-single-input'>
                            <label className='request-form-label'>Request Title</label>
                            <input  className='request-form-input' type="text" name="title" value={formData.title} onChange={handleChange}/>
                        </div>
                        <div className='request-form-single-input'>
                        <label className="request-form-label">Category</label>
                        <select
                          className="resource-form-input"
                          name="category_id"
                          value={formData.category_id}
                          onChange={handleChange}
                        >
                          <option>Select</option>
                          <option value="1">Food</option>
                          <option value="2">Cloth</option>
                          <option value="3">Equipment</option>
                          <option value="4">Service</option>
                          <option value="5">Office Supply</option>
                          <option value="6">Furniture</option>
                          <option value="7">Material</option>
                        </select>
                        </div>
                        <div className='request-form-single-input'>
                            <label className='request-form-label'>Description</label>
                            <textarea className='request-form-input' name="description" value={formData.description} onChange={handleChange} cols="30" rows="3"></textarea>
                        </div>
                        {/* <div className='request-form-double-input'>
                            <div>
                                <label className='request-form-label'>Expected Quantity</label>
                                <input className='request-form-input' type="number" name="quantity" />
                            </div>
                            <div>
                                <label className='request-form-label'>Estimated Impact</label>
                                <input className='request-form-input' type="number" name="impact" />
                            </div>
                        </div> */}
                        <div className='request-form-single-input'>
                            <label className='request-form-label'>Impact Info</label>
                            <textarea className='request-form-input' name="impactinfo" value={formData.impactinfo} onChange={handleChange} cols="30" rows="3"></textarea>
                        </div>
                    </div>
                    <div className='vertical-line'></div>
                    <div className='request-form-right'>
                        <div>
                            <p className='text-[14px]'>Address</p>
                            <div className='request-form-double-input'>
                                <div>
                                    <input
                                      className="request-form-input"
                                      type="text"
                                      name="location.street"
                                      placeholder="Street"
                                      value={formData.location.street}
                                      onChange={handleChange}
                                    />
                                    <input
                                      className="request-form-input"
                                      type="text"
                                      name="location.city"
                                      placeholder="City"
                                      value={formData.location.city}
                                      onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <input
                                      className="request-form-input"
                                      type="text"
                                      name="location.state"
                                      placeholder="State"
                                      value={formData.location.state}
                                      onChange={handleChange}
                                    />
                                    <input
                                      className="request-form-input"
                                      type="text"
                                      name="location.zip"
                                      placeholder="Zip"
                                      value={formData.location.zip}
                                      onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <input
                              className="request-form-input"
                              type="text"
                              name="location.country"
                              placeholder="Country"
                              value={formData.location.country}
                              onChange={handleChange}
                            />
                            <div className='request-form-single-input'>
                                <div>
                                    <label className='request-form-label'>Pickup Availability</label>
                                    <input
                                      type="date"
                                      className="request-form-input"
                                      name="pickup.date"
                                      value={formData.pickup.date}
                                      onChange={handleChange}
                                    />
                                    <input
                                      type="time"
                                      className="request-form-input"
                                      name="pickup.time"
                                      value={formData.pickup.time}
                                      onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-5 justify-end mt-10'>
                            <Button variant='red' size='sm' onClick={onClose}>Cancel</Button>
                            <Button variant="cyan" size="sm" type="submit">
                              {data ? "Update" : "Submit"}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default RequestForm