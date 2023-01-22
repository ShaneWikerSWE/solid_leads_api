import { Router } from 'express';
const router = Router();

import { paymentController } from '../controllers';
import { isUserAuth } from '../middlewares';

router.post('/budget', isUserAuth, paymentController.payBudget);

router.get('/payment-info', isUserAuth, paymentController.getPaymentInfo);

export default router;
