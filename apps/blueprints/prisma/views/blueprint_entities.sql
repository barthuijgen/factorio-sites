CREATE OR REPLACE VIEW public.blueprint_entities
 AS
SELECT distinct UNNEST(ARRAY(SELECT jsonb_object_keys(data -> 'entities'))) as entity FROM blueprint;

ALTER TABLE public.blueprint_entities
    OWNER TO "factorio-blueprints";