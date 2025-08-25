import { createClient } from '@supabase/supabase-js';
const URL = 'https://danvfspmpstwuhaylcch.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhbnZmc3BtcHN0d3VoYXlsY2NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwOTY1NDYsImV4cCI6MjA3MTY3MjU0Nn0.QbdEkh8Lslsfs_n6YLk9bqi8OD7PwjkiI9J5JhV6wDE';
export const supabase = createClient(URL, API_KEY);