import { createClient } from '@supabase/supabase-js';

try {
	const supabaseUrl = process.env.SUPABASE_URL;
	const supabaseKey = process.env.SUPABASE_KEY;
} catch (error) {}

export const supabase = createClient(supabaseUrl, supabaseKey);
