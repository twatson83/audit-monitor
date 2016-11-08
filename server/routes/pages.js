import express from 'express';
import React from 'react'
import {getAuditPage} from '../controllers/pages/audit';
import {getErrorsPage} from '../controllers/pages/errors';
import {getEndpointsPage} from '../controllers/pages/endpoints';
import {getDashboard} from '../controllers/pages/dashboard';

const router = express.Router();

router.get('', getDashboard);
router.get('/dashboard', getDashboard);
router.get('/audit', getAuditPage);
router.post('/audit', getAuditPage);
router.get('/errors', getErrorsPage);
router.post('/errors', getErrorsPage);
router.get('/endpoints', getEndpointsPage);
router.post('/endpoints', getEndpointsPage);


module.exports = router;