import test from 'ava';
import Schema, { hasMany, belongsTo } from '../src';
import Type from '../src/Type';

const iterators = ['map', 'some', 'every', 'filter', 'find'];

test('should compile schema properly', async t => {
  const schema = new Schema()

    // create the user type
    .defineType('user', {
      attributes: {
        name: true,
      },
      relationships: {
        blogs: hasMany('blog', 'author'),
      },
    })

    // create the blog type
    .defineType('blog', {
      attributes: {
        title: true,
      },
      relationships: {
        author: belongsTo('user', 'blogs'),
      },
    })

    // comile and link relationships together
    .compile();

  schema.types.forEach(type => {
    t.truthy(type instanceof Type);
  });

  t.is(schema.types.user.relationships.blogs.type, schema.types.blog);
  t.deepEqual(schema.types.user.relationships.blogs.inverse, {
    field: 'author',
    name: 'user',
    relation: 'belongsTo',
    isHydrated: true,
  });

  t.is(schema.types.blog.relationships.author.type, schema.types.user);
  t.deepEqual(schema.types.blog.relationships.author.inverse, {
    field: 'blogs',
    name: 'blog',
    relation: 'hasMany',
    isHydrated: true,
  });

  iterators.forEach(iterator => {
    t.is(typeof schema.types[iterator], 'function');
  });

  t.truthy(schema.isCompiled);
});
