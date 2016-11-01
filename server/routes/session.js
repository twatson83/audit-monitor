import express from 'express';
import { getSessionMessages } from '../controllers/messages';

var router = express.Router();

router.get('/:sessionId', getSessionMessages);

module.exports = router;