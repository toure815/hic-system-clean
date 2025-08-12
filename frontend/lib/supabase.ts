import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? 'https://lczeeincuqzfczdcrlvd.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjemVlaW5jdXF6ZmN6ZGNybHZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5NjUwNTcsImV4cCI6MjA3MDU0MTA1N30.jR56NObu2KpCNlQm29UciPhtjRNt2VZbc0iCAPan_OI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
