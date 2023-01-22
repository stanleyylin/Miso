'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ensureUniqueFields = function ensureUniqueFields() {
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var relationships = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var attributesFields = Object.keys(attributes);
  var relationshipsFields = Object.keys(relationships);

  if (attributesFields.some(function (field) {
    return relationshipsFields.includes(field);
  })) {
    throw new Error('Attribute field names and relationship field names must be unique.');
  }
};

var Type = function () {
  function Type(name) {
    var _this = this;

    var fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Type);

    if (typeof name !== 'string') {
      throw new TypeError('Argument "name" must be a valid string.');
    }

    if (!(fields && (typeof fields === 'undefined' ? 'undefined' : _typeof(fields)) === 'object')) {
      throw new TypeError('Argument "fields" must be a valid object.');
    }

    ensureUniqueFields(fields.attributes, fields.relationships);

    this.name = name;
    this._attributes = fields.attributes || {};
    this._relationships = fields.relationships || {};

    // hydrate relationships
    this._relationships = Object.keys(this._relationships).reduce(function (prev, field) {
      var relationship = _this._relationships[field];

      if (typeof relationship !== 'function') {
        throw new TypeError('Tried registering the "' + name + '" type\'s "' + field + '" relationship, but it wasn\'t a ' + 'function. Please use either the "hasMany", "belongsTo", or "hasOne" relationship ' + 'function.');
      }

      return _extends({}, prev, _defineProperty({}, field, relationship(field)));
    }, {});

    // hydrate all other top level keys
    Object.keys(fields).forEach(function (key) {
      if (key !== 'attributes' && key !== 'relationships') {
        _this[key] = fields[key];
      }
    });
  }

  _createClass(Type, [{
    key: 'hasAttribute',
    value: function hasAttribute(field) {
      return this._attributes.hasOwnProperty(field);
    }
  }, {
    key: 'hasRelationship',
    value: function hasRelationship(field) {
      return this._relationships.hasOwnProperty(field);
    }
  }, {
    key: 'attribute',
    value: function attribute(field) {
      return this.attributes[field] || null;
    }
  }, {
    key: 'relationship',
    value: function relationship(field) {
      return this.relationships[field] || null;
    }
  }, {
    key: 'hydrateInverse',
    value: function hydrateInverse(field, _ref) {
      var name = _ref.name,
          relation = _ref.relation;

      if (!this.relationship(field)) {
        throw new Error('Tried to hydrate the "' + this.name + '" type\'s "' + field + '" inverse, but "' + field + '" is not a ' + 'valid relationship.');
      }

      var relationship = this.relationship(field);

      if (!relationship.inverse.isHydrated) {
        this._relationships[field].inverse = _extends({}, relationship.inverse, {
          isHydrated: true,
          name: name,
          relation: relation
        });
      }
    }
  }, {
    key: 'attributes',
    get: function get() {
      var attributes = this._attributes;

      return _extends({}, attributes, {
        forEach: function forEach(fn) {
          Object.keys(attributes).forEach(function (field) {
            return fn({
              type: attributes[field],
              field: field
            });
          });
        },
        reduce: function reduce(fn, initialValue) {
          return Object.keys(attributes).reduce(function (init, field) {
            return fn(init, {
              type: attributes[field],
              field: field
            });
          }, initialValue);
        }
      }, ['map', 'some', 'every', 'filter', 'find'].reduce(function (accumulator, iterator) {
        return _extends({}, accumulator, _defineProperty({}, iterator, function (fn) {
          return Object.keys(attributes)[iterator](function (field) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }

            return fn.apply(undefined, [_extends({}, attributes[field], { field: field })].concat(args));
          });
        }));
      }, {}));
    }
  }, {
    key: 'relationships',
    get: function get() {
      var relationships = this._relationships;

      return _extends({}, relationships, {
        forEach: function forEach(fn) {
          Object.keys(relationships).forEach(function (field) {
            return fn(relationships[field]);
          });
        },
        reduce: function reduce(fn, initialValue) {
          return Object.keys(relationships).reduce(function (init, field) {
            return fn(init, relationships[field]);
          }, initialValue);
        }
      }, ['map', 'some', 'every', 'filter', 'find'].reduce(function (accumulator, iterator) {
        return _extends({}, accumulator, _defineProperty({}, iterator, function (fn) {
          return Object.keys(relationships)[iterator](function (field) {
            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }

            return fn.apply(undefined, [relationships[field]].concat(args));
          });
        }));
      }, {}));
    }
  }]);

  return Type;
}();

