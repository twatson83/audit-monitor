import express from 'express';
let router = express.Router();

router.use('/api/errors', require('./errors'));
router.use('/api/messages', require('./messages'));
router.use('/api/session', require('./session'));
router.use('/api/endpoints', require('./endpoints'));
router.use('/', require('./pages'));

export default router;