/// <reference types="@sveltejs/kit" />
/// <reference types="@cloudflare/workers-types" />

declare namespace App {
	interface Platform {
		env: {
			// KV: KVNamespace;
		};
		context: ExecutionContext;
	}

	export interface SlideParams {}
	// interface Locals {}
	// interface Error {}
	// interface Session {}
	// interface Stuff {}
}
