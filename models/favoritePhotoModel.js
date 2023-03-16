import mongoose from "mongoose";

const { Schema } = mongoose;

// corrected the spelling
const favoritePhotoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
});

const FavoritePhoto = mongoose.model("FavoritePhoto", favoritePhotoSchema);

export default FavoritePhoto;
