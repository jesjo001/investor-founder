import express from 'express';
const BlogRouter = express.Router();
import { createBlog } from '../../controllers/v1/blog/createBlog';
import { updatePost } from '../../controllers/v1/blog/updatePost';
import { getBlogs } from '../../controllers/v1/blog/getBlogs';
import { getBlogsById } from '../../controllers/v1/blog/getBlogById';
import { protect } from '../../middlewares/authentication/auth';

BlogRouter.use(protect);
BlogRouter.post('/create-blog', createBlog);
BlogRouter.get('/get-blogs', getBlogs);
BlogRouter.get('/get-blogs/:id', getBlogsById);
BlogRouter.post('/update-blog/:id', updatePost );

export default BlogRouter;