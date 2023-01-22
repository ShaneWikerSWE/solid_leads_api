import { Router } from 'express';
const router = Router();

import { marketController } from '../controllers';
import { isUserAuth } from '../middlewares';

router.get('/search', isUserAuth, marketController.marketSearch);

export default router;
