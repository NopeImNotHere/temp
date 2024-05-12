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
	userById: publicProcedure.input(z.object({ id: z.number })),
});

export type AppRouter = typeof appRouter;

/**
 * Argument of type 
 * 'PgTableWithColumns<{ name: "users"; schema: undefined; columns: { id: PgColumn<{ name: "id"; tableName: "users"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true; hasDefault: true; enumValues: undefined; baseColumn: never; }, {}, {}>; fullName: PgColumn<...>; phone: PgColu...' is not assignable to parameter of type 'SelectedFields'.
 * 'PgTable<{ name: "users"; schema: undefined; columns: { id: PgColumn<{ name: "id"; tableName: "users"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true; hasDefault: true; enumValues: undefined; baseColumn: never; }, {}, {}>; fullName: PgColumn<...>; phone: PgColumn<...>; };
  Index signature for type 'string' is missing in type ...'.ts(2345)

 */
