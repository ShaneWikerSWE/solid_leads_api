import { Router } from 'express';
const router = Router();

import { budgetController } from '../controllers';
import { isUserAuth } from '../middlewares';

router.post('/add-budget', isUserAuth, budgetController.addBudget);

router.put('/update-budgets', isUserAuth, budgetController.updateBudgets);

router.get('/get-budgets', isUserAuth, budgetController.getBudgets);

export default router;
