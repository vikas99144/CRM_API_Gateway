'use strict';

import express from 'express';
import companyClient from '../grpc/company.client.js';

const router = express.Router();

router.get('/:id', (req, res) => {
  companyClient.GetCompany({ id: req.params.id }, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response);
  });
});

export default router;
