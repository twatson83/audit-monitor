import express from 'express';
import { getMessages, getMessage} from '../controllers/messages';

var router = express.Router();

router.get('/', getMessages);
router.get('/:id', getMessage);

module.exports = router;