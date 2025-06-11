
-- Create the admin user account in auth.users if it doesn't exist
DO $$
DECLARE
    user_exists BOOLEAN;
    user_uuid UUID;
BEGIN
    -- Check if user already exists
    SELECT EXISTS (
        SELECT 1 FROM auth.users WHERE email = 'ugoalaemeka77@gmail.com'
    ) INTO user_exists;
    
    -- Only create if user doesn't exist
    IF NOT user_exists THEN
        -- Generate a UUID for the user
        user_uuid := gen_random_uuid();
        
        -- Insert the admin user into auth.users
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            recovery_sent_at,
            last_sign_in_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at,
            confirmation_token,
            email_change,
            email_change_token_new,
            recovery_token
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            user_uuid,
            'authenticated',
            'authenticated',
            'ugoalaemeka77@gmail.com',
            crypt('Ugoala@1234', gen_salt('bf')),
            NOW(),
            NOW(),
            NOW(),
            '{"provider": "email", "providers": ["email"]}',
            '{"first_name": "Ugo", "last_name": "Alaemeka", "role": "admin"}',
            NOW(),
            NOW(),
            '',
            '',
            '',
            ''
        );
        
        -- Create the profile for the admin user
        INSERT INTO public.profiles (id, role, first_name, last_name)
        VALUES (user_uuid, 'admin'::user_role, 'Ugo', 'Alaemeka');
        
    ELSE
        -- If user exists, just ensure the profile exists and is set to admin
        SELECT id INTO user_uuid FROM auth.users WHERE email = 'ugoalaemeka77@gmail.com';
        
        INSERT INTO public.profiles (id, role, first_name, last_name)
        VALUES (user_uuid, 'admin'::user_role, 'Ugo', 'Alaemeka')
        ON CONFLICT (id) 
        DO UPDATE SET 
            role = 'admin'::user_role,
            first_name = 'Ugo',
            last_name = 'Alaemeka';
    END IF;
END $$;
