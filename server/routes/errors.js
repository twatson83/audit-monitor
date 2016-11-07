import express from 'express';
import { getErrors, getError} from '../controllers/errors';

var router = express.Router();

router.get('/', getErrors);
router.get('/:id', getError);

module.exports = router;