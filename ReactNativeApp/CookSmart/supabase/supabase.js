import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://lbwjimtnjksncgbojhkj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxid2ppbXRuamtzbmNnYm9qaGtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI2MzkzMzEsImV4cCI6MjAxODIxNTMzMX0.ZaF0MznNGoa3zoy0hf8fPMX9nSHExAvJTqhLkkAcM7Q'
export const supabase = createClient(supabaseUrl, supabaseKey)
