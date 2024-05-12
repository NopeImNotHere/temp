import { db } from '$lib/db';
import { users } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
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
		return await db.select().from(users);
	}),

	getUserByID: publicProcedure
		.input(
			z.object({
				id: z.number,
			}),
		)
		.query(async ({ input }) => {
			return await db.select().from(users).where(eq(users.id, input.id));
		}),
});

export type AppRouter = typeof appRouter;
