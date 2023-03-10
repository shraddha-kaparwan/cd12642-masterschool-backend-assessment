//Require axios to make API calls
// const axios = require("axios");

import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const access_key = process.env.UNSPLASH_ACCESS_KEY;

const per_page = 5;
const order_by = 'latest';

export const getPhotoRoutes = async (req, res) => {
    try {
        const {data} = await axios.get(
            `https://api.unsplash.com/photos?client_id=${access_key}&per_page=${per_page}&order_by=${order_by}`
        );

        const photo_arr = data.map((photo) => photo.urls.raw);
        res.status(200).json(photo_arr);
    } catch(error) {
        res.status(500).json({ messag: 'Server error. Please try again later.'});
    }
};

export const getPhotoByIdRoute = async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.unsplash.com/photos/${req.params.id}?client_id=${access_key}`
        );
        const data = response.data;

        res.status(200).json(data);
    } catch(error) {
        res.status(500).json({ message: 'Server error. Please try again later.'});
    }
};

