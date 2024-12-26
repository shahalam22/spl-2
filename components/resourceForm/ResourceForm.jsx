import React from 'react'
import './ResourceForm.css'
import Button from '../button/Button'

function ResourceForm({onClose}) {
  return (
    <div className='fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center' onClick={onClose}>
        <div className='resource-form' onClick={(e)=>e.stopPropagation()}>
            <h1 className='text-2xl font-semibold'>Create New Resource Post</h1>
            <form>
                <div className='resource-form-container'>
                    <div className='resource-form-left'>
                        <div className='resource-form-single-input'>
                            <label className='resource-form-label'>Resource Title</label>
                            <input  className='resource-form-input' type="text" name="resourceTitle" />
                        </div>
                        {/* <div className='resource-form-single-input'>
                            <label className='resource-form-label'>Category</label>
                            <select className='resource-form-input' name="category" id="category">
                                <option value="food">Food</option>
                                <option value="cloth">Cloth</option>
                                <option value="equipment">Equipment</option>
                                <option value="service">Service</option>
                                <option value="office_supply">Office Supply</option>
                                <option value="furniture">Furniture</option>
                                <option value="material">Material</option>
                            </select>
                        </div> */}
                        <div className='resource-form-double-input'>
                            <div>
                                <label className='resource-form-label'>Category</label>
                                <select className='resource-form-input' name="category" id="category">
                                    <option value="food">Food</option>
                                    <option value="cloth">Cloth</option>
                                    <option value="equipment">Equipment</option>
                                    <option value="service">Service</option>
                                    <option value="office_supply">Office Supply</option>
                                    <option value="furniture">Furniture</option>
                                    <option value="material">Material</option>
                                </select>
                            </div>
                            <div>
                                <label className='resource-form-label'>Condition</label>
                                <select className='resource-form-input' name="condition" id="condition">
                                    <option value="new">New</option>
                                    <option value="used">Used</option>
                                    <option value="surplus">Surplus</option>
                                    <option value="expired">Date Expired</option>
                                </select>
                            </div>
                            {/* <div>
                                <label className='resource-form-label'>Category</label>
                                <select className='resource-form-input' name="category" id="category">
                                    <option value="food">Food</option>
                                    <option value="cloth">Cloth</option>
                                    <option value="equipment">Equipment</option>
                                    <option value="service">Service</option>
                                    <option value="office_supply">Office Supply</option>
                                    <option value="furniture">Furniture</option>
                                    <option value="material">Material</option>
                                </select>
                            </div> */}
                        </div>
                        <div className='resource-form-single-input'>
                            <label className='resource-form-label'>Description</label>
                            <textarea className='resource-form-input' name="resourceDescription" id="resourceDescription" cols="30" rows="3"></textarea>
                        </div>
                        <div className='resource-form-double-input'>
                            <div>
                                <label className='resource-form-label'>Available Quantity</label>
                                <input className='resource-form-input' type="number" name="quantity" />
                            </div>
                            <div>
                                <label className='resource-form-label'>Price</label>
                                <input className='resource-form-input' type="number" name="price" />
                            </div>
                        </div>
                        <div className='resource-form-double-input'>
                            <div>
                                <label className='resource-form-label'>Pickup Availability</label>
                                <input className='resource-form-input' type="text" name="location" />
                            </div>
                            <div>
                                <label className='resource-form-label'>Delivery Options</label>
                                <input className='resource-form-input' type="text" name="availableUntil" />
                            </div>
                        </div>
                        <div className='resource-form-single-input'>
                            <label className='resource-form-label'>Additional Notes</label>
                            <textarea className='resource-form-input' name="additionalNotes" id="additionalNotes" cols="30" rows="3"></textarea>
                        </div>
                    </div>
                    <div className='vertical-line'></div>
                    <div className='resource-form-right'>
                        <div>
                            <div className='resource-form-single-input'>
                                <label className='resource-form-label'>Upload Image</label>
                                <input type="file" name="image" />
                            </div>
                            <br />
                            <p className='text-[14px]'>Address</p>
                            <div>
                                <div className='resource-form-double-input'>
                                    <input className='resource-form-input' type="text" name="street" placeholder="Street" />
                                    <input className='resource-form-input' type="text" name="city" placeholder="City" />
                                </div>
                                <div className='resource-form-double-input'>
                                    <input className='resource-form-input' type="text" name="state" placeholder="State" />
                                    <input className='resource-form-input' type="text" name="zip" placeholder="Zip" />
                                </div>
                                <input className='resource-form-input' type="text" name="country" placeholder='Country' />
                            </div>
                            {/* <div className='resource-form-double-input'>
                                <div>
                                    <label className='resource-form-label'>Market Value</label>
                                    <input className='resource-form-input' type="number" name="marketValue" />
                                </div>
                                <div>
                                    <label className='resource-form-label'>Asking Value</label>
                                    <input className='resource-form-input' type="number" name="askingValue" />
                                </div>
                            </div> */}
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

export default ResourceForm