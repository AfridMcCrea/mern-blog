import express from 'express';
import {verifyToken}from '../utils/verifyUser.js';
import {createComment}  from '../controller/comment.controller.js'


const router = express.Router();

router.post('/createcomment', verifyToken ,  createComment);

export default router;