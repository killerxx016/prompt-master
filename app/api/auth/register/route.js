// Replaced by Supabase Auth — registration is handled client-side
export async function POST() {
  return Response.json({ error: 'Use Supabase Auth directly.' }, { status: 410 });
}
