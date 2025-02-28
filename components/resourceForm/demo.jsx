import React, { useState } from "react";
import "./ResourceForm.css";
import Button from "../button/Button";
import { useAppDispatch } from "@/redux/hooks";
import { createPost } from "@/redux/features/postsSlice";

function ResourceForm({ onClose }) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    title: "",
    category_id: "",
    condition: "",
    delivery: "",
    description: "",
    event_id: "",
    images: [],
    impactinfo: "",
    isRequest: false,
    location: { city: "", country: "", state: "", street: "", zip: "" },
    pickup: { date: "", time: "" },
    price: 0,
    quantity: 0,
    status: "available",
    user_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(value); // Debugging to check input values

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
    console.log("Submitting form:", formData);
    // dispatch(createPost(formData)).then(() => onClose());
  };

  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center" onClick={onClose}>
      <div className="resource-form" onClick={(e) => e.stopPropagation()}>
        <h1 className="text-2xl font-semibold">Create New Resource Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="resource-form-container">
            <div className="resource-form-left">
              <div className="resource-form-single-input">
                <label className="resource-form-label">Resource Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} />
              </div>
              <div className="resource-form-double-input">
                <div>
                  <label className="resource-form-label">Category</label>
                  <select name="category_id" value={formData.category_id} onChange={handleChange}>
                    <option value="">Select</option>
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
                  <select name="condition" value={formData.condition} onChange={handleChange}>
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
                <textarea name="description" value={formData.description} onChange={handleChange} cols="30" rows="3" />
              </div>
              <div className="resource-form-double-input">
                <div>
                  <label className="resource-form-label">Quantity</label>
                  <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
                </div>
                <div>
                  <label className="resource-form-label">Price</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} />
                </div>
              </div>
              <div className="resource-form-double-input">
                <div>
                  <label className="resource-form-label">Pickup Date</label>
                  <input type="date" name="pickup.date" value={formData.pickup.date} onChange={handleChange} />
                </div>
                <div>
                  <label className="resource-form-label">Pickup Time</label>
                  <input type="time" name="pickup.time" value={formData.pickup.time} onChange={handleChange} />
                </div>
              </div>
              <div className="resource-form-single-input">
                <label className="resource-form-label">Impact Info</label>
                <textarea name="impactinfo" value={formData.impactinfo} onChange={handleChange} cols="30" rows="3" />
              </div>
            </div>

            <div className="vertical-line"></div>

            <div className="resource-form-right">
              <div>
                <p className="text-[14px]">Address</p>
                <div className="resource-form-double-input">
                  <input type="text" name="location.street" placeholder="Street" value={formData.location.street} onChange={handleChange} />
                  <input type="text" name="location.city" placeholder="City" value={formData.location.city} onChange={handleChange} />
                </div>
                <div className="resource-form-double-input">
                  <input type="text" name="location.state" placeholder="State" value={formData.location.state} onChange={handleChange} />
                  <input type="text" name="location.zip" placeholder="Zip" value={formData.location.zip} onChange={handleChange} />
                </div>
                <input type="text" name="location.country" placeholder="Country" value={formData.location.country} onChange={handleChange} />
              </div>

              <div className="flex gap-5 justify-end mt-10">
                <Button variant="red" size="sm" onClick={onClose}>Cancel</Button>
                <Button variant="cyan" size="sm" type="submit">Submit</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResourceForm;
