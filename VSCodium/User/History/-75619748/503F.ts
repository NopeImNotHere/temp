import { db } from '$lib/db';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const appRouter = router({
	greeting: publicProcedure
		.input(
			z.object({
				name: z.string().optional(),
			}),
		)
		.query(({ input }) => {
			return `Welcome to ${input.name ?? 'the world'}!`;
		}),
	users: publicProcedure.query(async () => {
		return await db.select();
	}),
	userById: publicProcedure.input(z.number()).query(async (req) => {
		const result = await db.select(users).where(eq(users.id, req.input));
		return result[0];
	}),
});

export type AppRouter = typeof appRouter;