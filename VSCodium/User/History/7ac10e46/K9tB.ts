/// <reference types="@sveltejs/kit" />
/// <reference types="@cloudflare/workers-types" />

declare namespace App {
	interface Platform {
		env: {
			// KV: KVNamespace;
		};
		context: ExecutionContext;
	}

	export interface MultiSlideParams {
		delay?: { in: number; out: number };
		duration?: number;
		easing?: EasingFunction;
		axis?: 'x' | 'y';
	}
	// interface Locals {}
	// interface Error {}
	// interface Session {}
	// interface Stuff {}
}
