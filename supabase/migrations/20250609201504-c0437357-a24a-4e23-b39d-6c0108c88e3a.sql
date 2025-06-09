
-- Drop ALL policies that depend on the role column across all tables
DROP POLICY IF EXISTS "Admins can manage all submissions" ON public.visit_bookings;
DROP POLICY IF EXISTS "Admins can manage applications" ON public.applications;
DROP POLICY IF EXISTS "Admins can manage invite tokens" ON public.invite_tokens;

-- Now we can safely update the profiles table role column type
ALTER TABLE public.profiles 
ALTER COLUMN role TYPE user_role USING role::user_role;

-- Enable RLS on profiles table if not already enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for profiles table (users can only see their own profile)
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

-- Create RLS policy for profiles table (users can update their own profile)
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

-- Create a function to check if user is admin (for use in other RLS policies)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- Recreate all the policies that were dropped using the new admin function
CREATE POLICY "Admins can manage all submissions" 
ON public.visit_bookings 
FOR ALL 
TO authenticated 
USING (public.is_admin());

CREATE POLICY "Admins can manage applications" 
ON public.applications 
FOR ALL 
TO authenticated 
USING (public.is_admin());

CREATE POLICY "Admins can manage invite tokens" 
ON public.invite_tokens 
FOR ALL 
TO authenticated 
USING (public.is_admin());
