import prisma from "../lib/prisma.js";

export const createBid = async (bidData) => {
  return await prisma.bid.create({ data: bidData });
};

export const getBidById = async (bidId) => {
  return await prisma.bid.findUnique({ where: { bid_id: bidId } });
};

export const getBidsByEvent = async (eventId) => {
  return await prisma.bid.findMany({ where: { event_id: eventId } });
};

export const updateBid = async (bidId, bidData) => {
  return await prisma.bid.update({
    where: { bid_id: bidId },
    data: bidData,
  });
};

export const deleteBid = async (bidId) => {
  return await prisma.bid.delete({ where: { bid_id: bidId } });
};
