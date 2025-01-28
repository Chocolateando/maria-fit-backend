import * as bcrypt from 'bcrypt';

const SALT_OR_ROUNDS = 10;

export const HashText = async (text: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_OR_ROUNDS);
  return await bcrypt.hash(text, salt);
};

export const CompareHash = async (
  text: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(text, hash);
};

export const SanitizeEmail = (email: string): string => {
  if (!isValidEmail(email)) {
    return '';
  }
  return email.trim().toLowerCase();
};

export const isValidEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