exports.default = Type;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9UeXBlLmpzIl0sIm5hbWVzIjpbImVuc3VyZVVuaXF1ZUZpZWxkcyIsImF0dHJpYnV0ZXMiLCJyZWxhdGlvbnNoaXBzIiwiYXR0cmlidXRlc0ZpZWxkcyIsIk9iamVjdCIsImtleXMiLCJyZWxhdGlvbnNoaXBzRmllbGRzIiwic29tZSIsImluY2x1ZGVzIiwiZmllbGQiLCJFcnJvciIsIlR5cGUiLCJuYW1lIiwiZmllbGRzIiwiVHlwZUVycm9yIiwiX2F0dHJpYnV0ZXMiLCJfcmVsYXRpb25zaGlwcyIsInJlZHVjZSIsInByZXYiLCJyZWxhdGlvbnNoaXAiLCJmb3JFYWNoIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJyZWxhdGlvbiIsImludmVyc2UiLCJpc0h5ZHJhdGVkIiwiZm4iLCJ0eXBlIiwiaW5pdGlhbFZhbHVlIiwiaW5pdCIsImFjY3VtdWxhdG9yIiwiaXRlcmF0b3IiLCJhcmdzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEscUJBQXFCLFNBQXJCQSxrQkFBcUIsR0FBeUM7QUFBQSxNQUF4Q0MsVUFBd0MsdUVBQTNCLEVBQTJCO0FBQUEsTUFBdkJDLGFBQXVCLHVFQUFQLEVBQU87O0FBQ2xFLE1BQU1DLG1CQUFtQkMsT0FBT0MsSUFBUCxDQUFZSixVQUFaLENBQXpCO0FBQ0EsTUFBTUssc0JBQXNCRixPQUFPQyxJQUFQLENBQVlILGFBQVosQ0FBNUI7O0FBRUEsTUFBSUMsaUJBQWlCSSxJQUFqQixDQUFzQjtBQUFBLFdBQVNELG9CQUFvQkUsUUFBcEIsQ0FBNkJDLEtBQTdCLENBQVQ7QUFBQSxHQUF0QixDQUFKLEVBQXlFO0FBQ3ZFLFVBQU0sSUFBSUMsS0FBSixDQUFVLG9FQUFWLENBQU47QUFDRDtBQUNGLENBUEQ7O0lBU3FCQyxJO0FBQ25CLGdCQUFZQyxJQUFaLEVBQStCO0FBQUE7O0FBQUEsUUFBYkMsTUFBYSx1RUFBSixFQUFJOztBQUFBOztBQUM3QixRQUFJLE9BQU9ELElBQVAsS0FBZ0IsUUFB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MkJlLE1BQTNCLENBQWtDLFVBQUNZLElBQUQsRUFBT3BCLEtBQVA7QUFBQSxtQkFDdkNpQixHQUFHRyxJQUFILEVBQVMzQixjQUFjTyxLQUFkLENBQVQsQ0FEdUM7QUFBQSxXQUFsQyxFQUMyQm1CLFlBRDNCLENBQVA7QUFFRDtBQVZILFNBWUssQ0FBQyxLQUFELEVBQVEsTUFBUixFQUFnQixPQUFoQixFQUF5QixRQUF6QixFQUFtQyxNQUFuQyxFQUEyQ1gsTUFBM0MsQ0FBa0QsVUFBQ2EsV0FBRCxFQUFjQyxRQUFkO0FBQUEsNEJBQ2hERCxXQURnRCxzQkFFbERDLFFBRmtELEVBRXZDLFVBQUNMLEVBQUQ7QUFBQSxpQkFDVnRCLE9BQU9DLElBQVAsQ0FBWUgsYUFBWixFQUEyQjZCLFFBQTNCLEVBQXFDLFVBQUN0QixLQUFEO0FBQUEsK0NBQVd1QixJQUFYO0FBQVdBLGtCQUFYO0FBQUE7O0FBQUEsbUJBQ25DTixxQkFBR3hCLGNBQWNPLEtBQWQsQ0FBSCxTQUE0QnVCLElBQTVCLEVBRG1DO0FBQUEsV0FBckMsQ0FEVTtBQUFBLFNBRnVDO0FBQUEsT0FBbEQsRUFNQyxFQU5ELENBWkw7QUFvQkQ7Ozs7OztrQkFuSWtCckIsSSIsImZpbGUiOiJUeXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZW5zdXJlVW5pcXVlRmllbGRzID0gKGF0dHJpYnV0ZXMgPSB7fSwgcmVsYXRpb25zaGlwcyA9IHt9KSA9PiB7XG4gIGNvbnN0IGF0dHJpYnV0ZXNGaWVsZHMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKTtcbiAgY29uc3QgcmVsYXRpb25zaGlwc0ZpZWxkcyA9IE9iamVjdC5rZXlzKHJlbGF0aW9uc2hpcHMpO1xuXG4gIGlmIChhdHRyaWJ1dGVzRmllbGRzLnNvbWUoZmllbGQgPT4gcmVsYXRpb25zaGlwc0ZpZWxkcy5pbmNsdWRlcyhmaWVsZCkpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdBdHRyaWJ1dGUgZmllbGQgbmFtZXMgYW5kIHJlbGF0aW9uc2hpcCBmaWVsZCBuYW1lcyBtdXN0IGJlIHVuaXF1ZS4nKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHlwZSB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGZpZWxkcyA9IHt9KSB7XG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgXCJuYW1lXCIgbXVzdCBiZSBhIHZhbGlkIHN0cmluZy4nKTtcbiAgICB9XG5cbiAgICBpZiAoIShmaWVsZHMgJiYgdHlwZW9mIGZpZWxkcyA9PT0gJ29iamVjdCcpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBcImZpZWxkc1wiIG11c3QgYmUgYSB2YWxpZCBvYmplY3QuJyk7XG4gICAgfVxuXG4gICAgZW5zdXJlVW5pcXVlRmllbGRzKGZpZWxkcy5hdHRyaWJ1dGVzLCBmaWVsZHMucmVsYXRpb25zaGlwcyk7XG5cbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuX2F0dHJpYnV0ZXMgPSBmaWVsZHMuYXR0cmlidXRlcyB8fCB7fTtcbiAgICB0aGlzLl9yZWxhdGlvbnNoaXBzID0gZmllbGRzLnJlbGF0aW9uc2hpcHMgfHwge307XG5cbiAgICAvLyBoeWRyYXRlIHJlbGF0aW9uc2hpcHNcbiAgICB0aGlzLl9yZWxhdGlvbnNoaXBzID0gT2JqZWN0LmtleXModGhpcy5fcmVsYXRpb25zaGlwcykucmVkdWNlKChwcmV2LCBmaWVsZCkgPT4ge1xuICAgICAgY29uc3QgcmVsYXRpb25zaGlwID0gdGhpcy5fcmVsYXRpb25zaGlwc1tmaWVsZF07XG5cbiAgICAgIGlmICh0eXBlb2YgcmVsYXRpb25zaGlwICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgYFRyaWVkIHJlZ2lzdGVyaW5nIHRoZSBcIiR7bmFtZX1cIiB0eXBlJ3MgXCIke2ZpZWxkfVwiIHJlbGF0aW9uc2hpcCwgYnV0IGl0IHdhc24ndCBhIGAgK1xuICAgICAgICAgICdmdW5jdGlvbi4gUGxlYXNlIHVzZSBlaXRoZXIgdGhlIFwiaGFzTWFueVwiLCBcImJlbG9uZ3NUb1wiLCBvciBcImhhc09uZVwiIHJlbGF0aW9uc2hpcCAnICtcbiAgICAgICAgICAnZnVuY3Rpb24uJ1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICBbZmllbGRdOiByZWxhdGlvbnNoaXAoZmllbGQpLFxuICAgICAgfTtcbiAgICB9LCB7fSk7XG5cbiAgICAvLyBoeWRyYXRlIGFsbCBvdGhlciB0b3AgbGV2ZWwga2V5c1xuICAgIE9iamVjdC5rZXlzKGZpZWxkcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKGtleSAhPT0gJ2F0dHJpYnV0ZXMnICYmIGtleSAhPT0gJ3JlbGF0aW9uc2hpcHMnKSB7XG4gICAgICAgIHRoaXNba2V5XSA9IGZpZWxkc1trZXldO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaGFzQXR0cmlidXRlKGZpZWxkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoZmllbGQpO1xuICB9XG5cbiAgaGFzUmVsYXRpb25zaGlwKGZpZWxkKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbGF0aW9uc2hpcHMuaGFzT3duUHJvcGVydHkoZmllbGQpO1xuICB9XG5cbiAgYXR0cmlidXRlKGZpZWxkKSB7XG4gICAgcmV0dXJuIHRoaXMuYXR0cmlidXRlc1tmaWVsZF0gfHwgbnVsbDtcbiAgfVxuXG4gIHJlbGF0aW9uc2hpcChmaWVsZCkge1xuICAgIHJldHVybiB0aGlzLnJlbGF0aW9uc2hpcHNbZmllbGRdIHx8IG51bGw7XG4gIH1cblxuICBoeWRyYXRlSW52ZXJzZShmaWVsZCwgeyBuYW1lLCByZWxhdGlvbiB9KSB7XG4gICAgaWYgKCF0aGlzLnJlbGF0aW9uc2hpcChmaWVsZCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFRyaWVkIHRvIGh5ZHJhdGUgdGhlIFwiJHt0aGlzLm5hbWV9XCIgdHlwZSdzIFwiJHtmaWVsZH1cIiBpbnZlcnNlLCBidXQgXCIke2ZpZWxkfVwiIGlzIG5vdCBhIGAgK1xuICAgICAgICAndmFsaWQgcmVsYXRpb25zaGlwLidcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVsYXRpb25zaGlwID0gdGhpcy5yZWxhdGlvbnNoaXAoZmllbGQpO1xuXG4gICAgaWYgKCFyZWxhdGlvbnNoaXAuaW52ZXJzZS5pc0h5ZHJhdGVkKSB7XG4gICAgICB0aGlzLl9yZWxhdGlvbnNoaXBzW2ZpZWxkXS5pbnZlcnNlID0ge1xuICAgICAgICAuLi5yZWxhdGlvbnNoaXAuaW52ZXJzZSxcbiAgICAgICAgaXNIeWRyYXRlZDogdHJ1ZSxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgcmVsYXRpb24sXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGdldCBhdHRyaWJ1dGVzKCkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSB0aGlzLl9hdHRyaWJ1dGVzO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmF0dHJpYnV0ZXMsXG5cbiAgICAgIGZvckVhY2goZm4pIHtcbiAgICAgICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChmaWVsZCA9PiBmbih7XG4gICAgICAgICAgdHlwZTogYXR0cmlidXRlc1tmaWVsZF0sXG4gICAgICAgICAgZmllbGQsXG4gICAgICAgIH0pKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlZHVjZShmbiwgaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5yZWR1Y2UoKGluaXQsIGZpZWxkKSA9PiBmbihpbml0LCB7XG4gICAgICAgICAgdHlwZTogYXR0cmlidXRlc1tmaWVsZF0sXG4gICAgICAgICAgZmllbGQsXG4gICAgICAgIH0pLCBpbml0aWFsVmFsdWUpO1xuICAgICAgfSxcblxuICAgICAgLi4uWydtYXAnLCAnc29tZScsICdldmVyeScsICdmaWx0ZXInLCAnZmluZCddLnJlZHVjZSgoYWNjdW11bGF0b3IsIGl0ZXJhdG9yKSA9PiAoe1xuICAgICAgICAuLi5hY2N1bXVsYXRvcixcbiAgICAgICAgW2l0ZXJhdG9yXTogKGZuKSA9PiAoXG4gICAgICAgICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcylbaXRlcmF0b3JdKChmaWVsZCwgLi4uYXJncykgPT5cbiAgICAgICAgICAgIGZuKHsgLi4uYXR0cmlidXRlc1tmaWVsZF0sIGZpZWxkIH0sIC4uLmFyZ3MpKVxuICAgICAgICApLFxuICAgICAgfSksIHt9KSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0IHJlbGF0aW9uc2hpcHMoKSB7XG4gICAgY29uc3QgcmVsYXRpb25zaGlwcyA9IHRoaXMuX3JlbGF0aW9uc2hpcHM7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4ucmVsYXRpb25zaGlwcyxcblxuICAgICAgZm9yRWFjaChmbikge1xuICAgICAgICBPYmplY3Qua2V5cyhyZWxhdGlvbnNoaXBzKS5mb3JFYWNoKGZpZWxkID0+IGZuKHJlbGF0aW9uc2hpcHNbZmllbGRdKSk7XG4gICAgICB9LFxuXG4gICAgICByZWR1Y2UoZm4sIGluaXRpYWxWYWx1ZSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMocmVsYXRpb25zaGlwcykucmVkdWNlKChpbml0LCBmaWVsZCkgPT5cbiAgICAgICAgICBmbihpbml0LCByZWxhdGlvbnNoaXBzW2ZpZWxkXSksIGluaXRpYWxWYWx1ZSk7XG4gICAgICB9LFxuXG4gICAgICAuLi5bJ21hcCcsICdzb21lJywgJ2V2ZXJ5JywgJ2ZpbHRlcicsICdmaW5kJ10ucmVkdWNlKChhY2N1bXVsYXRvciwgaXRlcmF0b3IpID0+ICh7XG4gICAgICAgIC4uLmFjY3VtdWxhdG9yLFxuICAgICAgICBbaXRlcmF0b3JdOiAoZm4pID0+IChcbiAgICAgICAgICBPYmplY3Qua2V5cyhyZWxhdGlvbnNoaXBzKVtpdGVyYXRvcl0oKGZpZWxkLCAuLi5hcmdzKSA9PlxuICAgICAgICAgICAgZm4ocmVsYXRpb25zaGlwc1tmaWVsZF0sIC4uLmFyZ3MpKVxuICAgICAgICApLFxuICAgICAgfSksIHt9KSxcbiAgICB9O1xuICB9XG59XG4iXX0=