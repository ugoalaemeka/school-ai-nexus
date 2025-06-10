
-- Update the existing user's profile to admin role
UPDATE public.profiles 
SET role = 'admin', 
    first_name = COALESCE(first_name, 'Ugo'), 
    last_name = COALESCE(last_name, 'Alaemeka')
WHERE id = (SELECT id FROM auth.users WHERE email = 'ugoalaemeka77@gmail.com');
