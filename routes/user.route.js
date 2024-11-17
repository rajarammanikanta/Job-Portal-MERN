import express from 'express'
import { login, Logout, register, UpdateProfile } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router=express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(Logout);
router.route("/profile/update").post(isAuthenticated,UpdateProfile);



export default router;
