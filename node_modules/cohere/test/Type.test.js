import test from 'ava';
import { hasMany, belongsTo } from '../src';
import Type from '../src/Type';

const iterators = ['map', 'some', 'every', 'filter', 'find'];

test('should compile relationships immediately', async t => {
  const user = new Type('user', {
    attributes: {
      name: {
        type: String,
        required: true,
      },
    },
    relationships: {
      blogs: hasMany('blog', 'author', {
        required: true,
      }),
    },
    inflection: 'users',
  });

  const requiredKeys = ['inverse', 'relation', 'name', 'field'];

  user.relationships.forEach(relationship => {
    const actualKeys = Object.keys(relationship).filter(key => requiredKeys.includes(key));

    t.is(typeof relationship, 'object');
    t.is(requiredKeys.sort().join(), actualKeys.sort().join());
    t.truthy(relationship.hasOwnProperty('required'));
  });

  t.truthy(user.attribute('name'));
  t.truthy(user.hasAttribute('name'));
  t.truthy(user.hasRelationship('blogs'));
  t.is(user.inflection, 'users');

  iterators.forEach(iterator => {
    t.is(typeof user.attributes[iterator], 'function');
    t.is(typeof user.relationships[iterator], 'function');

    user.attributes[iterator](attribute => {
      t.truthy(attribute.hasOwnProperty('field'));
      t.truthy(attribute.hasOwnProperty('type'));
      t.truthy(attribute.hasOwnProperty('required'));
    });
  });
});

test('should hydrate the inverse', async t => {
  const user = new Type('user', {
    attributes: {},
    relationships: {
      blogs: hasMany('blog', 'author'),
    },
  });

  t.deepEqual(user.relationship('blogs').inverse, {
    name: null,
    relation: null,
    field: 'author',
  });

  user.hydrateInverse('blogs', {
    name: 'user',
    relation: 'belongsTo',
  });

  t.deepEqual(user.relationship('blogs').inverse, {
    name: 'user',
    relation: 'belongsTo',
    field: 'author',
    isHydrated: true,
  });
});

test('should disallow overlapping fields', t => {
  try {
    // eslint-disable-next-line
    new Type('invalid', {
      attributes: {
        name: true,
      },
      relationships: {
        name: belongsTo('name', 'inverse'),
      },
    });

    t.fail();
  } catch (err) {
    t.pass(err);
  }
});
