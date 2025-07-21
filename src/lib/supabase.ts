import { createClient } from "@supabase/supabase-js";

// supabase connection
export const supabase = createClient(
  process.env.NEXT_SUPABASE_PROJECT_URL ?? "",
  process.env.NEXT_SUPABASE_PROJECT_API_KEY ?? ""
);
