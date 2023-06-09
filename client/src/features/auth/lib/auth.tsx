import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://qttdnhpcwslhkvxjwkbt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0dGRuaHBjd3NsaGt2eGp3a2J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUyNDU0MDQsImV4cCI6MjAwMDgyMTQwNH0.5rw81d9BjIGxZOylb5EqBRpOWrKCTb_VCWRmZdkLzb4"
);
