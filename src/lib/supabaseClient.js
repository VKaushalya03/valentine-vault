// src/lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://npmhakvyntmwxznpcsak.supabase.co";
const supabaseAnonKey = "sb_publishable_vAcJCkj4nzB4IhJ76vGYsw_jap9Dmfe";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
