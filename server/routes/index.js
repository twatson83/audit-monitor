import express from 'express';
let router = express.Router();

router.use('/messages', require('./messages'));
router.get("/", (req, res) => res.sendFile(process.cwd() + '/server/views/index.html'));

export default router;