import { createClient } from '@supabase/supabase-js';

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseAPIKey: string = process.env.NEXT_SUPABASE_API_KEY || '';

if (!supabaseUrl || !supabaseAnonKey || !supabaseAPIKey) {
    throw new Error('Supabase URL or anonymous key is missing in environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAPIKey);
