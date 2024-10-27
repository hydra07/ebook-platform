import { Router } from 'express';
import * as OrderController from '../controller/order.controller';

const router = Router();

// Route to get all orders
router.get('/', OrderController.getAllOrders);

// Route to update shipping status
router.put('/shipping-status/:id', OrderController.updateShippingStatus);

export default router;