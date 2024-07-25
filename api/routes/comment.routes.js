import express from 'express';
import {verifyToken}from '../utils/verifyUser.js';
import {createComment, getPostComments}  from '../controller/comment.controller.js'


const router = express.Router();

router.post('/createcomment', verifyToken ,  createComment);
router.get('/getpostcomments/:postId' , getPostComments );

export default router;