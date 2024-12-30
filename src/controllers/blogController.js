import Blog from "../models/blogModel.js";

export const getBlog = async(req, res) => {
    try {
        const blog = await Blog.find({});
        res.status(200).json({
            success: true,
            message: "Blog Get Successfully",
            blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error,
        });
    }
}

export const createBlog = async(req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(200).json({
            success: true,
            message: "Blog Created Successfully",
            blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error,
        });
    }   
}

export const updateBlog = async(req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({
            success: true,
            message: "Blog Updated Successfully",
            blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error,
        });
    }
}

export const deleteBlog = async(req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Blog Deleted Successfully",
            blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error,
        });
    }
}

export const getBlogById = async(req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.status(200).json({
            success: true,
            message: "Blog Get Successfully",
            blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error,
        });
    }
}