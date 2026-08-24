-- إصلاح جدول صلاحيات لوحة الإدارة في مشروع Supabase المشترك Ouedna.
-- شغّل هذا الملف مرة واحدة من Supabase Dashboard > SQL Editor.
-- لا يحتوي على service_role ولا ينشئ كلمة مرور أو حساباً تلقائياً.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typnamespace = 'public'::regnamespace AND typname = 'staff_role') THEN
    CREATE TYPE public.staff_role AS ENUM ('admin', 'editor', 'viewer');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  role public.staff_role NOT NULL DEFAULT 'viewer',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'editor')
  );
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

REVOKE ALL ON FUNCTION public.is_staff() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_staff() TO anon, authenticated;
REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;

DROP POLICY IF EXISTS profiles_self_read ON public.profiles;
CREATE POLICY profiles_self_read ON public.profiles
  FOR SELECT TO authenticated
  USING (id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS profiles_admin_write ON public.profiles;
CREATE POLICY profiles_admin_write ON public.profiles
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- بعد إنشاء/التأكد من حساب الموظف في Authentication > Users،
-- نفّذ الاستعلام التالي مع استبدال البريد فقط، ثم احذف أو لا تحفظ البريد في أي ملف عام:
--
-- INSERT INTO public.profiles (id, display_name, role)
-- SELECT id, COALESCE(raw_user_meta_data->>'full_name', email), 'admin'::public.staff_role
-- FROM auth.users
-- WHERE lower(email) = lower('ضع-البريد-هنا@example.com')
-- ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, updated_at = now();
--
-- للتحقق بعد التنفيذ:
-- SELECT p.id, u.email, p.role FROM public.profiles p JOIN auth.users u ON u.id = p.id;
