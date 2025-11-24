import { UrlModel } from '../models/urlModel.js';
import { generateShortCode } from '../utils/generateShortCode.js';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

function isValidHttpUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:'; 
  } catch {
    return false;
  }
}

export const shortenUrl = async (originalUrl: string) => {
  const clean = originalUrl.trim();
  if (!isValidHttpUrl(clean)) {
    throw new Error('URL inválida');
  }

  let shortCode = '';
  let exists = true;

  while (exists) {
    shortCode = generateShortCode();
    const found = await UrlModel.findOne({ short_code: shortCode }).lean();
    exists = !!found;
  }

  const shortUrl = `${BASE_URL}/${shortCode}`;

  const doc = await UrlModel.create({
    short_code: shortCode,
    original_url: clean,
    short_url: shortUrl,
  });

  return {
    shortCode: doc.short_code,
    originalUrl: doc.original_url,
    shortUrl: doc.short_url,
    clicks: doc.clicks,
    createdAt: doc.created_at,
  };
};

export const getAllUrls = async () => {
  return await UrlModel.find().sort({ created_at: -1 }).lean();
};

export const getUrlByCode = async (code: string) => {
  return await UrlModel.findOne({ short_code: code }).lean();
};
