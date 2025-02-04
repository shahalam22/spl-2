import * as eventService from "../services/eventService.js";
import catchAsync from "../utils/catchAsync.js";

export const createEvent = catchAsync(async (req, res) => {
  const event = await eventService.createEvent({ ...req.body, user_id: req.user.user_id });
  res.status(201).json({ success: true, data: event });
});

export const getEvent = catchAsync(async (req, res) => {
  const event = await eventService.getEventById(req.params.id);
  res.status(200).json({ success: true, data: event });
});

export const getAllEvents = catchAsync(async (req, res) => {
  const events = await eventService.getAllEvents();
  res.status(200).json({ success: true, data: events });
});

// Update event operation restricted to the creator of the event
export const updateEvent = catchAsync(async (req, res) => {
  const event = await eventService.getEventById(req.params.id);

  if (!event || event.user_id !== req.user.user_id) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to update this event",
    });
  }

  const updatedEvent = await eventService.updateEvent(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Event updated successfully",
    data: updatedEvent,
  });
});

// Delete event operation restricted to the creator of the event
export const deleteEvent = catchAsync(async (req, res) => {
  const event = await eventService.getEventById(req.params.id);

  if (!event || event.user_id !== req.user.user_id) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to delete this event",
    });
  }

  await eventService.deleteEvent(req.params.id);

  res.status(200).json({
    success: true,
    message: "Event deleted successfully",
  });
});
