import { Router } from 'express';
const router = Router();

import { authController } from '../controllers';
import { authValidation } from '../validations';
import { isUserAuth } from '../middlewares';

router.post('/register', authValidation.register, authController.register);

router.post('/verify-email', authController.verifyEmail);

router.post('/login', authController.login);

router.get('/password-reset/:email', authController.passwordResetEmail);

router.get('/password-reset-check/:id/:token', authController.passwordResetCheck);

router.patch('/password-reset', authValidation.passwordReset, authController.passwordReset);

router.get('/password-check/:password', isUserAuth, authController.passwordCheck);

router.get('/get-info', isUserAuth, authController.getInfo);

router.put('/update-info', isUserAuth, authValidation.updateInfo, authController.updateInfo);

router.patch('/update-password', isUserAuth, authValidation.updatePassword, authController.updatePassword);

export default router;
