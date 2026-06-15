import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';

const usersFile = path.join(process.cwd(), 'data', 'users.json');

async function ensureUsersFile() {
  await mkdir(path.dirname(usersFile), { recursive: true });
  try {
    await readFile(usersFile, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    await writeFile(usersFile, '[]', 'utf8');
  }
}

export async function readUsers() {
  await ensureUsersFile();
  const contents = await readFile(usersFile, 'utf8');
  return JSON.parse(contents || '[]');
}

export async function writeUsers(users) {
  await ensureUsersFile();
  await writeFile(usersFile, JSON.stringify(users, null, 2), 'utf8');
}

export function normalizeIdentifier(value) {
  return String(value || '').trim().toLowerCase();
}
