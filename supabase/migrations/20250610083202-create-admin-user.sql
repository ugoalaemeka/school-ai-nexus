
-- Create the admin user account in auth.users if it doesn't exist
DO $$
DECLARE
    user_exists BOOLEAN;
    user_uuid UUID;
BEGIN
    -- Check if user already exists
    SELECT EXISTS (
        SELECT 1 FROM auth.users WHERE email = 'admin@ekoscholars.com'
    ) INTO user_exists;
    
    -- Only create if user doesn't exist
    IF NOT user_exists THEN
        -- Generate a UUID for the user
        user_uuid := gen_random_uuid();
        
        -- Insert the admin user into auth.users with proper password hashing
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
            'admin@ekoscholars.com',
            crypt('password', gen_salt('bf')),
            NOW(),
            NOW(),
            NOW(),
            '{"provider": "email", "providers": ["email"]}',
            '{"first_name": "Admin", "last_name": "User", "role": "admin"}',
            NOW(),
            NOW(),
            '',
            '',
            '',
            ''
        );
        
        -- Create the profile for the admin user
        INSERT INTO public.profiles (id, role, first_name, last_name)
        VALUES (user_uuid, 'admin'::user_role, 'Admin', 'User');
        
    ELSE
        -- If user exists, just ensure the profile exists and is set to admin
        SELECT id INTO user_uuid FROM auth.users WHERE email = 'admin@ekoscholars.com';
        
        -- Update the password if the user already exists
        UPDATE auth.users 
        SET encrypted_password = crypt('password', gen_salt('bf'))
        WHERE email = 'admin@ekoscholars.com';
        
        INSERT INTO public.profiles (id, role, first_name, last_name)
        VALUES (user_uuid, 'admin'::user_role, 'Admin', 'User')
        ON CONFLICT (id) 
        DO UPDATE SET 
            role = 'admin'::user_role,
            first_name = 'Admin',
            last_name = 'User';
    END IF;
END $$;
