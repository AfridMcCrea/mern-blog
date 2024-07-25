import express from 'express';
import {verifyToken}from '../utils/verifyUser.js';
import {createComment, getPostComments, likeComment}  from '../controller/comment.controller.js'


const router = express.Router();

router.post('/createcomment', verifyToken ,  createComment);
router.get('/getpostcomments/:postId' , getPostComments );
router.put('/likecomment/:commentId' , verifyToken , likeComment);

export default router;