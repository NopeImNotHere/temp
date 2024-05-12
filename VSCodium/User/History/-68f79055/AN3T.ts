import { trpcServer } from '$lib/server/server';
import { supabase } from '$lib/server/supabaseClient';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	// You don't need to return the result of this function,
	// just call it and your data will be hydrated!
	await trpcServer.hello.ssr({ number: 100 }, event);
	await supabase.from('countries').select();
};
