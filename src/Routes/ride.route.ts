import { Router } from 'express';
import { addRide, getRideDetails } from '../Controller/Ride.controller';

const router = Router();

router.post('/add',addRide);
router.get('/details', getRideDetails);

export default router;