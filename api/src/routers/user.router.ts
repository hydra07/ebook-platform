import { Router } from 'express';
import { updateUserProfile } from '../controller/user.controller';

const router = Router();

router.put('/:id', updateUserProfile);

export default router;