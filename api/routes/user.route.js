import express from "express";
import { test, updateUser, getUserPostings, } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get('/test', test)
router.post('/update/:id',  updateUser)
router.get('/postings/:id', getUserPostings)

export default router;