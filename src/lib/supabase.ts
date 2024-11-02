import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zsfmthnnqvdqnhflmajx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzZm10aG5ucXZkcW5oZmxtYWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1MTEyNTIsImV4cCI6MjA0NjA4NzI1Mn0.S0J6RTURa0np5gbXP5OzQ8pYen1EqKcvjT9uc_PV3bc';

export const supabase = createClient(supabaseUrl, supabaseKey);