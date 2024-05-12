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
	users: t.procedure.query(async () => {
		return await db.select(users);
	}),
	userById: t.procedure.input(z.number()).query(async (req) => {
		const result = await db.select(users).where(eq(users.id, req.input));
		return result[0];
	}),
	createUser: t.procedure.input(apiCreateUser).mutation(async (req) => {
		return await db.insert(users).values(req.input).returning();
	}),
});

export type AppRouter = typeof appRouter;
