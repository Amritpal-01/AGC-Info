/** @format */

import mongoose, { model, Schema } from "mongoose";


const CollectionSchema = new Schema({
    course : String,
    year : Number,
    subject : String,
    type : String,
    title : String,
    items : Array,
    id : String
})

const Collection = mongoose.models.Collection || model("Collection", CollectionSchema);

export default Collection;