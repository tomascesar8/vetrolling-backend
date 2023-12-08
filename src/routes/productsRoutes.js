import { Router } from "express";
import { getProducts } from "../controllers/productsControllers";

const router = Router();

router.get('/', getProducts)

export default router;