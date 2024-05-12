/// <reference types="@sveltejs/kit" />
/// <reference types="@cloudflare/workers-types" />

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
