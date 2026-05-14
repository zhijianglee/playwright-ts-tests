import * as fs from 'fs';
import * as path from 'path';

export interface User {
  username: string;
  password: string;
}

export interface Config {
  baseURL: string;
  users: {
    standardUser: User;
    lockedOutUser: User;
    problemUser: User;
  };
  taxRate: number;
}

const secretsPath = path.join(__dirname, 'secrets.json');
const secrets = JSON.parse(fs.readFileSync(secretsPath, 'utf-8'));

export const config: Config = {
  baseURL: 'https://www.saucedemo.com/',
  users: secrets.users,
  taxRate: 0.08, // Example tax rate, adjust as needed
};