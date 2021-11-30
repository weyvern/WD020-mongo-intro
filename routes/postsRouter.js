import { Router } from 'express';
import { createPost, deletePost, getAllPosts, getSinglePost, updatePost } from '../controllers/posts.js';

const postsRouter = Router();

postsRouter.route('/').get(getAllPosts).post(createPost);

postsRouter.route('/:id').get(getSinglePost).put(updatePost).delete(deletePost);

export default postsRouter;
