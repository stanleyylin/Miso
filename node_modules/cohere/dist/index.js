'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasMany = exports.hasOne = exports.belongsTo = exports.Schema = exports.default = undefined;

var _Schema = require('./Schema');

var _Schema2 = _interopRequireDefault(_Schema);

var _relationship = require('./relationship');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Schema2.default;
exports.Schema = _Schema2.default;
exports.belongsTo = _relationship.belongsTo;
exports.hasOne = _relationship.hasOne;
exports.hasMany = _relationship.hasMany;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0IiwiU2NoZW1hIiwiYmVsb25nc1RvIiwiaGFzT25lIiwiaGFzTWFueSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7UUFFT0EsTztRQUNFQyxNO1FBQVFDLFM7UUFBV0MsTTtRQUFRQyxPIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNjaGVtYSBmcm9tICcuL1NjaGVtYSc7XG5pbXBvcnQgeyBiZWxvbmdzVG8sIGhhc09uZSwgaGFzTWFueSB9IGZyb20gJy4vcmVsYXRpb25zaGlwJztcblxuZXhwb3J0IGRlZmF1bHQgZnJvbSAnLi9TY2hlbWEnO1xuZXhwb3J0IHsgU2NoZW1hLCBiZWxvbmdzVG8sIGhhc09uZSwgaGFzTWFueSB9O1xuIl19