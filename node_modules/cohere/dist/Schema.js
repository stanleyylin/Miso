'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type = require('./Type');

var _Type2 = _interopRequireDefault(_Type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schema = function () {
  function Schema() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    _classCallCheck(this, Schema);

    this.isCompiled = false;
    this._types = {};

    this.name = name;
  }

  _createClass(Schema, [{
    key: 'defineType',
    value: function defineType(name, fields) {
      if (Object.keys(this.types).includes(name)) {
        throw new Error('The "' + name + '" type has already been defined.');
      }

      this._types[name] = new _Type2.default(name, fields);
      return this;
    }
  }, {
    key: 'compile',
    value: function compile() {
      var _this = this;

      // hydrate every inverse
      this.types.forEach(function (type) {
        var name = type.name;


        type.relationships.forEach(function (relationship) {
          var inverse = relationship.inverse,
              relation = relationship.relation,
              field = relationship.field,
              relatedName = relationship.name;


          if (!_this.types[relatedName]) {
            throw new Error('Could not compile the schema, because the "' + name + '" type\'s "' + field + '" ' + ('relationship has a name "' + relatedName + '", which has not been defined. Try running ') + ('schema.defineType(' + relatedName + ', { ... }).'));
          }

          _this.types[relatedName].hydrateInverse(inverse.field, {
            name: relatedName,
            relation: relation
          });
        });
      });

      // link types together
      this.types.forEach(function (type) {
        type.relationships.forEach(function (relationship) {
          relationship.type = _this.types[relationship.name]; // eslint-disable-line
        });
      });

      this.isCompiled = true;
      return this;
    }
  }, {
    key: 'types',
    get: function get() {
      var types = this._types;

      return _extends({}, types, {
        forEach: function forEach(fn) {
          Object.keys(types).forEach(function (name) {
            return fn(types[name]);
          });
        },
        reduce: function reduce(fn, initialValue) {
          return Object.keys(types).reduce(function (init, name) {
            return fn(init, types[name]);
          }, initialValue);
        }
      }, ['map', 'some', 'every', 'filter', 'find'].reduce(function (accumulator, iterator) {
        return _extends({}, accumulator, _defineProperty({}, iterator, function (fn) {
          return Object.keys(types)[iterator](function (name) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }

            return fn.apply(undefined, [types[name]].concat(args));
          });
        }));
      }, {}));
    }
  }]);

  return Schema;
}();

