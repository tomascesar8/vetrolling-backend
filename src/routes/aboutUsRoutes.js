import { Router } from "express";
import { getAboutUs } from "../controllers/aboutUsControllers";

const router = Router();

router.get('/', getAboutUs)

export default router;