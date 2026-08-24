# نشر Tourisme 39 على GitHub Pages

هذا المشروع يعمل كواجهة React/Vite ثابتة على GitHub Pages، بينما تبقى البيانات والمصادقة في Supabase. تُستخدم تحديثات Realtime فقط عندما تُفعّل القنوات والجداول المطلوبة في مشروع Supabase؛ لا يعرض الموقع ادعاءً ببيانات لحظية مستقلة عن ذلك. لا يحتاج النشر إلى Vercel.

## 1. إعداد Supabase

استخدم **نفس مشروع Supabase الخاص بـ Ouedna** الذي يحتوي جدول `places`، ولا تنشئ مشروعاً جديداً. نفّذ `supabase/schema.sql` ثم `supabase/seed.sql` داخل SQL Editor في ذلك المشروع؛ السكربت يحافظ على `places` ويضيف جداول الموقع الرسمي ويطبّق RLS على المعالم القديمة. بعدها فعّل Realtime للجداول `places`, `sites`, `events`, `artisans`, `investments`, `news` و`requests`.

أنشئ أول مستخدم من **Authentication → Users**، ثم رقِّ حسابه إلى مدير:

```sql
insert into public.profiles (id, display_name, role)
values ('UUID_DU_COMPTE_AUTH', 'Administrateur — Direction du Tourisme', 'admin')
on conflict (id) do update set role = 'admin';
```

تأكد من تفعيل تأكيد البريد الإلكتروني وفق سياسة الجهة الحكومية.

## 2. نقل Gemini إلى Supabase Edge Function

توجد الوظيفة في `supabase/functions/tourism-assistant/index.ts`. من جهاز يحتوي على Supabase CLI:

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase secrets set GEMINI_API_KEY=YOUR_GEMINI_API_KEY GEMINI_MODEL=gemini-2.5-flash ALLOWED_ORIGINS=https://nadjimlab.github.io,http://localhost:3000,http://localhost:4173
supabase functions deploy tourism-assistant --no-verify-jwt
```

يستخدم `--no-verify-jwt` لأن المساعد يمكن استدعاؤه من الواجهة العامة، لكن الوظيفة لا تقبل إلا `POST`، تحد طول الطلب، وتقيّد CORS على نطاق GitHub Pages والنطاقات المحلية المحددة. لا تضع `GEMINI_API_KEY` في GitHub Variables أو في أي متغير يبدأ بـ `VITE_`.

## 3. إعداد GitHub Pages

افتح مستودع GitHub ثم اذهب إلى **Settings → Pages**، واختر **GitHub Actions** كمصدر النشر. ملف `.github/workflows/deploy-pages.yml` سيبني المشروع وينشره تلقائياً عند كل push إلى `main`.

أضف متغيري Repository Variables التاليين من **Settings → Secrets and variables → Actions → Variables**:

| Variable | القيمة |
| --- | --- |
| `VITE_SUPABASE_URL` | رابط مشروع Ouedna نفسه: `https://cwbenhuiextfoiyfboxo.supabase.co` أو القيمة من إعدادات API |
| `VITE_SUPABASE_ANON_KEY` | مفتاح Supabase anon/public الخاص بمشروع Ouedna فقط |

لا تضف مفتاح `service_role` إلى GitHub Pages. تفرض RLS في Supabase صلاحيات القراءة والكتابة حتى لو كانت هذه القيم العامة موجودة في JavaScript الخاص بالمتصفح.

بعد نجاح الـ workflow سيكون الرابط المتوقع:

```text
https://nadjimlab.github.io/Tourisme/
```

يستخدم Vite قيمة `VITE_BASE_PATH=/Tourisme/` داخل workflow، بينما يبقى التشغيل المحلي على `/`.

## 4. بنية البوابة والصفحات الرسمية

تعمل أقسام البوابة عبر hash قابل للمشاركة داخل الرابط، مثل `#map`, `#events`, `#about`, `#contact`, `#privacy`, `#terms` و`#faq`. هذا يحافظ على النشر الثابت في GitHub Pages ويتيح للمستخدم مشاركة القسم المطلوب والعودة إليه بزر المتصفح.

يحتوي النشر أيضاً على `manifest.webmanifest`, `sw.js`, `robots.txt` و`sitemap.xml`. يقوم Service Worker بتخزين الملفات الثابتة فقط، ولا يخزن طلبات المواطنين أو بيانات الإدارة في Cache المتصفح.

## 5. الاختبار المحلي

```bash
cp .env.example .env.local
# ضع VITE_SUPABASE_URL وVITE_SUPABASE_ANON_KEY فقط
pnpm install
pnpm check
pnpm build
pnpm dev
```

اختبر اللغات الثلاث، RTL العربي، قراءة المواقع والأحداث والأخبار، تسجيل الدخول الإداري، إرسال طلب، تتبع رقم الطلب، وتحديث الطلب من لوحة الإدارة.

## 6. ملاحظات مهمة

الموقع الجديد يقرأ معالم Ouedna مباشرةً من جدول `places` ويحوّلها إلى بطاقات وخريطة Tourisme 39، لذلك لا يلزم نسخ الصور أو الإحداثيات. GitHub Pages لا يشغّل Node.js أو Express أو Vercel Functions. لهذا أزيل مسار `api/ai.ts` ونُقل Gemini إلى Supabase Edge Function. إذا لم تُنشر الوظيفة أو لم يُضبط مفتاحها، يبقى الموقع والبيانات والمصادقة عاملين، بينما تكون ميزة المساعد غير متاحة فقط.

للمراجع الرسمية: [GitHub Pages عبر GitHub Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)، [Supabase Edge Functions](https://supabase.com/docs/guides/functions)، [Supabase Auth](https://supabase.com/docs/guides/auth)، و[Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security).
