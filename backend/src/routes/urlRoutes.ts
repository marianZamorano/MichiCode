import { Router } from 'express';
import { shorten, getAll, redirect, generateQR } from '../controllers/urlController.js';
import { saveQr, getQrHistory } from '../controllers/qrController.js'; 
import { trackClick } from '../middleware/trackClick.js';

const router = Router();

router.post('/shorten', shorten);
router.get('/urls', getAll);
router.get('/:code/qr', generateQR);
router.get('/:code', trackClick, redirect);

router.post('/qr/save', saveQr);
router.get('/qr/history', getQrHistory);

export default router;