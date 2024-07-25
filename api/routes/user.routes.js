import express from 'express' 
import { test , updateUser , deleteUser , signout, getUser} from '../controller/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import {getUsers} from '../controller/user.controller.js'

const router = express.Router();

router.get('/test' , test);
router.put('/update/:userId', verifyToken , updateUser); 
router.delete('/delete/:userId', verifyToken , deleteUser);
router.post('/signout' , signout);
router.get('/getusers' , verifyToken , getUsers);
router.get('/:userId' , getUser);


export default router;