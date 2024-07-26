import express from 'express';
import {verifyToken}from '../utils/verifyUser.js';
import {createComment, deleteComment, editComment, getPostComments, likeComment}  from '../controller/comment.controller.js'


const router = express.Router();

router.post('/createcomment', verifyToken ,  createComment);
router.get('/getpostcomments/:postId' , getPostComments );
router.put('/likecomment/:commentId' , verifyToken , likeComment);
router.put('/editcomment/:commentId' , verifyToken , editComment);
router.delete('/deletecomment/:commentId' , verifyToken , deleteComment);

export default router;