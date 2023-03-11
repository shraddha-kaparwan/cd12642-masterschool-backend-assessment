//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
// const asyncHandler = require("express-async-handler");

import asyncHandler from "express-async-handler";
import FavoritePhoto from "../models/favoritePhotoModel.js";

import dotenv from "dotenv";
dotenv.config;

const access_key = process.env.UNSPLASH_ACCESS_KEY;
const per_page = 5;
const order_by = "latest";

export const getFavoritePhoto = asyncHandler(async (req, res) => {
  const photos = await FavoritePhoto.find({ user: req.user.id });
  res.json(photos);
});

export const addFavoritePhoto = asyncHandler(async (req, res) => {
  const { url, description, username, explaination } = req.body;
  const photo = await FavoritePhoto.create({
    user: req.user.id,
    username,
    url,
    description,
    explaination,
  });
  res.status(201).json(photo);
});

export const editFavoritePhoto = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { explaination } = req.body;
  const photo = await FavoritePhoto.findById(id);
  if (!photo) {
    res.status(404).json({ message: "Photo not found" });
    return;
  }
  if (photo.user.toString() !== req.user.id) {
    res
      .status(401)
      .json({ message: "You do not have permission to edit this photo" });
    return;
  }
  photo.explaination = explaination;
  await photo.save();
  res.json(photo);
});

export const deleteFavoritePhoto = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const photo = await FavoritePhoto.findById(id);
  if (!photo) {
    res.status(404).json({ message: "Photo not found" });
    return;
  }
  if (photo.user.toString() !== req.user.id) {
    res.status(401).json({ message: "Unauthorized action!" });
    return;
  }
  await photo.remove();
  res.json({ message: "Photo has been deleted." });
});
