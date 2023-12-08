import { Router } from "express";
import { getComments } from "../controllers/commentsControllers";

const router = Router();

router.get('/', getComments)

export default router;