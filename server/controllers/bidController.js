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

// Update bid operation restricted to the creator of the bid
export const updateBid = catchAsync(async (req, res) => {
  const bid = await bidService.getBidById(req.params.id);

  if (!bid || bid.user_id !== req.user.user_id) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to update this bid",
    });
  }

  const updatedBid = await bidService.updateBid(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Bid updated successfully",
    data: updatedBid,
  });
});

// Delete bid operation restricted to the creator of the bid
export const deleteBid = catchAsync(async (req, res) => {
  const bid = await bidService.getBidById(req.params.id);

  if (!bid || bid.user_id !== req.user.user_id) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to delete this bid",
    });
  }

  await bidService.deleteBid(req.params.id);

  res.status(200).json({
    success: true,
    message: "Bid deleted successfully",
  });
});
