import { PrismaClient } from '@prisma/client';

const prisma = global.prisma || new PrismaClient();

global.primasTrue = process.env.NODE_ENV === 'development';

if (process.env.NODE_ENV === 'development') {
	global.prisma = prisma;
}

export { prisma };
