import { Router } from 'express';
const router = Router();

import {
    getAllJobs,getJob,
    createJob,updateJob,deleteJob
} from '../controllers/jobController.js'
import {validateJobInput } from '../middleware/validationMiddleware.js'
import { validateIdParams } from '../middleware/validationMiddleware.js';

router.get('/',getAllJobs)
router.get('/:id',validateIdParams,getJob)
router.post('/', validateJobInput,createJob)
router.patch('/:id',validateJobInput,validateIdParams,updateJob)
router.delete('/:id',validateIdParams,deleteJob)


export default router;
