import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://jmvohewaxrgumpzownuo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imptdm9oZXdheHJndW1wem93bnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU5MzMwMzQsImV4cCI6MjAyMTUwOTAzNH0.UuX2gmNQ7_rrx-VjYzwW3vxX074D30TKIxeqIfpJzJg'
export const supabase = createClient(supabaseUrl, supabaseKey)

