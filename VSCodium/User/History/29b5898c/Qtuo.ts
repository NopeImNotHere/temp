import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL ?? 'Error';
const supabaseKey = process.env.SUPABASE_KEY ?? 'Error';

export const supabase = createClient(supabaseUrl, supabaseKey);
