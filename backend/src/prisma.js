import 'dotenv/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

console.log('Database URL:', process.env.DATABASE_URL);
const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL
});

const prisma = new PrismaClient ({adapter});

export default prisma;