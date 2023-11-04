import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qeircrvhglsvhgqicqdc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlaXJjcnZoZ2xzdmhncWljcWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE3MDUzNzQsImV4cCI6MjAwNzI4MTM3NH0.6Vl0jf8yKB0G7g0ly-CLJJE-XGRaBZdOysJtp2-lb7w'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})