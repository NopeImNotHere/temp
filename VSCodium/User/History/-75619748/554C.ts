import { supabase } from '$lib/supabaseClient';
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
	hello: publicProcedure
		.input(
			z.object({
				number: z.number().optional(),
			}),
		)
		.query(({ input }) => {
			return `Hello world ${input.number ?? 69}!`;
		}),
	getCountry: publicProcedure
		.input(
			z.object({
				country: z.string(),
			}),
		)
		.query(async ({ input }) => {
			const { data } = await supabase
				.from('countries')
				.select()
				.contains('name', input.country);

			return { country: data ?? [] };
		}),
});

export type AppRouter = typeof appRouter;
