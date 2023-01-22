'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var ensureValidArgs = function ensureValidArgs(name, inverse, options) {
  if (typeof name !== 'string') {
    throw new TypeError('Argument "name" must be a string.');
  }

  if (typeof inverse !== 'string') {
    throw new TypeError('Argument "inverse" must be a string.');
  }

  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
    throw new TypeError('Argument "options" must be an object.');
  }
};

var relationship = exports.relationship = function relationship(relation) {
  return function (name, inverse) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (!['belongsTo', 'hasOne', 'hasMany'].includes(relation)) {
      throw new Error('Argument "relation" must be either "belongsTo", "hasOne", or "hasMany", instead got ' + ('"' + relation + '"'));
    }

    ensureValidArgs(name, inverse, options);

    return function (field) {
      return _extends({}, options, {
        inverse: { name: null, relation: null, field: inverse },
        relation: relation,
        name: name,
        field: field
      });
    };
  };
};

var hasMany = exports.hasMany = relationship('hasMany');
var belongsTo = exports.belongsTo = relationship('belongsTo');
var hasOne = exports.hasOne = relationship('hasOne');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWxhdGlvbnNoaXAuanMiXSwibmFtZXMiOlsiZW5zdXJlVmFsaWRBcmdzIiwibmFtZSIsImludmVyc2UiLCJvcHRpb25zIiwiVHlwZUVycm9yIiwicmVsYXRpb25zaGlwIiwicmVsYXRpb24iLCJpbmNsdWRlcyIsIkVycm9yIiwiZmllbGQiLCJoYXNNYW55IiwiYmVsb25nc1RvIiwiaGFzT25lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBTUEsa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFDQyxJQUFELEVBQU9DLE9BQVAsRUFBZ0JDLE9BQWhCLEVBQTRCO0FBQ2xELE1BQUksT0FBT0YsSUFBUCxLQUFnQixRQUFwQixFQUE4QjtBQUM1QixVQUFNLElBQUlHLFNBQUosQ0FBYyxtQ0FBZCxDQUFOO0FBQ0Q7O0FBRUQsTUFBSSxPQUFPRixPQUFQLEtBQW1CLFFBQXZCLEVBQWlDO0FBQy9CLFVBQU0sSUFBSUUsU0FBSixDQUFjLHNDQUFkLENBQU47QUFDRDs7QUFFRCxNQUFJLFFBQU9ELE9BQVAseUNBQU9BLE9BQVAsT0FBbUIsUUFBdkIsRUFBaUM7QUFDL0IsVUFBTSxJQUFJQyxTQUFKLENBQWMsdUNBQWQsQ0FBTjtBQUNEO0FBQ0YsQ0FaRDs7QUFjTyxJQUFNQyxzQ0FBZSxTQUFmQSxZQUFlLENBQUNDLFFBQUQ7QUFBQSxTQUFjLFVBQUNMLElBQUQsRUFBT0MsT0FBUCxFQUFpQztBQUFBLFFBQWpCQyxPQUFpQix1RUFBUCxFQUFPOztBQUN6RSxRQUFJLENBQUMsQ0FBQyxXQUFELEVBQWMsUUFBZCxFQUF3QixTQUF4QixFQUFtQ0ksUUFBbkMsQ0FBNENELFFBQTVDLENBQUwsRUFBNEQ7QUFDMUQsWUFBTSxJQUFJRSxLQUFKLENBQ0osZ0dBQ0lGLFFBREosT0FESSxDQUFOO0FBSUQ7O0FBRUROLG9CQUFnQkMsSUFBaEIsRUFBc0JDLE9BQXRCLEVBQStCQyxPQUEvQjs7QUFFQSxXQUFPLFVBQUNNLEtBQUQ7QUFBQSwwQkFDRk4sT0FERTtBQUVMRCxpQkFBUyxFQUFFRCxNQUFNLElBQVIsRUFBY0ssVUFBVSxJQUF4QixFQUE4QkcsT0FBT1AsT0FBckMsRUFGSjtBQUdMSSwwQkFISztBQUlMTCxrQkFKSztBQUtMUTtBQUxLO0FBQUEsS0FBUDtBQU9ELEdBakIyQjtBQUFBLENBQXJCOztBQW1CQSxJQUFNQyw0QkFBVUwsYUFBYSxTQUFiLENBQWhCO0FBQ0EsSUFBTU0sZ0NBQVlOLGFBQWEsV0FBYixDQUFsQjtBQUNBLElBQU1PLDBCQUFTUCxhQUFhLFFBQWIsQ0FBZiIsImZpbGUiOiJyZWxhdGlvbnNoaXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBlbnN1cmVWYWxpZEFyZ3MgPSAobmFtZSwgaW52ZXJzZSwgb3B0aW9ucykgPT4ge1xuICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgXCJuYW1lXCIgbXVzdCBiZSBhIHN0cmluZy4nKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgaW52ZXJzZSAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBcImludmVyc2VcIiBtdXN0IGJlIGEgc3RyaW5nLicpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IFwib3B0aW9uc1wiIG11c3QgYmUgYW4gb2JqZWN0LicpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgcmVsYXRpb25zaGlwID0gKHJlbGF0aW9uKSA9PiAobmFtZSwgaW52ZXJzZSwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGlmICghWydiZWxvbmdzVG8nLCAnaGFzT25lJywgJ2hhc01hbnknXS5pbmNsdWRlcyhyZWxhdGlvbikpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQXJndW1lbnQgXCJyZWxhdGlvblwiIG11c3QgYmUgZWl0aGVyIFwiYmVsb25nc1RvXCIsIFwiaGFzT25lXCIsIG9yIFwiaGFzTWFueVwiLCBpbnN0ZWFkIGdvdCAnICtcbiAgICAgIGBcIiR7cmVsYXRpb259XCJgXG4gICAgKTtcbiAgfVxuXG4gIGVuc3VyZVZhbGlkQXJncyhuYW1lLCBpbnZlcnNlLCBvcHRpb25zKTtcblxuICByZXR1cm4gKGZpZWxkKSA9PiAoe1xuICAgIC4uLm9wdGlvbnMsXG4gICAgaW52ZXJzZTogeyBuYW1lOiBudWxsLCByZWxhdGlvbjogbnVsbCwgZmllbGQ6IGludmVyc2UgfSxcbiAgICByZWxhdGlvbixcbiAgICBuYW1lLFxuICAgIGZpZWxkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBoYXNNYW55ID0gcmVsYXRpb25zaGlwKCdoYXNNYW55Jyk7XG5leHBvcnQgY29uc3QgYmVsb25nc1RvID0gcmVsYXRpb25zaGlwKCdiZWxvbmdzVG8nKTtcbmV4cG9ydCBjb25zdCBoYXNPbmUgPSByZWxhdGlvbnNoaXAoJ2hhc09uZScpO1xuIl19