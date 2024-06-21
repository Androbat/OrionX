import express from 'express';
import { createCustomerData, getCustomersData } from '../controllers/customerController';
const router = express.Router();

router.get('/', getCustomersData);
router.post('/', createCustomerData);


export default router;