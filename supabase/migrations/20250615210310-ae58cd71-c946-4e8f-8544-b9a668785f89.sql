
-- Add a unique student_id column to the students table for login purposes.
ALTER TABLE public.students ADD COLUMN student_id TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS students_student_id_key ON public.students (student_id);

-- Add an email column to the students table to simplify email lookup during login.
ALTER TABLE public.students ADD COLUMN email TEXT;
