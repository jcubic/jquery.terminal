import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wnhpsdjbfeldnuclwsgu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduaHBzZGpiZmVsZG51Y2x3c2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0NDU5MzAsImV4cCI6MjA0NTAyMTkzMH0.KcNTiEJTDqkePhjrCKNBW5Y2uqJvWIKvDJSNk94hLm0';
const supabase = createClient(supabaseUrl, supabaseKey);

export function jargon_search(query: string) {
    return supabase.from('jargon').select().textSearch('term', query, {
        type: 'websearch'
    });
}

export function jargon_query(query: string) {
    return supabase.from('jargon').select().eq('term', query);
}

export function jargon_abbrev(id: number) {
    return supabase.from('abbrev').select().eq('term', id);
}
