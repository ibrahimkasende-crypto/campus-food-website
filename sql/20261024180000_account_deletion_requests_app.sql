-- Appliquée le 24 octobre 2026 sur la base liée, par supabase db query --linked -f.
-- Ne pas relancer avec supabase db push. Le script reste idempotent.
--
-- État vérifié le 24 octobre 2026 sur la base de production :
--   colonnes : id, created_at, contact, contact_kind, message, status, source,
--              handled_by, handled_at, staff_note.
--   aucune colonne app.
--   aucune demande en attente.
--   INSERT public accordé à anon et authenticated uniquement sur
--   (contact, contact_kind, message).
--
-- Sans ce script, l'API du site qui envoie app reçoit un refus PostgREST
-- (colonne absente ou droit d'insertion manquant). Le site ne confirme alors
-- pas la demande : aucune ligne n'est écrite sans l'application choisie.
--
-- Ce script ne change pas le statut, le message ni le traitement des lignes
-- déjà présentes. Une insertion qui n'envoie pas app reçoit client.

alter table public.account_deletion_requests
  add column if not exists app text;

update public.account_deletion_requests
set app = 'client'
where app is null;

alter table public.account_deletion_requests
  alter column app set default 'client';

alter table public.account_deletion_requests
  drop constraint if exists account_deletion_app_check;

alter table public.account_deletion_requests
  add constraint account_deletion_app_check
  check (app in ('client', 'driver', 'pro'));

alter table public.account_deletion_requests
  alter column app set not null;

grant insert (app) on public.account_deletion_requests to anon, authenticated;
