
import crc32 from 'buffer-crc32';
import passwords from './data/passwords.json'

export function commonPassword(password: string) {
  let hash = crc32.unsigned(password.toLowerCase());
  return Boolean(~passwords.indexOf(hash));
}