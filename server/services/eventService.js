import prisma from "../lib/prisma.js";

export const createEvent = async (eventData) => {
  return await prisma.event.create({ data: eventData });
};

export const getEventById = async (eventId) => {
  const parsedEventId = parseInt(eventId, 10);

  if (isNaN(parsedEventId)) {
    throw new Error("Invalid event ID: must be a valid integer");
  }

  return await prisma.event.findUnique({
    where: { event_id: parsedEventId },
  });
};


export const getAllEvents = async () => {
  return await prisma.event.findMany();
};


export const updateEvent = async (eventId, eventData) => {
  eventId = parseInt(eventId, 10);
  
  return await prisma.event.update({
    where: { event_id: eventId },
    data: eventData,
  });
};


export const deleteEvent = async (eventId) => {
  eventId = parseInt(eventId, 10);
  return await prisma.event.delete({ where: { event_id: eventId } });
};


export const registerForEvent = async (eventId, userId) => {
  eventId = parseInt(eventId, 10);
  userId = parseInt(userId, 10);

  // console.log("this reached at registerForEvent in eventService.js", eventId, userId);
  

  return await prisma.eventParticipant.create({
    data: {
      event_id: parseInt(eventId, 10),
      user_id: userId,
      joinedAt: new Date(),
    },
  });  
}


export const findEventParticipant = async (eventId, userId) => {
  eventId = parseInt(eventId, 10);
  userId = parseInt(userId, 10);

  return await prisma.eventParticipant.findUnique({
    where: {
      event_id_user_id: {
        event_id: eventId,
        user_id: userId,
      }
    },
  });
}


export const unregisterFromEvent = async (eventId, userId) => {
  eventId = parseInt(eventId, 10);
  userId = parseInt(userId, 10);

  return await prisma.eventParticipant.delete({
    where: {
      event_id_user_id: {
        event_id: eventId,
        user_id: userId,
      }
    },
  });
}


export const getEventParticipantsByUserId = async (userId) => {
  const parsedUserId = parseInt(userId, 10);
  
  return await prisma.eventParticipant.findMany({
    where: { user_id: parsedUserId },
    select: {
      id: true,
      event_id: true,
      user_id: true,
      joinedAt: true,
    },
  });
};

export const getEventParticipantsByEventId = async (eventId) => {
  const parsedEventId = parseInt(eventId, 10);
  
  return await prisma.eventParticipant.findMany({
    where: { event_id: parsedEventId },
    select: {
      id: true,
      event_id: true,
      user_id: true,
      joinedAt: true,
    },
  });
}

export const getProductsByEventId = async (eventId) => {
  const parsedEventId = parseInt(eventId, 10);
  
  return await prisma.product.findMany({
    where: { event_id: parsedEventId },
  });
}