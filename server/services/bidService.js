import prisma from "../lib/prisma.js";

export const createBid = async (bidData) => {
  return await prisma.bid.create({ data: bidData });
};

export const getBidById = async (bidId) => {
  bidId = parseInt(bidId, 10);
  return await prisma.bid.findUnique({ where: { bid_id: bidId } });
};

export const getBidsByEvent = async (eventId) => {
  eventId = parseInt(eventId, 10);
  return await prisma.bid.findMany({ where: { event_id: eventId } });
};

export const updateBid = async (bidId, bidData) => {
  bidId = parseInt(bidId, 10);
  const { id, ...validBidData } = bidData;

  return await prisma.bid.update({
    where: { bid_id: bidId },
    data: validBidData,
  });
};

export const deleteBid = async (bidId) => {
  bidId = parseInt(bidId, 10);
  return await prisma.bid.delete({ where: { bid_id: bidId } });
};
