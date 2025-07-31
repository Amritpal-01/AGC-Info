/** @format */

import mongoose, { model, Schema } from "mongoose";


export const CollectionSchema = new Schema({
    course : String,
    year : Number,
    subject : String,
    type : String,
    title : String,
    items : [String],
    created_at: Date,
    id : String
})

const Collection = mongoose.models.Collection || model("Collection", CollectionSchema);

export default Collection;