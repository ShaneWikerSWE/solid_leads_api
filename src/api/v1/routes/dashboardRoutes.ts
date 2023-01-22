import { Router } from 'express';
const router = Router();

import { dashboardController } from '../controllers';
import { isUserAuth } from '../middlewares';

router.get('/main-info', isUserAuth, dashboardController.mainInfo);

export default router;
