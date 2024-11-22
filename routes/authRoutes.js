import {Router} from 'express'
const router = Router();
import { register, login,logout } from '../controllers/userController.js';
import { validateRegisterInput } from '../middleware/validationMiddleware.js'
import { validateLoginInput } from '../middleware/validationMiddleware.js'
router.post('/register',validateRegisterInput,register)
router.post('/login', validateLoginInput,login)
router.get('/logout',logout)


export default router;