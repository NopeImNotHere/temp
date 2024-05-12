import { PrismaClient } from '@prisma/client';

const prisma = (globalThis.prisma): PrismaClient || new PrismaClient();

globalThis.primasTrue = process.env.NODE_ENV === 'development';
if (process.env.NODE_ENV === 'development') {
	globalThis.prisma = prisma;
}

export { prisma };
