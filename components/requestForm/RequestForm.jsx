import React from 'react'
import './RequestForm.css'
import Button from '../button/Button'

function RequestForm({onClose}) {
  return (
    <div className='fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center' onClick={onClose}>
        <div className='request-form' onClick={(e)=>e.stopPropagation()}>
            <h1 className='text-2xl font-semibold'>Create New Request Post</h1>
            <form>
                <div className='request-form-container'>
                    <div className='request-form-left'>
                        <div className='request-form-single-input'>
                            <label className='request-form-label'>Request Title</label>
                            <input  className='request-form-input' type="text" name="resourceTitle" />
                        </div>
                        <div className='request-form-single-input'>
                            <label className='request-form-label'>Category</label>
                            <select className='request-form-input' name="category" id="category">
                                <option value="food">Food</option>
                                <option value="cloth">Cloth</option>
                                <option value="equipment">Equipment</option>
                                <option value="service">Service</option>
                                <option value="office_supply">Office Supply</option>
                                <option value="furniture">Furniture</option>
                                <option value="material">Material</option>
                            </select>
                        </div>
                        <div className='request-form-single-input'>
                            <label className='request-form-label'>Description</label>
                            <textarea className='request-form-input' name="resourceDescription" id="resourceDescription" cols="30" rows="3"></textarea>
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
                            <textarea className='request-form-input' name="additionalNotes" id="additionalNotes" cols="30" rows="3"></textarea>
                        </div>
                    </div>
                    <div className='vertical-line'></div>
                    <div className='request-form-right'>
                        <div>
                            <p className='text-[14px]'>Address</p>
                            <div className='request-form-double-input'>
                                <div>
                                    <input className='request-form-input' type="text" name="street" placeholder="Street" />
                                    <input className='request-form-input' type="text" name="city" placeholder="City" />
                                </div>
                                <div>
                                    <input className='request-form-input' type="text" name="state" placeholder="State" />
                                    <input className='request-form-input' type="text" name="zip" placeholder="Zip" />
                                </div>
                            </div>
                            <input className='request-form-input' type="text" name="state" placeholder="Country" />
                            <div className='request-form-single-input'>
                                <div>
                                    <label className='request-form-label'>Pickup Availability</label>
                                    <input className='request-form-input' type="text" name="marketValue" />
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-5 justify-end mt-10'>
                            <Button variant='red' size='sm' onClick={onClose}>Cancel</Button>
                            <Button variant='cyan' size='sm'>Submit</Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default RequestForm