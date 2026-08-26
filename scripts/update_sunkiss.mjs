import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cbkrzseukklabotsmclt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNia3J6c2V1a2tsYWJvdHNtY2x0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3OTczMTksImV4cCI6MjEwMjM3MzMxOX0.Oo4p2KHvoxJ770GCQl0EIhWxfc1mJ581ggMxvnosQZA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  console.log('Fetching sunkiss from Supabase...');
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', 'sunkiss')
    .single();

  if (error) {
    console.error('Error fetching sunkiss:', error);
    return;
  }

  let blocks = typeof data.blocks === 'string' ? JSON.parse(data.blocks) : data.blocks;

  if (Array.isArray(blocks)) {
    blocks = blocks.map((b) => {
      if (b.type === 'imagePair') {
        return { ...b, mobileLayout: 'stack' };
      }
      return b;
    });

    const { error: updateError } = await supabase
      .from('projects')
      .update({ blocks: JSON.stringify(blocks) })
      .eq('slug', 'sunkiss');

    if (updateError) {
      console.error('Error updating sunkiss in Supabase:', updateError);
    } else {
      console.log('Successfully updated sunkiss in Supabase!');
    }
  }
}

main();
