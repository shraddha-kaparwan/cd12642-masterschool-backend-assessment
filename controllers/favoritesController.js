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

// replaced hard-coded value with request params
export const addFavoritePhoto = asyncHandler(async (req, res) => {
  const { url, description, username, explanation } = req.body;
  const photo = await FavoritePhoto.create({
    user: req.user.id,
    username,
    url,
    description,
    explanation,
  });
  res.status(201).json(photo);
});

// removed the code that checks using id. Finding and updating the photo using just userId as stated in schema
export const editFavoritePhoto = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { explanation } = req.body;
  const photo = await FavoritePhoto.find({ user: id });
  if (!photo) {
    res.status(404).json({ message: "Photo not found" });
    return;
  }
  photo.explanation = explanation;
  await photo.save();
  res.json(photo);
});

// replaced the id to userId to find the photo and deleting it
export const deleteFavoritePhoto = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const photo = await FavoritePhoto.find({ user: id });
  if (!photo) {
    res.status(404).json({ message: "Photo not found" });
    return;
  }
  await photo.remove();
  res.json({ message: "Photo has been deleted." });
});
