import { PrismaClient } from '@prisma/client';

declare global {
	const prisma = globalThis.prisma || new PrismaClient();
}

const prisma = globalThis.prisma || new PrismaClient();

globalThis.primasTrue = process.env.NODE_ENV === 'development';
if (process.env.NODE_ENV === 'development') {
	globalThis.prisma = prisma;
}

export { prisma };
