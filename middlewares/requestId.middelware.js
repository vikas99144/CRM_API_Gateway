'use strict';

import crypto from 'crypto';

export const attachRequestId = (req, res, next) => {
  req.requestId = crypto.randomUUID();
  res.setHeader('x-request-id', req.requestId);
  next();
};
