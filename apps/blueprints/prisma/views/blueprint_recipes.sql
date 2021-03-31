CREATE OR REPLACE VIEW public.blueprint_recipes
 AS
SELECT distinct UNNEST(ARRAY(SELECT jsonb_object_keys(data -> 'recipes'))) as recipe FROM blueprint;

ALTER TABLE public.blueprint_recipes
    OWNER TO "factorio-blueprints";