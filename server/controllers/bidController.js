import * as bidService from "../services/bidService.js";
import catchAsync from "../utils/catchAsync.js";

export const createBid = catchAsync(async (req, res) => {
  const bid = await bidService.createBid({ ...req.body, user_id: req.user.user_id });
  res.status(201).json({ success: true, data: bid });
});

export const getBid = catchAsync(async (req, res) => {
  const bid = await bidService.getBidById(req.params.id);
  res.status(200).json({ success: true, data: bid });
});

export const getBidsByEvent = catchAsync(async (req, res) => {
  const bids = await bidService.getBidsByEvent(req.params.eventId);
  res.status(200).json({ success: true, data: bids });
});

export const updateBid = catchAsync(async (req, res) => {
  const bid = await bidService.updateBid(req.params.id, req.body);
  res.status(200).json({ success: true, data: bid });
});

export const deleteBid = catchAsync(async (req, res) => {
  await bidService.deleteBid(req.params.id);
  res.status(204).json({ success: true });
});
