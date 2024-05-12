/// <reference types="@sveltejs/kit" />
/// <reference types="@cloudflare/workers-types" />

import type { PrismaClient } from '@prisma/client';

declare namespace App {
	interface Platform {
		env: {
			// KV: KVNamespace;
		};
		context: ExecutionContext;
	}
	let prisma: PrismaClient;
	let primasTrue: boolean;
	// interface Locals {}
	// interface Error {}
	// interface Session {}
	// interface Stuff {}
}
