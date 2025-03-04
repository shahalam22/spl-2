import * as eventService from "../services/eventService.js";
import * as userService from "../services/userService.js";
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

  // console.log("getAllEvents invoked in eventController.js", req.query.userId);
  
  const events = await eventService.getAllEvents();
  
  var participatedEvents = []

  if (req.query.userId) {
      const eventParticipants = await eventService.getEventParticipantsByUserId(req.query.userId);
      for(let i=0; i<eventParticipants.length; i++){
        const event = await eventService.getEventById(eventParticipants[i].event_id);
        participatedEvents.push(event);
      }
  }
  
  res.status(200).json({ success: true, data: {events:events, participatedEvents:participatedEvents} });
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


export const registerForEvent = catchAsync(async (req, res) => {
  const { eventId } = req.body;

  // Check if req.user exists
  if (!req.user || !req.user.user_id) {
    return res.status(401).json({
      success: false,
      message: "User not authenticated",
    });
  }

  const userId = req.user.user_id;

  // console.log("Reached registerForEvent in eventController.js", userId, eventId);

  // Validate eventId
  if (!eventId) {
    return res.status(400).json({
      success: false,
      message: "Event ID is required",
    });
  }

  const event = await eventService.getEventById(eventId);

  // console.log("Event Data from registerForEvent in eventController.js", event);
  

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }

  // const user = await prisma.user.findUnique({ where: { user_id: userId } });
  // if (!user) {
  //   return res.status(404).json({
  //     success: false,
  //     message: "User not found",
  //   });
  // }

  const user = await userService.getUserById(userId);

  // console.log("User Data from registerForEvent in eventController.js", user);
  
  // console.log("User ID from registerForEvent in eventController.js", userId, eventId);
  

  const existingParticipant = await eventService.findEventParticipant(eventId, userId);
  if (existingParticipant) {
    return res.status(400).json({
      success: false,
      message: "You are already registered for this event",
    });
  }

  // console.log("Existing Participant Data from registerForEvent in eventController.js", existingParticipant);
  

  const participant = await eventService.registerForEvent(eventId, userId);
  res.status(201).json({
    success: true,
    message: "Successfully registered for the event",
    data: participant,
  });
});


export const unregisterFromEvent = catchAsync(async (req, res) => {
  const { eventId } = req.body;

  // Check if req.user exists
  if (!req.user || !req.user.user_id) {
    return res.status(401).json({
      success: false,
      message: "User not authenticated",
    });
  }

  const userId = req.user.user_id;

  // Validate eventId
  if (!eventId) {
    return res.status(400).json({
      success: false,
      message: "Event ID is required",
    });
  }

  const event = await eventService.getEventById(eventId);
  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }

  const existingParticipant = await eventService.findEventParticipant(eventId, userId);
  if (!existingParticipant) {
    return res.status(400).json({
      success: false,
      message: "You are not registered for this event",
    });
  }

  await eventService.unregisterFromEvent(eventId, userId);

  res.status(200).json({
    success: true,
    message: "Successfully unregistered from the event",
  });
});


export const getAllOfCurrentEvent = catchAsync(async (req, res) => {
  const event = await eventService.getEventById(req.params.id);
  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }

  const participants = await eventService.getEventParticipantsByEventId(req.params.id);
  // const products = await eventService.getProductsByEventId(req.params.id);
  const products = [];

  var participantsData = [];
  for(let i=0; i<participants.length; i++){
    const user = await userService.getUserById(participants[i].user_id);
    participantsData.push(user);
  }

  res.status(200).json({ success: true, data: {event: event, participantsData: participantsData, productsData: products} });
});