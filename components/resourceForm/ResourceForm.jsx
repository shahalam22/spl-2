import React, { useState } from "react";
import "./ResourceForm.css";
import Button from "../button/Button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createPost, fetchAllPosts, updatePost } from "@/redux/features/postsSlice";

function ResourceForm({ onClose, data, eventId }) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?.user_id);
  const [formData, setFormData] = useState({
    title: data? data.title : "",
    category_id: data? data.category_id : "",
    condition:  data? data.condition : "",
    delivery: data? data.delivery : "",
    description: data? data.description : "",
    images: data? data.images : [],
    impactinfo: data? data.impactinfo : "",
    isRequest: data? data.isRequest : false,
    location: { city: data? data.location.city : "", country: data? data.location.country : "", state: data? data.location.state : "", street: data? data.location.street : "", zip: data? data.location.zip : "" },
    pickup: { date: data? data.pickup.date : "", time: data? data.pickup.time : "" },
    price: data? data.price : 0,
    bidAmount: data? data.bidAmount : 0,
    quantity: data? data.quantity : 0,
    status: data? data.status : "available",
    user_id: data ? data.user_id : userId,
    event_id: data ? data.event_id : eventId ? eventId : -1,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if(data){
      dispatch(updatePost({postId: data.post_id, postData: formData})).then(() => onClose());
    }else{    
      dispatch(createPost(formData)).then(() => onClose());
    }
    dispatch(fetchAllPosts());
  };

  return (
    <div
      className="fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"
      onClick={onClose}
    >
      <div className="resource-form" onClick={(e) => e.stopPropagation()}>
        <h1 className="text-2xl font-semibold">Create New Resource Post</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="resource-form-container">
            <div className="resource-form-left">
              <div className="resource-form-single-input">
                <label className="resource-form-label">Resource Title</label>
                <input
                  className="resource-form-input"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="resource-form-double-input">
                <div>
                  <label className="resource-form-label">Category</label>
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
                <div>
                  <label className="resource-form-label">Condition</label>
                  <select
                    className="resource-form-input"
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="new">New</option>
                    <option value="used">Used</option>
                    <option value="surplus">Surplus</option>
                    <option value="expired">Date Expired</option>
                  </select>
                </div>
              </div>
              <div className="resource-form-single-input">
                <label className="resource-form-label">Description</label>
                <textarea
                  className="resource-form-input"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  cols="30"
                  rows="3"
                />
              </div>
              <div className="resource-form-double-input">
                <div>
                  <label className="resource-form-label">Available Quantity</label>
                  <input
                    className="resource-form-input"
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="resource-form-label">Price</label>
                  <input
                    className="resource-form-input"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="resource-form-double-input">
                <div>
                  <label className="resource-form-label">Pickup Availability</label>
                  <input
                    type="date"
                    className="resource-form-input"
                    name="pickup.date"
                    value={formData.pickup.date}
                    onChange={handleChange}
                  />
                  <input
                    type="time"
                    className="resource-form-input"
                    name="pickup.time"
                    value={formData.pickup.time}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="resource-form-label">Delivery Options</label>
                  <input
                    className="resource-form-input"
                    type="text"
                    name="delivery"
                    value={formData.delivery}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="resource-form-single-input">
                <label className="resource-form-label">Impact Info</label>
                <textarea
                  className="resource-form-input"
                  name="impactinfo"
                  value={formData.impactinfo}
                  onChange={handleChange}
                  cols="30"
                  rows="3"
                />
              </div>
            </div>
            <div className="vertical-line"></div>
            <div className="resource-form-right">
              <div>
                <div className="resource-form-single-input">
                  <label className="resource-form-label">Upload Image</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    name="images"
                    onChange={handleFileChange}
                  />
                </div>
                <br />
                <p className="text-[14px]">Address</p>
                <div className="resource-form-double-input">
                  <input
                    className="resource-form-input"
                    type="text"
                    name="location.street"
                    placeholder="Street"
                    value={formData.location.street}
                    onChange={handleChange}
                  />
                  <input
                    className="resource-form-input"
                    type="text"
                    name="location.city"
                    placeholder="City"
                    value={formData.location.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="resource-form-double-input">
                  <input
                    className="resource-form-input"
                    type="text"
                    name="location.state"
                    placeholder="State"
                    value={formData.location.state}
                    onChange={handleChange}
                  />
                  <input
                    className="resource-form-input"
                    type="text"
                    name="location.zip"
                    placeholder="Zip"
                    value={formData.location.zip}
                    onChange={handleChange}
                  />
                </div>
                <input
                  className="resource-form-input"
                  type="text"
                  name="location.country"
                  placeholder="Country"
                  value={formData.location.country}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-5 justify-end mt-10">
                <Button variant="red" size="sm" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="cyan" size="sm" type="submit">
                  {data ? "Update" : "Submit"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResourceForm;