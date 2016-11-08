import express from 'express';
import { getEndpoints } from '../controllers/api/endpoints';

var router = express.Router();

router.get('/', getEndpoints);

module.exports = router;