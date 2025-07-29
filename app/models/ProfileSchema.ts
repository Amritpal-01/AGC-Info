/** @format */

import mongoose, { model, Schema } from "mongoose";

const ProfileSchema = new Schema({
    id: String,
    name: String,
    email: String,
    image: String
})

const Profile = mongoose.models.Profile || model("Profile", ProfileSchema);

export default Profile;