CREATE OR REPLACE VIEW public.blueprint_items
 AS
SELECT distinct UNNEST(ARRAY(SELECT jsonb_object_keys(data -> 'items'))) as item FROM blueprint;

ALTER TABLE public.blueprint_items
    OWNER TO "factorio-blueprints";