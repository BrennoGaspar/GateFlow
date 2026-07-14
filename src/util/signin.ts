import { supabase } from "@/lib/supabase";

export default async function Login ( emailForm: string, passwordForm: string ) {
    
    const {data, error} = await supabase.auth.signInWithPassword({
        email: emailForm,
        password: passwordForm,
    });

    return {data, error};

}