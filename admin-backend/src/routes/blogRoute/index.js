import express from 'express';
import { protect } from '../../middlewares/authentication/auth'
import { createBlog } from '../../controllers/blog/createBlog'
import { approveBlog } from '../../controllers/blog/approveBlogs'
import { deleteBlog } from '../../controllers/blog/deleteBlog'
import { getBlog } from '../../controllers/blog/getBlogs'
import { getUnapprovedBlogs } from '../../controllers/blog/getUnapprovedBlogs'

const BlogRouter = express.Router();

BlogRouter.get('/getblogs', getBlog);
BlogRouter.get('/getUnapprovedBlogs', getUnapprovedBlogs);
BlogRouter.use(protect)
BlogRouter.post('/create', createBlog);
BlogRouter.post('/approve/:id', approveBlog);
BlogRouter.delete('/delete/:id', deleteBlog);

export default BlogRouter;
