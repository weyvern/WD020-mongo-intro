import db, { ObjectId } from '../db/client.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const postsCollection = await db.collection('posts');

export const getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await postsCollection.find().toArray();
  res.json(posts);
});

export const createPost = asyncHandler(async (req, res) => {
  const {
    body: { title, body, author }
  } = req;
  if (!title || !body || !author) throw new ErrorResponse('Title, body and author are required fields', 400);
  const { acknowledged, insertedId } = await postsCollection.insertOne({
    title,
    body,
    author,
    likes: 0
  });
  if (acknowledged) {
    const post = await postsCollection.findOne({ _id: insertedId });
    res.status(201).json(post);
  } else {
    throw new ErrorResponse('Could not create new post');
  }
});

export const getSinglePost = asyncHandler(async (req, res) => {
  const {
    params: { id }
  } = req;
  const post = await postsCollection.findOne({ _id: ObjectId(id) });
  if (post) {
    res.json(post);
  } else {
    throw new ErrorResponse('Post not found', 404);
  }
});

export const updatePost = asyncHandler(async (req, res) => {
  const {
    body: { title, body, author },
    params: { id }
  } = req;
  if (!title || !body || !author) throw new ErrorResponse('Title, body and author are required fields', 400);
  const { value } = await postsCollection.findOneAndUpdate(
    { _id: ObjectId(id) },
    {
      $set: { title, body, author }
    },
    { new: true }
  );
  if (value) {
    res.json(value);
  } else {
    throw new ErrorResponse('Post not found, could not update', 404);
  }
});

export const deletePost = asyncHandler(async (req, res) => {
  const {
    params: { id }
  } = req;
  const { deletedCount } = await postsCollection.deleteOne({ _id: ObjectId(id) });
  if (deletedCount) {
    res.status(200).json({ message: `Successfully deleted ${deletedCount} post` });
  } else {
    throw new ErrorResponse('Could not delete');
  }
});
