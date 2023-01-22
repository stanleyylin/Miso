# Cohere
Declaratively define a schema with types and their associations with other types, then compile.

```js
// schema.js
import Schema, { hasMany, hasOne, belongsTo } from 'cohere';

export const schema = new Schema()

  // create the user type
  .defineType('user', {
    attributes: {
      name: true,
      email: true,
    },
    relationships: {
      blogs: hasMany('blog', 'author'),
    },
  })

  // create the blog type
  .defineType('blog', {
    attributes: {
      title: true,
      content: true,
      createdOn: true,
    },
    relationships: {
      author: belongsTo('user', 'blogs'),
    },
  })

  // link types together and hydrate every relationship's inverse
  .compile();
```

## Iterating over types, attributes, and relationships
The following iterators are supported for iterating over a type and its attributes/relationships:

* forEach
* map
* some
* every
* filter
* find
* reduce

```js
import schema from './schema.js';

schema.types.forEach(type => {
  const { attributes, relationships } = type;

  attributes.forEach(attribute => {
    const { field, type: attrType } = attribute;
    doSomething();
  });

  relationships.forEach(relationship => {
    const { field, name, relation, inverse, ...options } = relationship;
    doSomething();
  });
});
```
