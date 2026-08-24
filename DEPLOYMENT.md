# Déploiement de Tourisme 39 — El Oued

## 1. Préparer Supabase

Créez un projet Supabase, puis exécutez d’abord `supabase/schema.sql` dans l’éditeur SQL. Exécutez ensuite `supabase/seed.sql` pour importer le contenu éditorial trilingue initial. Les demandes citoyennes ne sont pas préremplies : elles sont créées exclusivement par le formulaire public via la fonction RPC sécurisée.

Dans **Authentication → Users**, créez le premier compte de la direction avec une adresse institutionnelle. Après la création, récupérez son UUID dans la table `auth.users`, puis exécutez :

```sql
insert into public.profiles (id, display_name, role)
values ('UUID_DU_COMPTE_AUTH', 'Administrateur — Direction du Tourisme', 'admin')
on conflict (id) do update set role = 'admin';
```

Activez la confirmation d’adresse e-mail selon la politique de la direction. Ne partagez jamais le rôle `admin` avec un compte personnel non contrôlé.

## 2. Variables d’environnement Vercel

Ajoutez les variables suivantes dans les environnements **Production**, **Preview** et **Development** nécessaires :

| Variable | Visibilité | Usage |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | publique | URL du projet Supabase, protégée par RLS |
| `VITE_SUPABASE_ANON_KEY` | publique | Clé anon Supabase, jamais une clé service |
| `GEMINI_API_KEY` | serveur uniquement | Appel Gemini depuis `api/ai.ts` |
| `GEMINI_MODEL` | serveur uniquement | Modèle Gemini, par défaut `gemini-2.5-flash` |

Aucune variable secrète ne doit commencer par `VITE_`. La clé `service_role` Supabase n’est pas utilisée par le frontend et ne doit pas être ajoutée au projet Vercel.

## 3. Vérifications locales

Copiez `.env.example` vers `.env.local`, renseignez uniquement les valeurs du projet de développement, puis lancez :

```bash
pnpm install
pnpm check
pnpm build
pnpm dev
```

La route `/api/ai` est déployée comme fonction Vercel. Le frontend ne parle jamais directement à Gemini : il appelle uniquement `/api/ai`, qui valide la méthode, la taille du prompt et utilise `GEMINI_API_KEY` côté serveur.

## 4. Contrôles de sécurité avant publication

Vérifiez que les politiques RLS sont actives sur les sept tables. Vérifiez également qu’un visiteur non authentifié peut lire uniquement les contenus `is_published = true`, créer une demande via `submit_public_request`, suivre un dossier avec son numéro, mais ne peut pas lire la table brute `requests` ni écrire du contenu éditorial. Un compte Auth sans profil `admin` ou `editor` est automatiquement refusé par le portail d’administration.

Les mises à jour du tableau de bord sont rechargées via les changements Postgres Realtime. Activez les tables `sites`, `events`, `artisans`, `investments`, `news` et `requests` dans la publication Realtime Supabase avant la mise en ligne.

## 5. Déploiement

Importez le dépôt dans Vercel avec le framework Vite. Le script de build est `pnpm build` et le répertoire de sortie est `dist`. Après le premier déploiement, testez les trois langues, le sens RTL arabe, le dépôt d’une demande, le suivi avec le numéro généré, la connexion Auth et la mise à jour d’un dossier depuis deux onglets administratifs.

Pour les références officielles, consultez la [documentation Supabase Auth](https://supabase.com/docs/guides/auth), la [documentation Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security), la [documentation Supabase Realtime](https://supabase.com/docs/guides/realtime) et la [documentation Vercel Functions](https://vercel.com/docs/functions).
