
'use strict';

import express from 'express';
import grpcCall from '../../grpc/call/admin/auth.call.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/:id', verifyJWT, grpcCall.auth);

export default router;
