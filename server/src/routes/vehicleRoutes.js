import { Router } from 'express';
import { createVehicle, deleteVehicle, getVehicle, listVehicles, summary, updateVehicle } from '../controllers/vehicleController.js';
const router = Router();
router.get('/stats/summary', summary);
router.route('/').get(listVehicles).post(createVehicle);
router.route('/:id').get(getVehicle).put(updateVehicle).delete(deleteVehicle);
export default router;
