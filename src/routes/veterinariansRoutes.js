import { Router } from "express";
import { getVeterinarians } from "../controllers/veterinariansControllers";

const router = Router();

router.get('/', getVeterinarians)

export default router;