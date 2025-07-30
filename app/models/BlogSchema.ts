/** @format */

import mongoose, { model, Schema } from "mongoose";

const metaData = new Schema({
    title : String,
    description : String,
    link : String
})


const BlogSchema = new Schema({
    id : String,
    thumbnail : String,
    title : String,
    description : String,
    hypelinks : [metaData],
    videos : [metaData],
    syllabus : [metaData],
})

const Blog = mongoose.models.Blog || model("Blog", BlogSchema);

export default Blog;