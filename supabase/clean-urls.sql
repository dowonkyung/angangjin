-- Add permanent numeric public identifiers. Existing UUID primary keys and files are retained.
begin;
do $$
declare table_name text; sequence_name text;
begin
 foreach table_name in array array['news_posts','notice_posts','publication_posts'] loop
  if to_regclass('public.'||table_name) is not null then
   execute format('alter table public.%I add column if not exists public_id bigint generated always as identity (minvalue 1 maxvalue 9007199254740991)',table_name);
   execute format('create unique index if not exists %I on public.%I(public_id)',table_name||'_public_id_unique',table_name);
   sequence_name:=pg_get_serial_sequence('public.'||table_name,'public_id');
   if sequence_name is not null then execute format('grant usage on sequence %s to authenticated',sequence_name);end if;
  end if;
 end loop;
end;
$$;
commit;
