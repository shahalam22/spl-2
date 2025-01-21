import prisma from "../lib/prisma.js";

export const createEvent = async (eventData) => {
  return await prisma.event.create({ data: eventData });
};

export const getEventById = async (eventId) => {
  eventId = parseInt(eventId, 10);
  return await prisma.event.findUnique({ where: { event_id: eventId } });
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
