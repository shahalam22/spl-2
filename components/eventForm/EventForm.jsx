import React, { useState } from 'react'
import './EventForm.css'
import Button from '../button/Button'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { createEvent, fetchAllEvents, updateEvent } from '@/redux/features/eventSlice'


function EventForm({onClose, data}) {
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.auth.user?.user_id)
    const [formData, setFormData] = useState({
        date: data? (data.date.split("T")[0]) : "",
        description: data? data.description : "",
        endTime: data? (data.endTime.split("T")[1].slice(0, 5)) : "",
        image: data? data.image : "",
        location :{
            city: data? data.location.city : "",
            country: data? data.location.country : "",
            state: data? data.location.state : "",
            street: data? data.location.street : "",
            zip: data? data.location.zip : "",
        },
        max_participant: data? data.max_participant : 0,
        startTime: data? (data.startTime.split("T")[1].slice(0, 5)) : "",
        status: data? data.status : "Upcoming", //time er upor base kore niye nibo
        timezone: data? data.timezone : "UTC",
        title: data? data.title : "", 
        user_id: userId,
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

    const handleFileChange = (e) => {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        images: files, // Store raw File objects
      }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("data ",formData);
        if(data){
            dispatch(updateEvent({eventId: data.event_id, eventData: formData})).then(() => onClose());
        }else{
            dispatch(createEvent(formData)).then(() => onClose());
        }
        dispatch(fetchAllEvents(userId));
    }


  return (
    <div className='fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center' onClick={onClose}>
        <div className='event-form' onClick={(e)=>e.stopPropagation()}>
            <h1 className='text-2xl font-semibold'>Create New Event</h1>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <div className='event-form-container'>
                    <div className='event-form-left'>
                        <div className='event-form-single-input'>
                            <label className='event-form-label'>Event Title</label>
                            <input 
                                className='event-form-input' 
                                type="text" 
                                name="title" 
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>
                        {/* <div className='event-form-single-input'>
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
                        </div> */}
                        <div className='event-form-single-input'>
                            <label className='event-form-label'>Description</label>
                            <textarea 
                                className='event-form-input' 
                                name="description" 
                                value={formData.description}
                                onChange={handleChange}
                                cols="30" 
                                rows="3"
                            ></textarea>
                        </div>
                        <div className='event-form-double-input'>
                            <label className='event-form-label'>Date</label>
                            <input 
                                className='event-form-input' 
                                type="date" 
                                name="date" 
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='event-form-double-input'>
                            <div>
                                <label className='event-form-label'>Start Time</label>
                                <input 
                                    className='event-form-input' 
                                    type="time" 
                                    name="startTime" 
                                    value={formData.startTime}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className='event-form-label'>End Time</label>
                                <input 
                                    className='event-form-input' 
                                    type="time" 
                                    name="endTime" 
                                    value={formData.endTime}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='event-form-double-input'>
                            <div>
                                <label className='event-form-label'>Timezone</label>
                                <input className='event-form-input' type="text" name="timezone" value={formData.timezone} onChange={handleChange}/>
                            </div>
                            <div>
                                <label className='event-form-label'>Max Participant</label>
                                <input className='event-form-input' type="number" name="max_participant" value={formData.max_participant} onChange={handleChange}/>
                            </div>
                        </div>
                    </div>
                    <div className='vertical-line'></div>
                    <div className='event-form-right'>
                        <div>
                            <div className='resource-form-single-input'>
                                <label className='resource-form-label'>Upload Event Banner</label>
                                <input type="file" accept='image/*' name="image" onChange={handleFileChange}/>
                            </div>
                            <br />
                            <p className='text-[14px]'>Address</p>
                            <div className='event-form-double-input'>
                                <div>
                                    <input className='event-form-input' type="text" name="location.street" placeholder="Street" value={formData.location.street} onChange={handleChange}/>
                                    <input className='event-form-input' type="text" name="location.city" placeholder="City" value={formData.location.city} onChange={handleChange}/>
                                </div>
                                <div>
                                    <input className='event-form-input' type="text" name="location.state" placeholder="State" value={formData.location.state} onChange={handleChange}/>
                                    <input className='event-form-input' type="text" name="location.zip" placeholder="Zip" value={formData.location.zip} onChange={handleChange}/>
                                </div>
                            </div>
                            <input className='event-form-input' type="text" name="location.country" placeholder="Country" value={formData.location.country} onChange={handleChange}/>
                            
                        </div>
                        <div className='flex gap-5 justify-end mt-10'>
                            <Button variant='red' size='sm' onClick={onClose}>Cancel</Button>
                            <Button variant='cyan' size='sm' type="submit">
                                {data? "Update" : "Create"}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EventForm