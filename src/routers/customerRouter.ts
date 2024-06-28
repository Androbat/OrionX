import express from 'express';
import { createCustomerData, deleteAddressById, getCustomersData, updateCustomerData } from '../controllers/customerController';
const router = express.Router();

router.post('/', createCustomerData);
router.get('/', getCustomersData);
router.put('/:id', updateCustomerData);
router.delete('/:addressId', deleteAddressById);

export default router;