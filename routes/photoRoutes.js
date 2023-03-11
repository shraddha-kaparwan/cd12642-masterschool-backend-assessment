import express from "express";

const router = express.Router();

import {
  getPhotoRoutes,
  getPhotoByIdRoute,
  getPhotoByUserRoute,
} from "../controllers/photoController.js";

router.route("/").get(getPhotoRoutes);
router.route("/:id").get(getPhotoByIdRoute);
router.route("/user/:username").get(getPhotoByUserRoute);

export default router;
