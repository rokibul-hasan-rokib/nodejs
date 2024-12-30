import express from "express";
import blogController from "../controller/blogController.js";

const router = express.Router();

router.get('/blog', blogController.getBlog);
router.get('/blog/:id', blogController.getBlogById);
router.post('/blog', blogController.createBlog);
router.put('/blog/:id', blogController.updateBlog);
router.delete('/blog/:id', blogController.deleteBlog);

export default router;