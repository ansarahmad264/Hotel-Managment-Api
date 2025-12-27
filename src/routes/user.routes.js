import express from 'express'
import { createUser, getAllUsers, loginUser } from '../controllers/user.controller.js'

const router = express.Router()

router.post('/register-user', createUser);
router.post('/login', loginUser);
router.get('/all-users', getAllUsers);


export default router;