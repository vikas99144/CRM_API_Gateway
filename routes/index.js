'use strict';

import { Router } from 'express';
import usersRoutes from './admin/users.routes.js';

const router = Router();
router.use('/admin/users', usersRoutes);

export default router;
