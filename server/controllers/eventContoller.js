import * as eventService from "../services/eventService.js";
import catchAsync from "../utils/catchAsync.js";

export const createEvent = catchAsync(async (req, res) => {
  const {
    title,
    description,
    status,
    date,
    startTime,
    endTime,
    timezone,
    max_participant,
    location,
    image, // This might be an empty string; we'll ignore it in favor of req.files
    ...rest
  } = req.body;

  // Validate required fields
  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "Title and description are required",
    });
  }

  // Parse the location field if it exists (already an object from FormData)
  const parsedLocation = location ? JSON.parse(location) : null;

  // Convert max_participant to integer
  const maxParticipant = parseInt(max_participant, 10);
  if (isNaN(maxParticipant)) {
    return res.status(400).json({
      success: false,
      message: "Invalid max_participant value; must be a number",
    });
  }

  // Ensure the date is valid
  const eventDate = new Date(date);
  if (isNaN(eventDate.getTime())) {
    return res.status(400).json({
      success: false,
      message: "Invalid date format",
    });
  }

  // Combine the date with startTime and endTime to create full ISO-8601 DateTime strings
  const [startHours, startMinutes] = startTime.split(":");
  const [endHours, endMinutes] = endTime.split(":");

  const startDateTime = new Date(eventDate);
  startDateTime.setHours(parseInt(startHours, 10), parseInt(startMinutes, 10), 0, 0);

  const endDateTime = new Date(eventDate);
  endDateTime.setHours(parseInt(endHours, 10), parseInt(endMinutes, 10), 0, 0);

  // Construct the event data with properly formatted fields
  const eventData = {
    title,
    description,
    status: status || "upcoming",
    date: eventDate.toISOString(),
    startTime: startDateTime.toISOString(),
    endTime: endDateTime.toISOString(),
    timezone: timezone || "UTC",
    max_participant: maxParticipant,
    image: req.files && req.files.length > 0 ? `/uploads/${req.files[0].filename}` : null,
    location: parsedLocation,
    user_id: req.user.user_id,
  };

  // console.log("Parsed Event Data for Prisma:", eventData);

  const event = await eventService.createEvent( eventData );
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
  const eventData = req.body;
  Object.assign(event, eventData);

  if (!event || event.user_id !== req.user.user_id) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to update this event",
    });
  }
  
  // Combine the date with startTime and endTime to create full ISO-8601 DateTime strings
  const [startHours, startMinutes] = event.startTime.split(":");
  const [endHours, endMinutes] = event.endTime.split(":");

  const startDateTime = new Date(event.date);
  startDateTime.setHours(parseInt(startHours, 10), parseInt(startMinutes, 10), 0, 0);
  event.startTime = startDateTime.toISOString();

  const endDateTime = new Date(event.date);
  endDateTime.setHours(parseInt(endHours, 10), parseInt(endMinutes, 10), 0, 0);
  event.endTime = endDateTime.toISOString();

  event.date = new Date(event.date).toISOString();

  // console.log("normal date to ISO date time", event);

  const updatedEvent = await eventService.updateEvent(req.params.id, event);

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
