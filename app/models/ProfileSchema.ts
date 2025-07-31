/** @format */

import mongoose, { model, Schema } from "mongoose";
import { CollectionSchema } from "./CollectionSchema";

const ProfileSchema = new Schema({
    id: String,
    name: String,
    email: String,
    image: String,
    collections : {
        type: [CollectionSchema], // Define it as an array of CollectionSchema
        default: []              
    }
})

const Profile = mongoose.models.Profile || model("Profile", ProfileSchema);

export default Profile;