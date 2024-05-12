import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL ?? 'Error';
const supabaseKey = process.env.SUPABASE_KEY ?? 'Error';

console.log(supabaseUrl, supabaseKey);

if (supabaseUrl == 'Error' || supabaseKey == 'Error') {
	throw new Error('Unable to get Database URL or Key');
}
export const supabase = createClient(supabaseUrl, supabaseKey);
