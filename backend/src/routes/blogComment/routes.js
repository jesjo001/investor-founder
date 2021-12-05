import express from 'express';
const CommentRouter = express.Router();

import { approveComment } from '../../controllers/v1/comment/approveComment'
import { addComment } from '../../controllers/v1/comment/comment'
import { deleteComment } from '../../controllers/v1/comment/deleteComment'

import { protect } from '../../middlewares/authentication/auth';

//protected route
CommentRouter.use(protect)
CommentRouter.post( '/create' , addComment)
CommentRouter.post( '/delete/:id' , deleteComment)
CommentRouter.post( '/approve/:id' , approveComment)

export default CommentRouter