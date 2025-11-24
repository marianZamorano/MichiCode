import { Request, Response } from 'express';
import QRCode from 'qrcode';
import { shortenUrl, getAllUrls, getUrlByCode } from '../services/urlService.js';

export const shorten = async (req: Request, res: Response) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) return res.status(400).json({ message: 'URL requerida' });

    const url = await shortenUrl(originalUrl.trim());
    return res.status(201).json(url);
  } catch (error: any) {
    return res.status(400).json({ message: error.message || 'Error al acortar' });
  }
};

export const getAll = async (_: Request, res: Response) => {
  try {
    const urls = await getAllUrls();
    return res.json(urls);
  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Error listando' });
  }
};

export const redirect = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const url = await getUrlByCode(code);

    if (!url) return res.status(404).json({ message: 'URL no encontrada' });

    return res.redirect(301, url.original_url);
  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Error redirigiendo' });
  }
};

export const generateQR = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const size = parseInt(req.query.size as string) || 300;
    const download = req.query.download === '1';

    const urlRecord = await getUrlByCode(code);
    if (!urlRecord) return res.status(404).json({ message: 'URL no encontrada' });

    const shortUrl = urlRecord.short_url;
    const qrBuffer = await QRCode.toBuffer(shortUrl, {
      width: size,
      margin: 2,
      color: { dark: '#000000', light: '#FFFFFF' },
    });

    if (download) {
      res.set({
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="qr-${code}.png"`,
      });
    } else {
      res.set('Content-Type', 'image/png');
    }

    return res.send(qrBuffer);
  } catch (_error: any) {
    return res.status(500).json({ message: 'Error generando QR' });
  }
};