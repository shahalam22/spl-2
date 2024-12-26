import React from 'react'
import './EventForm.css'
import Button from '../button/Button'

function EventForm({onClose}) {
  return (
    <div className='fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center' onClick={onClose}>
        <div className='event-form' onClick={(e)=>e.stopPropagation()}>
            <h1 className='text-2xl font-semibold'>Create New Event</h1>
            <form>
                <div className='event-form-container'>
                    <div className='event-form-left'>
                        <div className='event-form-single-input'>
                            <label className='event-form-label'>Event Title</label>
                            <input  className='event-form-input' type="text" name="resourceTitle" />
                        </div>
                        <div className='event-form-single-input'>
                            <label className='event-form-label'>Category</label>
                            <select className='event-form-input' name="category" id="category">
                                <option value="food">Food</option>
                                <option value="cloth">Cloth</option>
                                <option value="equipment">Equipment</option>
                                <option value="service">Service</option>
                                <option value="office_supply">Office Supply</option>
                                <option value="furniture">Furniture</option>
                                <option value="material">Material</option>
                            </select>
                        </div>
                        <div className='event-form-single-input'>
                            <label className='event-form-label'>Description</label>
                            <textarea className='event-form-input' name="resourceDescription" id="resourceDescription" cols="30" rows="3"></textarea>
                        </div>
                        <div className='event-form-double-input'>
                            <div>
                                <label className='event-form-label'>Date</label>
                                <input className='event-form-input' type="date" name="date" />
                            </div>
                            <div>
                                <label className='event-form-label'>Time</label>
                                <input className='event-form-input' type="time" name="time" />
                            </div>
                        </div>
                        <div className='event-form-double-input'>
                            <div>
                                <label className='event-form-label'>Timezone</label>
                                <input className='event-form-input' type="text" name="timezone" />
                            </div>
                            <div>
                                <label className='event-form-label'>Max Participant</label>
                                <input className='event-form-input' type="number" name="participant" />
                            </div>
                        </div>
                    </div>
                    <div className='vertical-line'></div>
                    <div className='event-form-right'>
                        <div>
                            <div className='resource-form-single-input'>
                                <label className='resource-form-label'>Upload Event Banner</label>
                                <input type="file" name="image" />
                            </div>
                            <br />
                            <p className='text-[14px]'>Address</p>
                            <div className='event-form-double-input'>
                                <div>
                                    <input className='event-form-input' type="text" name="street" placeholder="Street" />
                                    <input className='event-form-input' type="text" name="city" placeholder="City" />
                                </div>
                                <div>
                                    <input className='event-form-input' type="text" name="state" placeholder="State" />
                                    <input className='event-form-input' type="text" name="zip" placeholder="Zip" />
                                </div>
                            </div>
                            <input className='event-form-input' type="text" name="state" placeholder="Country" />
                            
                        </div>
                        <div className='flex gap-5 justify-end mt-10'>
                            <Button variant='red' size='sm' onClick={onClose}>Cancel</Button>
                            <Button variant='cyan' size='sm'>Create</Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EventForm