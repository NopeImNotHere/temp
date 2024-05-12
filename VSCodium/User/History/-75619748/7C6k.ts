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
		const data = await db.select().from(users);
		return data;
	}),

	userById: publicProcedure
		.input(z.object({ id: z.number() }))
		.query(async ({ input }) => {
			const result = await db
				.select()
				.from(users)
				.where(eq(users.id, input.id));
			return result[0];
		}),
});

export type AppRouter = typeof appRouter;
