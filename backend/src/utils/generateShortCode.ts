const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const LENGTH = 6;

export const generateShortCode = (): string => {
  let result = '';
  for (let i = 0; i < LENGTH; i++) {
    result += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return result;
};