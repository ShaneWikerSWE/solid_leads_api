import { Router } from 'express';
const router = Router();

import { webhookController } from '../controllers';

router.post('/stripe', webhookController.stripe);

export default router;
