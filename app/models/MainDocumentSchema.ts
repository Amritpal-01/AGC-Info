import { Schema, model } from 'mongoose';

// Schema for the nested hyperlinks
const hyperlinkSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
}, { _id: false });

// Schema for the nested videos
const videoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
}, { _id: false });

// Schema for the nested syllabus items
const syllabusSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
}, { _id: false });

// Schema for the 'blog' sub-document
const blogSchema = new Schema({
  id: { type: String, required: true, unique: true },
  thumbnail: {
    type: String,
    required: false,
    default: null,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  hyperlinks: {
    type: [hyperlinkSchema],
    required: false,
    default: null,
  },
  videos: {
    type: [videoSchema],
    required: false,
    default: null,
  },
  syllabus: {
    type: [syllabusSchema],
    required: false,
    default: null,
  },
}, { _id: false });



// Main schema for the document
const mainDocumentSchema = new Schema({
  id: { type: String, required: true, unique: true },
  blog: { type: blogSchema, required: true },
});

// Export the Mongoose model
const MainDocument = model('MainDocument', mainDocumentSchema);

export default MainDocument;