import express from 'express';

const router = express.Router();

import {
    getPhotoRoutes,
    getPhotoByIdRoute,
} from '../controllers/photoController.js';

router.route('/').get(getPhotoRoutes);
router.route('/:id').get(getPhotoByIdRoute);

export default router;