exports.default = Schema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TY2hlbWEuanMiXSwibmFtZXMiOlsiU2NoZW1hIiwibmFtZSIsImlzQ29tcGlsZWQiLCJfdHlwZXMiLCJmaWVsZHMiLCJPYmplY3QiLCJrZXlzIiwidHlwZXMiLCJpbmNsdWRlcyIsIkVycm9yIiwiZm9yRWFjaCIsInR5cGUiLCJyZWxhdGlvbnNoaXBzIiwiaW52ZXJzZSIsInJlbGF0aW9uc2hpcCIsInJlbGF0aW9uIiwiZmllbGQiLCJyZWxhdGVkTmFtZSIsImh5ZHJhdGVJbnZlcnNlIiwiZm4iLCJyZWR1Y2UiLCJpbml0aWFsVmFsdWUiLCJpbml0IiwiYWNjdW11bGF0b3IiLCJpdGVyYXRvciIsImFyZ3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7OztJQUVxQkEsTTtBQUluQixvQkFBdUI7QUFBQSxRQUFYQyxJQUFXLHVFQUFKLEVBQUk7O0FBQUE7O0FBQUEsU0FIdkJDLFVBR3VCLEdBSFYsS0FHVTtBQUFBLFNBRnZCQyxNQUV1QixHQUZkLEVBRWM7O0FBQ3JCLFNBQUtGLElBQUwsR0FBWUEsSUFBWjtBQUNEOzs7OytCQUVVQSxJLEVBQU1HLE0sRUFBUTtBQUN2QixVQUFJQyxPQUFPQyxJQUFQLENBQVksS0FBS0MsS0FBakIsRUFBd0JDLFFBQXhCLENBQWlDUCxJQUFqQyxDQUFKLEVBQTRDO0FBQzFDLGNBQU0sSUFBSVEsS0FBSixXQUFrQlIsSUFBbEIsc0NBQU47QUFDRDs7QUFFRCxXQUFLRSxNQUFMLENBQVlGLElBQVosSUFBb0IsbUJBQVNBLElBQVQsRUFBZUcsTUFBZixDQUFwQjtBQUNBLGFBQU8sSUFBUDtBQUNEOzs7OEJBRVM7QUFBQTs7QUFDUjtBQUNBLFdBQUtHLEtBQUwsQ0FBV0csT0FBWCxDQUFtQixnQkFBUTtBQUFBLFlBQ2pCVCxJQURpQixHQUNSVSxJQURRLENBQ2pCVixJQURpQjs7O0FBR3pCVSxhQUFLQyxhQUFMLENBQW1CRixPQUFuQixDQUEyQix3QkFBZ0I7QUFBQSxjQUNqQ0csT0FEaUMsR0FDZUMsWUFEZixDQUNqQ0QsT0FEaUM7QUFBQSxjQUN4QkUsUUFEd0IsR0FDZUQsWUFEZixDQUN4QkMsUUFEd0I7QUFBQSxjQUNkQyxLQURjLEdBQ2VGLFlBRGYsQ0FDZEUsS0FEYztBQUFBLGNBQ0RDLFdBREMsR0FDZUgsWUFEZixDQUNQYixJQURPOzs7QUFHekMsY0FBSSxDQUFDLE1BQUtNLEtBQUwsQ0FBV1UsV0FBWCxDQUFMLEVBQThCO0FBQzVCLGtCQUFNLElBQUlSLEtBQUosQ0FDSixnREFBOENSLElBQTlDLG1CQUErRGUsS0FBL0QseUNBQzRCQyxXQUQ1Qiw0RUFFcUJBLFdBRnJCLGlCQURJLENBQU47QUFLRDs7QUFFRCxnQkFBS1YsS0FBTCxDQUFXVSxXQUFYLEVBQXdCQyxjQUF4QixDQUF1Q0wsUUFBUUcsS0FBL0MsRUFBc0Q7QUFDcERmLGtCQUFNZ0IsV0FEOEM7QUFFcERGO0FBRm9ELFdBQXREO0FBSUQsU0FmRDtBQWdCRCxPQW5CRDs7QUFxQkE7QUFDQSxXQUFLUixLQUFMLENBQVdHLE9BQVgsQ0FBbUIsZ0JBQVE7QUFDekJDLGFBQUtDLGFBQUwsQ0FBbUJGLE9BQW5CLENBQTJCLHdCQUFnQjtBQUN6Q0ksdUJBQWFILElBQWIsR0FBb0IsTUFBS0osS0FBTCxDQUFXTyxhQUFhYixJQUF4QixDQUFwQixDQUR5QyxDQUNVO0FBQ3BELFNBRkQ7QUFHRCxPQUpEOztBQU1BLFdBQUtDLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxhQUFPLElBQVA7QUFDRDs7O3dCQUVXO0FBQ1YsVUFBTUssUUFBUSxLQUFLSixNQUFuQjs7QUFFQSwwQkFDS0ksS0FETDtBQUdFRyxlQUhGLG1CQUdVUyxFQUhWLEVBR2M7QUFDVmQsaUJBQU9DLElBQVAsQ0FBWUMsS0FBWixFQUFtQkcsT0FBbkIsQ0FBMkI7QUFBQSxtQkFBUVMsR0FBR1osTUFBTU4sSUFBTixDQUFILENBQVI7QUFBQSxXQUEzQjtBQUNELFNBTEg7QUFPRW1CLGNBUEYsa0JBT1NELEVBUFQsRUFPYUUsWUFQYixFQU8yQjtBQUN2QixpQkFBT2hCLE9BQU9DLElBQVAsQ0FBWUMsS0FBWixFQUFtQmEsTUFBbkIsQ0FBMEIsVUFBQ0UsSUFBRCxFQUFPckIsSUFBUDtBQUFBLG1CQUFnQmtCLEdBQUdHLElBQUgsRUFBU2YsTUFBTU4sSUFBTixDQUFULENBQWhCO0FBQUEsV0FBMUIsRUFBaUVvQixZQUFqRSxDQUFQO0FBQ0Q7QUFUSCxTQVdLLENBQUMsS0FBRCxFQUFRLE1BQVIsRUFBZ0IsT0FBaEIsRUFBeUIsUUFBekIsRUFBbUMsTUFBbkMsRUFBMkNELE1BQTNDLENBQWtELFVBQUNHLFdBQUQsRUFBY0MsUUFBZDtBQUFBLDRCQUNoREQsV0FEZ0Qsc0JBRWxEQyxRQUZrRCxFQUV2QyxVQUFDTCxFQUFEO0FBQUEsaUJBQ1ZkLE9BQU9DLElBQVAsQ0FBWUMsS0FBWixFQUFtQmlCLFFBQW5CLEVBQTZCLFVBQUN2QixJQUFEO0FBQUEsOENBQVV3QixJQUFWO0FBQVVBLGtCQUFWO0FBQUE7O0FBQUEsbUJBQW1CTixxQkFBR1osTUFBTU4sSUFBTixDQUFILFNBQW1Cd0IsSUFBbkIsRUFBbkI7QUFBQSxXQUE3QixDQURVO0FBQUEsU0FGdUM7QUFBQSxPQUFsRCxFQUtDLEVBTEQsQ0FYTDtBQWtCRDs7Ozs7O2tCQXhFa0J6QixNIiwiZmlsZSI6IlNjaGVtYS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUeXBlIGZyb20gJy4vVHlwZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjaGVtYSB7XG4gIGlzQ29tcGlsZWQgPSBmYWxzZVxuICBfdHlwZXMgPSB7fVxuXG4gIGNvbnN0cnVjdG9yKG5hbWUgPSAnJykge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cblxuICBkZWZpbmVUeXBlKG5hbWUsIGZpZWxkcykge1xuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLnR5cGVzKS5pbmNsdWRlcyhuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgXCIke25hbWV9XCIgdHlwZSBoYXMgYWxyZWFkeSBiZWVuIGRlZmluZWQuYCk7XG4gICAgfVxuXG4gICAgdGhpcy5fdHlwZXNbbmFtZV0gPSBuZXcgVHlwZShuYW1lLCBmaWVsZHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY29tcGlsZSgpIHtcbiAgICAvLyBoeWRyYXRlIGV2ZXJ5IGludmVyc2VcbiAgICB0aGlzLnR5cGVzLmZvckVhY2godHlwZSA9PiB7XG4gICAgICBjb25zdCB7IG5hbWUgfSA9IHR5cGU7XG5cbiAgICAgIHR5cGUucmVsYXRpb25zaGlwcy5mb3JFYWNoKHJlbGF0aW9uc2hpcCA9PiB7XG4gICAgICAgIGNvbnN0IHsgaW52ZXJzZSwgcmVsYXRpb24sIGZpZWxkLCBuYW1lOiByZWxhdGVkTmFtZSB9ID0gcmVsYXRpb25zaGlwO1xuXG4gICAgICAgIGlmICghdGhpcy50eXBlc1tyZWxhdGVkTmFtZV0pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgQ291bGQgbm90IGNvbXBpbGUgdGhlIHNjaGVtYSwgYmVjYXVzZSB0aGUgXCIke25hbWV9XCIgdHlwZSdzIFwiJHtmaWVsZH1cIiBgICtcbiAgICAgICAgICAgIGByZWxhdGlvbnNoaXAgaGFzIGEgbmFtZSBcIiR7cmVsYXRlZE5hbWV9XCIsIHdoaWNoIGhhcyBub3QgYmVlbiBkZWZpbmVkLiBUcnkgcnVubmluZyBgICtcbiAgICAgICAgICAgIGBzY2hlbWEuZGVmaW5lVHlwZSgke3JlbGF0ZWROYW1lfSwgeyAuLi4gfSkuYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnR5cGVzW3JlbGF0ZWROYW1lXS5oeWRyYXRlSW52ZXJzZShpbnZlcnNlLmZpZWxkLCB7XG4gICAgICAgICAgbmFtZTogcmVsYXRlZE5hbWUsXG4gICAgICAgICAgcmVsYXRpb24sXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBsaW5rIHR5cGVzIHRvZ2V0aGVyXG4gICAgdGhpcy50eXBlcy5mb3JFYWNoKHR5cGUgPT4ge1xuICAgICAgdHlwZS5yZWxhdGlvbnNoaXBzLmZvckVhY2gocmVsYXRpb25zaGlwID0+IHtcbiAgICAgICAgcmVsYXRpb25zaGlwLnR5cGUgPSB0aGlzLnR5cGVzW3JlbGF0aW9uc2hpcC5uYW1lXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmlzQ29tcGlsZWQgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0IHR5cGVzKCkge1xuICAgIGNvbnN0IHR5cGVzID0gdGhpcy5fdHlwZXM7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4udHlwZXMsXG5cbiAgICAgIGZvckVhY2goZm4pIHtcbiAgICAgICAgT2JqZWN0LmtleXModHlwZXMpLmZvckVhY2gobmFtZSA9PiBmbih0eXBlc1tuYW1lXSkpO1xuICAgICAgfSxcblxuICAgICAgcmVkdWNlKGZuLCBpbml0aWFsVmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHR5cGVzKS5yZWR1Y2UoKGluaXQsIG5hbWUpID0+IGZuKGluaXQsIHR5cGVzW25hbWVdKSwgaW5pdGlhbFZhbHVlKTtcbiAgICAgIH0sXG5cbiAgICAgIC4uLlsnbWFwJywgJ3NvbWUnLCAnZXZlcnknLCAnZmlsdGVyJywgJ2ZpbmQnXS5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBpdGVyYXRvcikgPT4gKHtcbiAgICAgICAgLi4uYWNjdW11bGF0b3IsXG4gICAgICAgIFtpdGVyYXRvcl06IChmbikgPT4gKFxuICAgICAgICAgIE9iamVjdC5rZXlzKHR5cGVzKVtpdGVyYXRvcl0oKG5hbWUsIC4uLmFyZ3MpID0+IGZuKHR5cGVzW25hbWVdLCAuLi5hcmdzKSlcbiAgICAgICAgKSxcbiAgICAgIH0pLCB7fSksXG4gICAgfTtcbiAgfVxufVxuIl19