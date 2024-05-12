/* eslint-disable no-var */
/// <reference types="@sveltejs/kit" />
/// <reference types="@cloudflare/workers-types" />

import type { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client/extension';

declare namespace App {
	interface Platform {
		env: {
			// KV: KVNamespace;
		};
		context: ExecutionContext;
	}
	// interface Locals {}
	// interface Error {}
	// interface Session {}
	// interface Stuff {}
}

declare global {
	var prisma: PrismaClient;
	var primasTrue: boolean;
}