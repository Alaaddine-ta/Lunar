
import { Database } from '@/lib/database.types';
import { createClient } from '@supabase/supabase-js';


  export const supabase = createClient<Database>(
    "https://qmnrysxmrdvlfbshvnty.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtbnJ5c3htcmR2bGZic2h2bnR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MTA3NjksImV4cCI6MjAyNTM4Njc2OX0.sEqL505btd3gxuFGSOZUOfx4bsB9d2JNpsl24KRdoE8"
    );
