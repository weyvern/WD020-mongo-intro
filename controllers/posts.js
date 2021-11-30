import asyncHandler from '../middlewares/asyncHandler.js';

export const getAllPosts = asyncHandler(async (req, res, next) => res.send('GET all'));

export const createPost = asyncHandler(async (req, res) => res.send('POST'));

export const getSinglePost = asyncHandler(async (req, res) => res.send('GET single'));

export const updatePost = asyncHandler(async (req, res) => res.send('PUT'));

export const deletePost = asyncHandler(async (req, res) => res.send('DELETE'));
