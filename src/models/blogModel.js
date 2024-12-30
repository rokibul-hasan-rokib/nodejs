import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Blog', blogSchema);