# Some dev queries to maintain the database

### Resources

- https://www.postgresql.org/docs/9.5/functions-json.html

### Find all icons

```
SELECT distinct concat(type,'/',name) FROM blueprint, jsonb_to_recordset(data -> 'icons') as icons(name text,type text)
```

### Unique entities

```
SELECT distinct UNNEST(ARRAY(SELECT jsonb_object_keys(data -> 'entities'))) as entities FROM blueprint
```

### Unique items

```
SELECT distinct UNNEST(ARRAY(SELECT jsonb_object_keys(data -> 'items'))) as entities FROM blueprint
```

### Unique recipes

```
SELECT distinct UNNEST(ARRAY(SELECT jsonb_object_keys(data -> 'recipes'))) as entities FROM blueprint
```
