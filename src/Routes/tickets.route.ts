import { Router } from 'express';
import { bookTicket } from '../Controller/Tickets.controller';

const router = Router();

router.post('/book',bookTicket);

export default router;