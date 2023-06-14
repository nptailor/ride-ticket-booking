import { Router } from 'express';
import { addUser } from '../Controller/User.controller';

const router = Router();

router.post('/add',addUser);

export default router;