import { createClient } from '@supabase/supabase-js';

export const client = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const tableName = 'enjoy_apr_21'; // hemanth test

export async function getUsers() {
  const { data, error } = await client
    .from(tableName)
    .select('*')
    .order('allowance', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function getUser(wallet: string) {
  const { data, error } = await client
    .from(tableName)
    .select('*')
    .eq('wallet', wallet.toLowerCase());

  if (error) {
    throw error;
  }

  return data[0];
}
