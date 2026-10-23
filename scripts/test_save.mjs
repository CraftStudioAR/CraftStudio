import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cbkrzseukklabotsmclt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNia3J6c2V1a2tsYWJvdHNtY2x0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3OTczMTksImV4cCI6MjEwMjM3MzMxOX0.Oo4p2KHvoxJ770GCQl0EIhWxfc1mJ581ggMxvnosQZA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  console.log('Testing Supabase upsert...');
  const { data, error } = await supabase
    .from('projects')
    .upsert({
      slug: 'sunkiss',
      client: 'Sunkiss',
      category: 'Shift Program',
      year: '2024',
      summary: 'Test summary from node script',
      updated_at: new Date().toISOString()
    }, { onConflict: 'slug' })
    .select();

  if (error) {
    console.error('Supabase Upsert Error:', error);
  } else {
    console.log('Supabase Upsert Success:', data);
  }
}

test();
